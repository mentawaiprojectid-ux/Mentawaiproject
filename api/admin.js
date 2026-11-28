'use strict';
/*
  Backend tunggal Mentawai Project (Vercel Serverless Function).
  Alamat:  /api/admin?a=config | discord | auth | save | preview
  - Sandi bawaan sudah terpasang (disimpan sebagai hash, bukan teks biasa).
  - Ingin ganti sandi? Di Vercel isi Environment Variable ADMIN_PASSWORD (opsional) lalu Redeploy.
  - Penyimpanan online memakai Upstash Redis (opsional, gratis) dari Vercel Storage.
*/
const crypto = require('crypto');

const KEY = { salt: '2e92fd432bf70743ad6913a0283fc20a', iters: 150000, hash: '863c7ccb04537dd1beb7cdb787d6e6614dcd0480333b871e5bffb8f2a857c6de' };
const CONFIG_KEY = 'mentawai_project:config:v2';
const MAX_CONFIG_BYTES = 900 * 1024;

/* ---------------- Sandi ---------------- */
function sha(s) { return crypto.createHash('sha256').update(String(s)).digest(); }

function checkPassword(pw) {
  if (typeof pw !== 'string' || !pw || pw.length > 200) return false;
  const env = process.env.ADMIN_PASSWORD;
  if (env) return crypto.timingSafeEqual(sha(pw), sha(env));
  const dk = crypto.pbkdf2Sync(pw, Buffer.from(KEY.salt, 'hex'), KEY.iters, 32, 'sha256');
  return crypto.timingSafeEqual(dk, Buffer.from(KEY.hash, 'hex'));
}

/* Pembatasan percobaan salah (upaya terbaik per instance) */
const fails = new Map();
function ipOf(req) {
  return String((req.headers && req.headers['x-forwarded-for']) || '').split(',')[0].trim() || 'unknown';
}
function blocked(ip) {
  const r = fails.get(ip);
  if (!r) return false;
  if (Date.now() - r.first > 10 * 60 * 1000) { fails.delete(ip); return false; }
  return r.n >= 8;
}
function addFail(ip) {
  const r = fails.get(ip) || { n: 0, first: Date.now() };
  r.n += 1; fails.set(ip, r);
}

/* ---------------- Util respons ---------------- */
function send(res, status, body, headers) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  Object.entries(headers || {}).forEach(([k, v]) => res.setHeader(k, v));
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body !== undefined && req.body !== null && req.body !== '') {
    if (typeof req.body === 'string') return JSON.parse(req.body);
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8'));
    return req.body;
  }
  const chunks = []; let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 2 * 1024 * 1024) throw new Error('too_large');
    chunks.push(c);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

/* ---------------- Database (Upstash Redis REST) ---------------- */
function dbCreds() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

async function dbCommand(cmd) {
  const c = dbCreds();
  const res = await fetch(c.url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + c.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || 'db_' + res.status);
  return json.result;
}

function validateConfig(cfg) {
  if (!cfg || typeof cfg !== 'object' || Array.isArray(cfg)) return 'Format data tidak valid.';
  const lists = ['metrics', 'missions', 'programs', 'products', 'founders', 'socials', 'highlights'];
  for (const k of lists) {
    if (cfg[k] !== undefined && !Array.isArray(cfg[k])) return 'Bagian "' + k + '" harus berupa daftar.';
    if (Array.isArray(cfg[k]) && cfg[k].length > 80) return 'Bagian "' + k + '" terlalu banyak item (maks 80).';
  }
  const size = Buffer.byteLength(JSON.stringify(cfg), 'utf8');
  if (size > MAX_CONFIG_BYTES) {
    return 'Data terlalu besar (' + Math.round(size / 1024) + ' KB, batas ' + Math.round(MAX_CONFIG_BYTES / 1024) + ' KB). Pakai link gambar (URL) atau kecilkan foto yang diunggah.';
  }
  return '';
}

/* ---------------- Pratinjau link (khusus admin) ---------------- */
function safeHost(u) {
  if (!/^https?:$/.test(u.protocol)) return false;
  if (u.port && u.port !== '80' && u.port !== '443') return false;
  const h = u.hostname.toLowerCase();
  if (!h.includes('.') || h.startsWith('[') || /^\d+(\.\d+){3}$/.test(h)) return false;
  if (h === 'localhost' || /\.(local|internal|localhost|lan|home)$/.test(h)) return false;
  return true;
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').trim();
}

function parseMeta(html, baseUrl) {
  const metas = {};
  const re = /<meta\s+[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[0];
    const k = /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag);
    const v = /content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i.exec(tag);
    if (k && v) metas[k[1].toLowerCase()] = decodeEntities(v[1] !== undefined ? v[1] : v[2]);
  }
  const t = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
  let image = metas['og:image'] || metas['twitter:image'] || '';
  if (image) { try { image = new URL(image, baseUrl).href; } catch (e) { image = ''; } }
  return {
    title: (metas['og:title'] || metas['twitter:title'] || (t ? decodeEntities(t[1]) : '')).slice(0, 140),
    description: (metas['og:description'] || metas['description'] || '').slice(0, 300),
    image: /^https?:\/\//i.test(image) ? image : ''
  };
}

async function fetchPreview(target) {
  let u = new URL(target);
  for (let hop = 0; hop < 4; hop++) {
    if (!safeHost(u)) throw new Error('blocked');
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    let res;
    try {
      res = await fetch(u.href, {
        redirect: 'manual', signal: ctl.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MentawaiProjectBot/1.0)', Accept: 'text/html,*/*;q=0.5' }
      });
    } finally { clearTimeout(timer); }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      u = new URL(res.headers.get('location'), u.href);
      continue;
    }
    if (!res.ok) throw new Error('http_' + res.status);
    const type = res.headers.get('content-type') || '';
    if (/^image\//i.test(type)) return { title: '', description: '', image: u.href };
    const buf = Buffer.from(await res.arrayBuffer());
    return parseMeta(buf.subarray(0, 400 * 1024).toString('utf8'), u.href);
  }
  throw new Error('redirects');
}

/* ---------------- Handler ---------------- */
module.exports = async function handler(req, res) {
  let a = '';
  let code = '';
  try {
    const q = new URL(req.url, 'http://x').searchParams;
    a = q.get('a') || '';
    code = q.get('code') || '';
  } catch (e) { /* abaikan */ }

  /* Konten publik */
  if (req.method === 'GET' && a === 'config') {
    if (!dbCreds()) return send(res, 200, { ok: true, mode: 'local', config: null }, { 'Cache-Control': 'no-store' });
    try {
      const raw = await dbCommand(['GET', CONFIG_KEY]);
      let config = null;
      if (typeof raw === 'string' && raw) { try { config = JSON.parse(raw); } catch (e) { config = null; } }
      return send(res, 200, { ok: true, mode: 'cloud', config }, {
        'Cache-Control': 'public, max-age=0, s-maxage=5, stale-while-revalidate=30'
      });
    } catch (e) {
      return send(res, 200, { ok: true, mode: 'local', config: null, note: 'db_unreachable' }, { 'Cache-Control': 'no-store' });
    }
  }

  if (req.method === 'GET' && a === 'discord') {
    if (!/^[A-Za-z0-9-]{2,32}$/.test(code)) return send(res, 400, { ok: false });
    try {
      const r = await fetch('https://discord.com/api/v10/invites/' + code + '?with_counts=true', {
        headers: { 'User-Agent': 'MentawaiProjectBot/1.0' }
      });
      if (!r.ok) return send(res, 200, { ok: false }, { 'Cache-Control': 'public, s-maxage=60' });
      const d = await r.json();
      const g = d.guild || {};
      const icon = g.icon
        ? 'https://cdn.discordapp.com/icons/' + g.id + '/' + g.icon + (String(g.icon).startsWith('a_') ? '.gif' : '.png') + '?size=128'
        : '';
      return send(res, 200, {
        ok: true, name: g.name || '', description: g.description || '', icon,
        members: d.approximate_member_count || 0, online: d.approximate_presence_count || 0
      }, { 'Cache-Control': 'public, max-age=60, s-maxage=600, stale-while-revalidate=3600' });
    } catch (e) {
      return send(res, 200, { ok: false }, { 'Cache-Control': 'no-store' });
    }
  }

  /* Khusus admin */
  if (req.method === 'POST' && (a === 'auth' || a === 'save' || a === 'preview')) {
    res.setHeader('Cache-Control', 'no-store');
    const ip = ipOf(req);
    if (blocked(ip)) return send(res, 429, { ok: false, message: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' });

    let body;
    try { body = await readBody(req); } catch (e) {
      return send(res, e && e.message === 'too_large' ? 413 : 400, { ok: false, message: 'Data terlalu besar atau tidak valid.' });
    }
    const pw = a === 'auth' ? (body && body.password) : String((req.headers && (req.headers['x-admin-key'] || '')) || '');

    if (!checkPassword(pw)) {
      addFail(ip);
      await new Promise((r) => setTimeout(r, 500));
      return send(res, 401, { ok: false, code: 'auth', message: a === 'auth' ? 'Kata sandi salah.' : 'Sesi admin tidak valid. Masuk lagi lewat klik logo 3x.' });
    }
    fails.delete(ip);

    if (a === 'auth') return send(res, 200, { ok: true, db: !!dbCreds() });

    if (a === 'preview') {
      let target;
      try { target = new URL(String(body && body.url || '').trim()); } catch (e) {
        return send(res, 400, { ok: false, message: 'Link tidak valid.' });
      }
      try {
        const meta = await fetchPreview(target.href);
        return send(res, 200, Object.assign({ ok: true }, meta));
      } catch (e) {
        return send(res, 200, { ok: false, message: 'Tidak bisa mengambil data dari link ini. Isi judul/gambar secara manual.' });
      }
    }

    /* save */
    const problem = validateConfig(body && body.config);
    if (problem) return send(res, 400, { ok: false, message: problem });
    if (!dbCreds()) {
      return send(res, 200, {
        ok: true, mode: 'local',
        message: 'Tersimpan di browser ini saja. Hubungkan database (Upstash) di Vercel agar semua pengunjung melihat perubahan.'
      });
    }
    try {
      await dbCommand(['SET', CONFIG_KEY, JSON.stringify(body.config)]);
      return send(res, 200, { ok: true, mode: 'cloud', message: 'Tersimpan & dipublikasikan ke semua pengunjung.' });
    } catch (e) {
      return send(res, 502, { ok: false, message: 'Database tidak dapat dijangkau. Perubahan tersimpan di browser ini saja.' });
    }
  }

  return send(res, 405, { ok: false, message: 'Permintaan tidak dikenal.' });
};

module.exports.parseMeta = parseMeta;
module.exports.safeHost = safeHost;
module.exports.checkPassword = checkPassword;
