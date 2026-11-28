/* ==========================================================================
   MENTAWAI PROJECT — CLIENT APP, 3x LOGO ADMIN GATE & CLOUD/LOCAL CMS
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'mentawai_project_data_v2';
  const ADMIN_KEY_STORE = 'mentawai_project_admin_session';
  const ADMIN_LOCAL_STORE = 'mentawai_project_admin_local';
  const API = '/api/admin';
  const THEME_KEY = 'mentawai_project_theme';

  // Data awal — hanya memuat fakta dari profil resmi Mentawai Project.
  const DEFAULT_DATA = {
    heroBadge: 'GERAKAN INDEPENDEN ANAK MUDA',
    heroHashtag: '#GenerasiBaruMentawai',
    heroTitle: 'Membantu anak muda Mentawai untuk level-up melalui ruang belajar, bercerita, dan bertumbuh bersama.',
    heroSubtitle: 'Digagas dan dijalankan secara swadaya oleh anak muda Mentawai — dimulai dari langkah-langkah kecil yang konsisten, membuka akses wawasan, literasi, dan komunitas yang saling menguatkan.',
    aboutLead: 'Mentawai Project adalah gerakan independen yang digagas dan dijalankan secara swadaya oleh anak muda Mentawai, berfokus pada pendidikan, literasi, dan pengembangan kapasitas diri bagi pelajar SMA, mahasiswa, dan generasi muda Mentawai.',
    aboutBody: 'Melalui semangat #GenerasiBaru, Mentawai Project hadir sebagai ruang belajar, ruang bercerita, dan ruang saling menguatkan — dimulai dari langkah-langkah kecil yang konsisten, bukan klaim besar yang belum terbukti.',
    aboutNote: 'Mentawai Project adalah gerakan independen yang dijalankan secara swadaya oleh anak muda, tanpa berafiliasi dengan yayasan atau lembaga resmi manapun. Pengurusan status hukum formal merupakan salah satu arah pengembangan ke depan.',
    vision: 'Menjadi gerakan independen anak muda Mentawai yang membuka ruang belajar, bercerita, dan bertumbuh bagi generasi muda Mentawai untuk berani melangkah lebih jauh.',
    missions: [
      { id: 'mis-1', text: 'Membuka ruang belajar yang mengasah nalar kritis dan wawasan anak muda Mentawai.', visible: true },
      { id: 'mis-2', text: 'Menghidupkan ruang bercerita agar suara dan pengalaman anak muda Mentawai didengar dan menginspirasi.', visible: true },
      { id: 'mis-3', text: 'Merawat dan memperluas komunitas sebagai rumah bersama Generasi Baru Mentawai.', visible: true }
    ],
    metrics: [
      { id: 'm-ig-main', value: '744', label: '@mentawaiproject.id', note: 'Pengikut Instagram · ±100 orang aktif via Story (estimasi)', visible: true },
      { id: 'm-ig-story', value: '72', label: '@akugenerasibaru.id', note: 'Pengikut Instagram · kanal cerita & produk pendukung', visible: true },
      { id: 'm-circle', value: '±20', label: 'Anggota Circle WA', note: 'Ruang kumpul komunitas tahap awal', visible: true },
      { id: 'm-programs', value: '4', label: 'Program Pergerakan', note: 'Narasi, Ruang Bertumbuh, Circle & Beasiswa', visible: true }
    ],
    programs: [
      {
        id: 'prog-narasi',
        title: 'Narasi Generasi Baru',
        status: 'BERJALAN — PRIORITAS',
        statusType: 'priority',
        missionRef: 'Turunan dari Misi 2',
        shortDesc: 'Program berkelanjutan yang merekrut dan menampilkan cerita anak muda Mentawai (edukasi & storytelling) melalui @akugenerasibaru.id, minimal 2 cerita setiap bulan.',
        fullDetail: 'Narasi Generasi Baru ditetapkan sebagai program prioritas jangka panjang: merekrut dan menampilkan cerita anak muda Mentawai agar suara dan pengalaman mereka didengar serta menginspirasi, dengan target minimal 2 cerita setiap bulan.',
        visible: true,
        examples: [
          { id: 'ex-narasi-1', title: 'Kanal Cerita @akugenerasibaru.id', caption: 'Kanal cerita Generasi Baru Mentawai di Instagram.', url: 'https://www.instagram.com/akugenerasibaru.id/', image: '', display: 'card', visible: true }
        ]
      },
      {
        id: 'prog-ruang',
        title: 'Ruang Bertumbuh',
        status: 'BERJALAN',
        statusType: 'active',
        missionRef: 'Turunan dari Misi 1',
        shortDesc: 'Konten edukasi bulanan dengan tema yang berganti setiap bulan (contoh: Literasi Finansial → Public Speaking), untuk mengasah nalar kritis dan wawasan anak muda Mentawai.',
        fullDetail: 'Setiap bulan kami mengangkat satu tema edukasi untuk mengasah nalar kritis dan wawasan anak muda Mentawai. Contoh tema yang sudah berjalan: Literasi Finansial, lalu Public Speaking.',
        visible: true,
        examples: [
          { id: 'ex-ruang-1', title: 'Konten Edukasi @mentawaiproject.id', caption: 'Materi edukasi bulanan di Instagram komunitas.', url: 'https://www.instagram.com/mentawaiproject.id/', image: '', display: 'card', visible: true }
        ]
      },
      {
        id: 'prog-circle',
        title: 'Circle WA & Discord',
        status: 'SEDANG DIRINTIS',
        statusType: 'active',
        missionRef: 'Turunan dari Misi 3',
        shortDesc: 'Ruang kumpul komunitas (saat ini ±20 anggota) yang sedang diusahakan berkembang menjadi ruang diskusi berjadwal tetap bersama Discord Generasi Baru.',
        fullDetail: 'Circle WA adalah ruang kumpul komunitas tahap awal dengan sekitar 20 anggota. Ke depan, ruang ini diusahakan berkembang menjadi ruang diskusi berjadwal tetap, dengan Discord Generasi Baru sebagai rumah bersama.',
        visible: true,
        examples: [
          { id: 'ex-circle-1', title: '', caption: '', url: 'https://discord.gg/sgAwpjBXr', image: '', display: 'auto', visible: true }
        ]
      },
      {
        id: 'prog-beasiswa',
        title: 'Jaringan & Informasi Beasiswa',
        status: 'JANGKA PANJANG',
        statusType: 'neutral',
        missionRef: 'Turunan dari Misi 1',
        shortDesc: 'Arah pengembangan ke depan: menjajaki informasi dan jaringan beasiswa secara bertahap, dari berbagi informasi menuju pendampingan yang lebih intensif.',
        fullDetail: 'Program ini masih berupa rencana jangka panjang. Langkahnya bertahap: dimulai dari berbagi informasi beasiswa, kemudian menuju pendampingan yang lebih intensif.',
        visible: true,
        examples: []
      }
    ],
    products: [
      {
        id: 'prod-1',
        title: 'Tautan Resmi & Produk Lynk.id',
        badge: 'PENDUKUNG KOMUNITAS',
        price: 'Lynk.id',
        description: 'Tautan resmi dan produk pendukung operasional swadaya Mentawai Project & @akugenerasibaru.id.',
        image: '',
        url: 'https://lynk.id/mentawaiproject.id',
        visible: true
      }
    ],
    founders: [
      { id: 'f-ferdi', name: 'Ferdi Ricson', role: 'Co-Founder', focus: 'Social Media Manager', photo: './founder-ferdi.jpg', visible: true },
      { id: 'f-charlie', name: 'Charlie Dwiputra Beama', role: 'Co-Founder', focus: 'Bendahara (Treasurer)', photo: './founder-charlie.jpg', visible: true },
      { id: 'f-deisme', name: 'Deisme Insafan Zebua', role: 'Co-Founder', focus: 'Sekretaris', photo: './founder-deisme.jpg', visible: true },
      { id: 'f-velsia', name: 'Velsia V. Salelenggu', role: 'Tim Social Media', focus: '@akugenerasibaru.id', photo: './founder-velsia.jpg', visible: true }
    ],
    contentTitle: 'Sorotan Konten',
    contentDesc: 'Postingan, video, dan ruang komunitas Mentawai Project — tampil langsung di sini.',
    highlights: [
      { id: 'hl-1', title: '@akugenerasibaru.id', caption: 'Kanal cerita & produk pendukung Generasi Baru Mentawai.', url: 'https://www.instagram.com/akugenerasibaru.id/', image: '', display: 'card', visible: true },
      { id: 'hl-2', title: '@mentawaiproject.id', caption: 'Instagram komunitas: edukasi bulanan dan kabar terbaru.', url: 'https://www.instagram.com/mentawaiproject.id/', image: '', display: 'card', visible: true }
    ],
    discordName: 'Discord Generasi Baru',
    discordDesc: 'Ruang diskusi komunitas Generasi Baru Mentawai.',
    discordImage: '',
    lynkName: 'Lynk.id Mentawai Project',
    lynkDesc: 'Katalog produk & tautan resmi.',
    lynkImage: '',
    teamIntro: 'Digagas dan dijalankan secara swadaya oleh anak muda Mentawai, dengan visi memajukan pendidikan dan literasi.',
    hubTitle: 'Terhubung dengan Ekosistem Mentawai Project',
    hubDesc: 'Circle WA masih tahap awal (±20 anggota) dan sedang dirintis menjadi ruang diskusi berjadwal tetap lewat Discord Generasi Baru. Ikuti cerita dan materi edukasinya di Instagram.',
    collabText: 'Ingin berkolaborasi? Kirim DM ke Instagram @mentawaiproject.id.',
    footerTagline: 'Gerakan Independen Anak Muda Mentawai.',
    sections: { tentang: true, program: true, konten: true, produk: true, tim: true, komunitas: true },
    discordUrl: 'https://discord.gg/sgAwpjBXr',
    lynkUrl: 'https://lynk.id/mentawaiproject.id',
    socials: [
      { id: 'soc-1', platform: 'Instagram Komunitas', handle: '@mentawaiproject.id', url: 'https://www.instagram.com/mentawaiproject.id/', visible: true },
      { id: 'soc-2', platform: 'Instagram Cerita & Produk', handle: '@akugenerasibaru.id', url: 'https://www.instagram.com/akugenerasibaru.id/', visible: true },
      { id: 'soc-3', platform: 'Tautan Resmi & Produk', handle: 'Katalog Lynk.id', url: 'https://lynk.id/mentawaiproject.id', visible: true },
      { id: 'soc-4', platform: 'Server Discord Komunitas', handle: 'Gabung Discord', url: 'https://discord.gg/sgAwpjBXr', visible: true }
    ]
  };

  const LIST_KEYS = ['metrics', 'programs', 'products', 'founders', 'socials', 'highlights'];

  // Gabungkan data tersimpan dengan data awal, rapikan format lama (aman untuk data versi sebelumnya).
  function mergeConfig(incoming) {
    const src = incoming && typeof incoming === 'object' && !Array.isArray(incoming) ? incoming : {};
    const out = Object.assign(clone(DEFAULT_DATA), src);
    out.sections = Object.assign({}, DEFAULT_DATA.sections, src.sections || {});
    out.missions = (Array.isArray(out.missions) ? out.missions : []).map((m, i) =>
      typeof m === 'string'
        ? { id: 'mis-' + i, text: m, visible: true }
        : Object.assign({ id: 'mis-' + i, text: '', visible: true }, m)
    );
    LIST_KEYS.forEach((k) => { if (!Array.isArray(out[k])) out[k] = clone(DEFAULT_DATA[k]); });
    const fixMedia = (it) => { if (!it.display) it.display = 'auto'; if (typeof it.image !== 'string') it.image = ''; };
    out.programs.forEach((p) => { if (!Array.isArray(p.examples)) p.examples = []; p.examples.forEach(fixMedia); });
    out.highlights.forEach(fixMedia);
    out.founders.forEach((f) => {
      const m = /^\.\/founder-(ferdi|charlie|deisme|velsia)\.png$/.exec(f.photo || '');
      if (m) f.photo = './founder-' + m[1] + '.jpg';
    });
    ['discordUrl', 'lynkUrl'].forEach((k) => { if (typeof out[k] !== 'string') out[k] = DEFAULT_DATA[k]; });
    return out;
  }

  let state = clone(DEFAULT_DATA);
  let adminKey = '';
  let adminLocal = false;
  try {
    adminKey = sessionStorage.getItem(ADMIN_KEY_STORE) || '';
    adminLocal = sessionStorage.getItem(ADMIN_LOCAL_STORE) === '1';
  } catch (e) { /* sessionStorage tidak tersedia */ }
  let syncMode = 'local';

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(url) {
    const raw = String(url || '').trim();
    if (!raw) return '#';
    if (/^https?:\/\//i.test(raw) || raw.startsWith('./') || raw.startsWith('data:image/')) {
      return raw;
    }
    return 'https://' + raw;
  }

  function showToast(msg) {
    const el = document.getElementById('toastBanner');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
      el.hidden = true;
    }, 3400);
  }

  // Theme Management (Hitam / Putih + Soft Emerald)
  function applyTheme(theme) {
    const t = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(THEME_KEY, t);
    const logo = document.getElementById('brandLogoImg');
    const sun = document.getElementById('themeIconSun');
    const moon = document.getElementById('themeIconMoon');
    const metaTheme = document.getElementById('metaThemeColor');
    if (logo) logo.src = t === 'light' ? './logo-dark.png' : './logo-light.png';
    if (sun) sun.hidden = t !== 'dark';
    if (moon) moon.hidden = t !== 'light';
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#F6F8F7' : '#090C0B');
  }

  // ==========================================================================
  // PEMUATAN DATA: cache browser + content.json (GitHub) + online (Upstash)
  // ==========================================================================
  function readLocal() {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function writeLocal(cfg) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch (e) { /* penyimpanan penuh */ }
  }

  async function fetchJson(url, opts) {
    try {
      const res = await fetch(url, opts);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) { return null; }
  }

  async function apiCall(action, opts) {
    const o = opts || {};
    const headers = { 'Content-Type': 'application/json' };
    if (o.key) headers['X-Admin-Key'] = o.key;
    const res = await fetch(API + '?a=' + action, {
      method: o.method || 'POST',
      headers,
      body: o.body ? JSON.stringify(o.body) : undefined
    });
    let json = null;
    try { json = await res.json(); } catch (e) { json = null; }
    return { status: res.status, json };
  }

  async function loadInitialConfig() {
    const local = readLocal();
    if (local) state = mergeConfig(local);
    renderPublicSite();

    const [staticCfg, remote] = await Promise.all([
      fetchJson('./content.json', { cache: 'no-cache' }),
      fetchJson(API + '?a=config')
    ]);
    if (remote && remote.mode) syncMode = remote.mode;

    let best = null;
    if (remote && remote.config && typeof remote.config === 'object') {
      best = remote.config;
    } else {
      const stamp = (c) => (c && Number(c._updated)) || 0;
      const cands = [local, staticCfg].filter((c) => c && typeof c === 'object' && Object.keys(c).length > 0);
      cands.sort((a, b) => stamp(b) - stamp(a));
      best = cands[0] || null;
    }
    if (best) {
      const merged = mergeConfig(best);
      if (JSON.stringify(merged) !== JSON.stringify(state)) {
        state = merged;
        writeLocal(state);
        renderPublicSite();
      }
    }
    updateAdminIndicator();
  }

  function updateAdminIndicator() {
    const dot = document.getElementById('adminActiveDot');
    const badge = document.getElementById('syncStatusBadge');
    if (dot) dot.hidden = !adminKey;
    if (badge) {
      badge.textContent = adminLocal
        ? 'Server Belum Aktif'
        : (syncMode === 'cloud' ? 'Online · Semua Pengunjung' : 'Database Belum Terhubung');
    }
    renderStorageCard();
  }

  // ==========================================================================
  // EMBED KONTEN: Instagram, YouTube, TikTok, Discord, gambar, atau kartu
  // ==========================================================================
  const DISCORD_PATH = 'M41.6 22.1a24.8 24.8 0 0 0-6.1-1.9c-.3.5-.6 1.1-.8 1.6a23 23 0 0 0-6.8 0 16 16 0 0 0-.8-1.6 24.8 24.8 0 0 0-6.1 1.9c-3.9 5.8-4.9 11.4-4.4 17a25 25 0 0 0 7.5 3.8c.6-.8 1.1-1.7 1.6-2.6-.9-.3-1.7-.7-2.5-1.2.2-.2.4-.3.6-.5 4.8 2.2 10.1 2.2 14.8 0 .2.2.4.3.6.5-.8.5-1.6.9-2.5 1.2.5.9 1 1.8 1.6 2.6a25 25 0 0 0 7.5-3.8c.6-6.5-1-12.1-4.6-17ZM26.8 35.6c-1.5 0-2.7-1.4-2.7-3s1.2-3 2.7-3 2.7 1.4 2.7 3-1.2 3-2.7 3Zm10.4 0c-1.5 0-2.7-1.4-2.7-3s1.2-3 2.7-3 2.7 1.4 2.7 3-1.2 3-2.7 3Z';
  const DISCORD_SVG = '<svg viewBox="0 0 64 64" width="48" height="48" aria-hidden="true"><rect x="4" y="4" width="56" height="56" rx="18" fill="#5865F2"/><path d="' + DISCORD_PATH + '" fill="#fff"/></svg>';
  const IG_RESERVED = ['p', 'reel', 'reels', 'tv', 'stories', 'explore', 'accounts', 'direct', 'about', 'legal'];
  const discordCache = {};

  function hostOf(url) {
    try { return new URL(safeUrl(url)).hostname.replace(/^(www|m)\./i, '').toLowerCase(); } catch (e) { return ''; }
  }

  function parseMedia(url) {
    const raw = String(url || '').trim();
    if (!raw) return { type: 'none' };
    let u;
    try { u = new URL(safeUrl(raw)); } catch (e) { return { type: 'link' }; }
    const host = u.hostname.replace(/^(www|m)\./i, '').toLowerCase();
    const parts = u.pathname.split('/').filter(Boolean);
    const codeRe = /^[A-Za-z0-9_-]{5,64}$/;
    const inviteRe = /^[A-Za-z0-9-]{2,32}$/;

    if (host === 'instagram.com' || host === 'instagr.am') {
      const kinds = ['p', 'reel', 'reels', 'tv'];
      let i = -1;
      if (kinds.includes(parts[0])) i = 0;
      else if (parts[0] && kinds.includes(parts[1])) i = 1;
      if (i >= 0 && codeRe.test(parts[i + 1] || '')) {
        return { type: 'instagram', kind: parts[i] === 'reels' ? 'reel' : parts[i], code: parts[i + 1] };
      }
      if (parts[0] && !IG_RESERVED.includes(parts[0]) && /^[A-Za-z0-9._]{1,30}$/.test(parts[0])) {
        return { type: 'instagram-profile', user: parts[0] };
      }
      return { type: 'link' };
    }
    if (host === 'youtube.com' || host === 'music.youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com') {
      let vid = '';
      let short = false;
      if (host === 'youtu.be') vid = parts[0] || '';
      else if (parts[0] === 'watch') vid = u.searchParams.get('v') || '';
      else if (['shorts', 'embed', 'live', 'v'].includes(parts[0])) { vid = parts[1] || ''; short = parts[0] === 'shorts'; }
      if (/^[A-Za-z0-9_-]{11}$/.test(vid)) return { type: 'youtube', id: vid, short };
      return { type: 'link' };
    }
    if (host === 'tiktok.com' && parts[1] === 'video' && /^\d{8,25}$/.test(parts[2] || '')) {
      return { type: 'tiktok', id: parts[2] };
    }
    if (host === 'discord.gg' && inviteRe.test(parts[0] || '')) return { type: 'discord', code: parts[0] };
    if ((host === 'discord.com' || host === 'discordapp.com') && parts[0] === 'invite' && inviteRe.test(parts[1] || '')) {
      return { type: 'discord', code: parts[1] };
    }
    if (/\.(png|jpe?g|webp|gif|avif)$/i.test(u.pathname)) return { type: 'image' };
    return { type: 'link' };
  }

  function detectPlatform(url) {
    const m = parseMedia(url);
    if (m.type === 'instagram' || m.type === 'instagram-profile') return 'Instagram';
    if (m.type === 'youtube') return 'YouTube';
    if (m.type === 'tiktok') return 'TikTok';
    if (m.type === 'discord') return 'Discord';
    const h = hostOf(url);
    if (h === 'lynk.id') return 'Lynk.id';
    if (h === 'wa.me' || h === 'whatsapp.com' || h === 'chat.whatsapp.com') return 'WhatsApp';
    if (h === 'tiktok.com' || h === 'vm.tiktok.com') return 'TikTok';
    if (h === 'facebook.com' || h === 'fb.com') return 'Facebook';
    return 'Tautan';
  }

  function mediaCardHtml(it, m, label, href) {
    const title = String(it.title || '').trim();
    const cap = String(it.caption || '').trim();
    const imgSrc = it.image ? safeUrl(it.image) : (m.type === 'image' ? safeUrl(it.url) : '');
    return `
      <a class="media-card" href="${href}" target="_blank" rel="noopener noreferrer">
        <div class="media-card-img">${imgSrc
          ? `<img src="${esc(imgSrc)}" alt="${esc(title || label)}" loading="lazy" />`
          : `<span class="media-card-fallback">${esc(label)}</span>`}</div>
        <div class="media-card-body">
          <span class="platform-tag">${esc(label)}</span>
          <strong>${esc(title || ('Buka di ' + label))}</strong>
          ${cap ? `<p>${esc(cap)}</p>` : ''}
          <span class="media-card-cta">Buka ↗</span>
        </div>
      </a>`;
  }

  function discordEmbedHtml(it, m, href) {
    const icon = it.image ? safeUrl(it.image) : '';
    return `
      <div class="discord-embed" data-discord="${esc(m.code)}"
           data-has-title="${it.title ? '1' : ''}" data-has-cap="${it.caption ? '1' : ''}" data-has-img="${icon ? '1' : ''}">
        <div class="de-icon">${icon ? `<img src="${esc(icon)}" alt="" />` : DISCORD_SVG}</div>
        <div class="de-info">
          <span class="platform-tag">Discord</span>
          <strong class="de-name">${esc(it.title || 'Server Discord')}</strong>
          <span class="de-count">${esc(it.caption || 'Ketuk untuk bergabung')}</span>
        </div>
        <a class="btn-emerald-pill sm" href="${href}" target="_blank" rel="noopener noreferrer">Gabung</a>
      </div>`;
  }

  // Satu fungsi untuk semua jenis tautan: tampilkan konten langsung bila bisa, jika tidak jadi kartu.
  function mediaItemHtml(it) {
    const m = parseMedia(it.url);
    const href = esc(safeUrl(it.url));
    const label = detectPlatform(it.url);
    const title = String(it.title || '').trim();
    const cap = String(it.caption || '').trim();
    const embed = it.display !== 'card';
    const meta = (title || cap)
      ? `<figcaption class="media-meta">${title ? `<strong>${esc(title)}</strong>` : ''}${cap ? `<span>${esc(cap)}</span>` : ''}</figcaption>`
      : '';
    const open = `<a class="media-open" href="${href}" target="_blank" rel="noopener noreferrer">Buka di ${esc(label)} ↗</a>`;
    const frame = (cls, src, ttl) => `
      <figure class="media-item">
        <div class="embed-box ${cls}">
          <iframe src="${esc(src)}" title="${esc(ttl)}" loading="lazy" allowfullscreen scrolling="no"
                  referrerpolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"></iframe>
        </div>
        ${meta}${open}
      </figure>`;

    if (embed) {
      if (m.type === 'instagram') return frame('embed-ig', 'https://www.instagram.com/' + m.kind + '/' + m.code + '/embed/', 'Instagram ' + (title || m.code));
      if (m.type === 'instagram-profile') return frame('embed-igp', 'https://www.instagram.com/' + m.user + '/embed/', 'Instagram @' + m.user);
      if (m.type === 'youtube') return frame(m.short ? 'embed-yts' : 'embed-yt', 'https://www.youtube-nocookie.com/embed/' + m.id, 'YouTube ' + (title || m.id));
      if (m.type === 'tiktok') return frame('embed-tt', 'https://www.tiktok.com/embed/v2/' + m.id, 'TikTok ' + (title || m.id));
      if (m.type === 'discord') return discordEmbedHtml(it, m, href);
      if (m.type === 'image') {
        return `<figure class="media-item"><a href="${href}" target="_blank" rel="noopener noreferrer"><img class="media-img" src="${esc(safeUrl(it.url))}" alt="${esc(title || 'Gambar')}" loading="lazy" /></a>${meta}</figure>`;
      }
    }
    return mediaCardHtml(it, m, label, href);
  }

  async function getDiscordInfo(code) {
    if (discordCache[code] !== undefined) return discordCache[code];
    const j = await fetchJson(API + '?a=discord&code=' + encodeURIComponent(code));
    discordCache[code] = j && j.ok ? j : null;
    return discordCache[code];
  }

  function fmtNum(n) {
    return Number(n || 0).toLocaleString('id-ID');
  }

  function discordCountText(info) {
    if (!info || !info.members) return '';
    return fmtNum(info.members) + ' anggota' + (info.online ? ' · ' + fmtNum(info.online) + ' online' : '');
  }

  // Isi nama, ikon, dan jumlah anggota Discord dari data resmi undangan (bila server aktif)
  async function hydrateDiscordCards() {
    const cards = document.querySelectorAll('.discord-embed[data-discord]');
    for (const el of cards) {
      const info = await getDiscordInfo(el.dataset.discord);
      if (!info || !el.isConnected) continue;
      const nameEl = el.querySelector('.de-name');
      const countEl = el.querySelector('.de-count');
      const iconEl = el.querySelector('.de-icon');
      if (!el.dataset.hasTitle && info.name && nameEl) nameEl.textContent = info.name;
      const counts = discordCountText(info);
      if (!el.dataset.hasCap && counts && countEl) countEl.textContent = counts;
      if (!el.dataset.hasImg && info.icon && iconEl) iconEl.innerHTML = `<img src="${esc(info.icon)}" alt="" />`;
    }
  }

  function setIconImg(imgId, src) {
    const img = document.getElementById(imgId);
    if (!img) return;
    const svg = img.nextElementSibling;
    if (src) {
      img.src = safeUrl(src);
      img.hidden = false;
      if (svg) svg.style.display = 'none';
    } else {
      img.hidden = true;
      img.removeAttribute('src');
      if (svg) svg.style.display = '';
    }
  }

  async function enrichHubDiscord() {
    const m = parseMedia(state.discordUrl);
    if (m.type !== 'discord') return;
    const info = await getDiscordInfo(m.code);
    if (!info) return;
    if (!state.discordName && info.name) setText('discordNameText', info.name);
    const counts = discordCountText(info);
    if (counts) setText('discordInfoText', counts);
    if (!state.discordImage && info.icon) setIconImg('discordIconImg', info.icon);
  }

  function setHtml(el, html) {
    if (!el) return;
    if (el._html !== html) { el.innerHTML = html; el._html = html; }
  }

  // Render Public Landing Page
  function renderPublicSite() {
    // Hero
    setText('heroBadgeText', state.heroBadge);
    setText('heroHashtagText', state.heroHashtag);
    const titleEl = document.getElementById('heroTitleText');
    if (titleEl) {
      const rawTitle = esc(state.heroTitle);
      titleEl.innerHTML = rawTitle.replace(/(level-up)/i, '<span class="text-emerald-soft">$1</span>');
    }
    setText('heroSubtitleText', state.heroSubtitle);

    // Primary Links
    const dUrl = safeUrl(state.discordUrl);
    const lUrl = safeUrl(state.lynkUrl);
    setHref('heroDiscordBtn', dUrl);
    setHref('hubDiscordCard', dUrl);
    setHref('heroLynkBtn', lUrl);
    setHref('hubLynkCard', lUrl);
    setHref('sectionLynkLink', lUrl);
    setText('discordNameText', state.discordName || 'Discord Generasi Baru');
    setText('discordInfoText', state.discordDesc || '');
    setIconImg('discordIconImg', state.discordImage);
    setText('lynkNameText', state.lynkName || 'Lynk.id Mentawai Project');
    setText('lynkInfoText', state.lynkDesc || '');
    setIconImg('lynkIconImg', state.lynkImage);
    enrichHubDiscord();

    // Tampil / sembunyi bagian halaman + tautan menunya
    const sec = state.sections || {};
    ['tentang', 'program', 'konten', 'produk', 'tim', 'komunitas'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.hidden = sec[id] === false;
    });
    document.querySelectorAll('[data-sec]').forEach((a) => {
      const key = a.dataset.sec === 'visi-misi' ? 'tentang' : a.dataset.sec;
      a.hidden = sec[key] === false;
    });

    // Teks bagian tim, komunitas, footer
    setText('teamIntroText', state.teamIntro);
    setText('contentTitleText', state.contentTitle);
    setText('contentDescText', state.contentDesc);
    setText('hubTitleText', state.hubTitle);
    setText('hubDescText', state.hubDesc);
    setText('footerTaglineText', state.footerTagline);
    const collabBox = document.getElementById('collabBox');
    if (collabBox) {
      collabBox.hidden = !String(state.collabText || '').trim();
      setText('collabText', state.collabText);
    }

    // Metrics
    const metricsGrid = document.getElementById('metricsGrid');
    if (metricsGrid) {
      const visibleMetrics = (state.metrics || []).filter((m) => m.visible !== false);
      metricsGrid.innerHTML = visibleMetrics.map((m) => `
        <div class="metric-item">
          <span class="metric-value">${esc(m.value)}</span>
          <span class="metric-label">${esc(m.label)}</span>
          <span class="metric-note">${esc(m.note)}</span>
        </div>
      `).join('');
    }

    // About, Vision & Missions
    setText('aboutLeadText', state.aboutLead);
    setText('aboutBodyText', state.aboutBody);
    setText('aboutStatusNoteText', state.aboutNote);
    setText('visionText', state.vision);

    const missionList = document.getElementById('missionList');
    if (missionList) {
      missionList.innerHTML = (state.missions || []).filter((m) => m.visible !== false).map((m) => `<li>${esc(m.text)}</li>`).join('');
    }

    // Programs + Pasted Content Links
    const programsGrid = document.getElementById('programsGrid');
    if (programsGrid) {
      const visibleProgs = (state.programs || []).filter((p) => p.visible !== false);
      programsGrid.innerHTML = visibleProgs.map((p) => {
        const pillCls = p.statusType === 'priority' ? 'status-pill priority' : (p.statusType === 'neutral' ? 'status-pill neutral' : 'status-pill');
        const examples = (Array.isArray(p.examples) ? p.examples : []).filter((ex) => ex.visible !== false);
        const firstEx = examples[0];
        const previewHtml = firstEx ? `
          <div class="example-preview-box">
            <div class="example-preview-header">
              <span class="platform-tag">${esc(detectPlatform(firstEx.url))}</span>
              ${examples.length > 1 ? `<span class="prog-mission-ref">+${examples.length - 1} konten lainnya</span>` : ''}
            </div>
            <button type="button" class="example-link-card" data-open-program="${esc(p.id)}">
              <div class="example-link-info">
                <span class="example-link-title">${esc(firstEx.title || ('Lihat konten ' + detectPlatform(firstEx.url)))}</span>
                ${firstEx.caption ? `<span class="metric-note">${esc(firstEx.caption)}</span>` : ''}
              </div>
              <span aria-hidden="true">▶</span>
            </button>
          </div>
        ` : '';

        return `
          <article class="program-card glass-card">
            <div>
              <div class="prog-top">
                <span class="${pillCls}">${esc(p.status)}</span>
                <span class="prog-mission-ref">${esc(p.missionRef)}</span>
              </div>
              <h3 class="prog-title">${esc(p.title)}</h3>
              <p class="prog-desc">${esc(p.shortDesc)}</p>
              ${previewHtml}
            </div>
            <div class="prog-actions">
              <button type="button" class="btn-glass-secondary sm full-w" data-open-program="${esc(p.id)}">
                Lihat Detail &amp; Konten (${examples.length})
              </button>
            </div>
          </article>
        `;
      }).join('');
    }

    // Products (Lynk.id)
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
      const visibleProducts = (state.products || []).filter((pr) => pr.visible !== false);
      if (visibleProducts.length === 0) {
        productsGrid.innerHTML = `<div class="glass-card about-main-card"><p class="about-body">Produk akan segera hadir. Sementara itu, kunjungi tautan resmi kami di Lynk.id.</p></div>`;
      } else {
        productsGrid.innerHTML = visibleProducts.map((pr) => {
          const hasImg = pr.image && pr.image.trim().length > 0;
          const thumbHtml = hasImg
            ? `<img src="${esc(safeUrl(pr.image))}" alt="${esc(pr.title)}" class="product-thumb-img" loading="lazy" />`
            : `<div class="product-thumb-fallback"><span>MENTAWAI PROJECT</span></div>`;

          return `
            <article class="product-card glass-card">
              <div class="product-thumb-wrap">
                ${thumbHtml}
                ${pr.badge ? `<span class="product-badge-corner">${esc(pr.badge)}</span>` : ''}
              </div>
              <div class="product-body">
                <h3 class="product-title">${esc(pr.title)}</h3>
                <p class="product-desc">${esc(pr.description)}</p>
                <div class="product-footer">
                  <span class="product-price">${esc(pr.price || 'Lynk.id')}</span>
                  <a href="${esc(safeUrl(pr.url))}" target="_blank" rel="noopener noreferrer" class="btn-emerald-pill sm">
                    Lihat Produk ↗
                  </a>
                </div>
              </div>
            </article>
          `;
        }).join('');
      }
    }

    // Founders (Ordered strictly: Ferdi, Charlie, Deisme, Velsia)
    const foundersGrid = document.getElementById('foundersGrid');
    if (foundersGrid) {
      const visibleFounders = (state.founders || []).filter((f) => f.visible !== false);
      foundersGrid.innerHTML = visibleFounders.map((f) => `
        <article class="founder-card glass-card">
          <div class="founder-portrait-stage">
            <img src="${esc(safeUrl(f.photo || './icon-512.png'))}" alt="${esc(f.name)}" class="founder-portrait-img" loading="lazy" />
          </div>
          <span class="founder-role-pill">${esc(f.role)}</span>
          <h3 class="founder-name">${esc(f.name)}</h3>
          <p class="founder-focus">${esc(f.focus)}</p>
        </article>
      `).join('');
    }

    // Social Links List
    const socialList = document.getElementById('socialLinksList');
    if (socialList) {
      const visibleSocials = (state.socials || []).filter((s) => s.visible !== false);
      socialList.innerHTML = visibleSocials.map((s) => `
        <a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer" class="social-row-link">
          <div class="social-row-meta">
            <span class="social-row-platform">${esc(s.platform)}</span>
            <span class="social-row-handle">${esc(s.handle)}</span>
          </div>
          <span aria-hidden="true">↗</span>
        </a>
      `).join('');
    }

    // Sorotan Konten (tampil langsung)
    const hlGrid = document.getElementById('highlightsGrid');
    if (hlGrid) {
      const items = (state.highlights || []).filter((x) => x.visible !== false && String(x.url || '').trim());
      setHtml(hlGrid, items.length
        ? items.map(mediaItemHtml).join('')
        : '<div class="glass-card about-main-card"><p class="about-body">Konten akan segera ditampilkan di sini.</p></div>');
      hydrateDiscordCards();
    }
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val || '';
  }

  function setHref(id, url) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('href', url);
  }

  // Program Detail Modal — konten contoh tampil langsung
  function openProgramModal(progId) {
    const prog = (state.programs || []).find((p) => p.id === progId);
    if (!prog) return;
    setText('progModalStatus', prog.status);
    setText('progModalTitle', prog.title);
    const body = document.getElementById('progModalBody');
    const examples = (Array.isArray(prog.examples) ? prog.examples : []).filter((ex) => ex.visible !== false && String(ex.url || '').trim());
    const exListHtml = examples.length > 0
      ? `<div class="modal-media-list">${examples.map(mediaItemHtml).join('')}</div>`
      : '<p class="form-hint">Belum ada contoh konten untuk program ini.</p>';

    body.innerHTML = `
      <p class="about-lead">${esc(prog.shortDesc)}</p>
      <p class="about-body">${esc(prog.fullDetail || '')}</p>
      <div class="status-note-box" style="margin-bottom:16px;">
        <div>
          <strong>Keterkaitan Misi</strong>
          <p>${esc(prog.missionRef)}</p>
        </div>
      </div>
      <h4 style="margin:0 0 10px;font-size:0.95rem;">Contoh Konten</h4>
      ${exListHtml}
    `;
    document.getElementById('programModalBackdrop').hidden = false;
    hydrateDiscordCards();
  }

  // ==========================================================================
  // TRIPLE-CLICK ON BRAND LOGO -> ADMIN GATE
  // ==========================================================================
  function setupTripleClickAdmin() {
    const trigger = document.getElementById('logoTripleTrigger');
    if (!trigger) return;
    let clicks = [];
    trigger.addEventListener('click', () => {
      const now = Date.now();
      clicks = clicks.filter((t) => now - t < 900);
      clicks.push(now);
      if (clicks.length >= 3) {
        clicks = [];
        if (adminKey) {
          openAdminPanel();
        } else {
          document.getElementById('adminLoginError').hidden = true;
          document.getElementById('adminPasswordInput').value = '';
          document.getElementById('adminLoginBackdrop').hidden = false;
          setTimeout(() => document.getElementById('adminPasswordInput').focus(), 80);
        }
      }
    });
  }

  // Verifikasi sandi di browser: hanya dipakai bila server (folder api/) belum aktif -> membuka MODE LOKAL saja.
  const LOCAL_KEY = { salt: '2e92fd432bf70743ad6913a0283fc20a', iters: 150000, hash: '863c7ccb04537dd1beb7cdb787d6e6614dcd0480333b871e5bffb8f2a857c6de' };

  function hexToBytes(h) {
    const out = new Uint8Array(h.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(h.substr(i * 2, 2), 16);
    return out;
  }

  async function verifyLocalPassword(pw) {
    if (!(window.crypto && crypto.subtle)) return false;
    try {
      const keyMat = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
      const bits = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', hash: 'SHA-256', salt: hexToBytes(LOCAL_KEY.salt), iterations: LOCAL_KEY.iters }, keyMat, 256);
      const hex = Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
      return hex === LOCAL_KEY.hash;
    } catch (e) { return false; }
  }

  function startAdminSession(password, local) {
    adminKey = password;
    adminLocal = !!local;
    try {
      sessionStorage.setItem(ADMIN_KEY_STORE, adminKey);
      sessionStorage.setItem(ADMIN_LOCAL_STORE, local ? '1' : '0');
    } catch (e) { /* abaikan */ }
    document.getElementById('adminLoginBackdrop').hidden = true;
    updateAdminIndicator();
    openAdminPanel();
    showToast(local
      ? 'Masuk (mode lokal). Server belum aktif, perubahan hanya tersimpan di browser ini.'
      : 'Berhasil masuk ke Panel Admin.');
  }

  async function handleAdminLogin(e) {
    e.preventDefault();
    const passInput = document.getElementById('adminPasswordInput');
    const errEl = document.getElementById('adminLoginError');
    const submitBtn = document.getElementById('adminLoginSubmitBtn');
    const password = passInput.value.trim();
    if (!password) return;

    errEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memverifikasi...';

    try {
      let r;
      try { r = await apiCall('auth', { body: { password } }); } catch (err) { r = { status: 0, json: null }; }

      if (r.json && r.json.ok) {
        syncMode = r.json.db ? 'cloud' : 'local';
        startAdminSession(password, false);
      } else if (r.json && (r.status === 401 || r.status === 429)) {
        errEl.textContent = r.json.message || 'Kata sandi salah.';
        errEl.hidden = false;
      } else if (await verifyLocalPassword(password)) {
        startAdminSession(password, true);
      } else {
        errEl.textContent = 'Kata sandi salah.';
        errEl.hidden = false;
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Masuk ke Panel Admin';
    }
  }

  // ==========================================================================
  // ADMIN PANEL BUILDER & CRUD OPERATIONS
  // ==========================================================================
  let draft = null;

  const SECTION_LABELS = [
    ['tentang', 'Tentang, Visi & Misi'],
    ['program', 'Program & Narasi'],
    ['konten', 'Sorotan Konten'],
    ['produk', 'Produk & Publikasi Lynk.id'],
    ['tim', 'Susunan Penggerak (Tim Inti)'],
    ['komunitas', 'Komunitas & Kontak']
  ];

  const MAX_PAYLOAD_BYTES = 880 * 1024;

  function moveBtns(key, idx, len) {
    return `<button type="button" class="btn-move" data-move="${key}:${idx}:-1" aria-label="Naikkan" ${idx === 0 ? 'disabled' : ''}>↑</button>` +
           `<button type="button" class="btn-move" data-move="${key}:${idx}:1" aria-label="Turunkan" ${idx >= len - 1 ? 'disabled' : ''}>↓</button>`;
  }

  function itemActions(key, idx, len, visible, visAttr, delAttr) {
    return `
      <div class="item-actions">
        ${moveBtns(key, idx, len)}
        <label class="toggle-label">
          <input type="checkbox" ${visible !== false ? 'checked' : ''} ${visAttr}="${idx}" /> Tampilkan
        </label>
        <button type="button" class="btn-danger-soft" ${delAttr}="${idx}">Hapus</button>
      </div>`;
  }

  function openAdminPanel() {
    draft = mergeConfig(state);
    populateAdminForms();
    document.getElementById('adminPanelBackdrop').hidden = false;
  }

  function populateAdminForms() {
    const set = (id, v) => { document.getElementById(id).value = v || ''; };
    set('admHeroBadge', draft.heroBadge);
    set('admHeroHashtag', draft.heroHashtag);
    set('admHeroTitle', draft.heroTitle);
    set('admHeroSubtitle', draft.heroSubtitle);
    set('admAboutLead', draft.aboutLead);
    set('admAboutBody', draft.aboutBody);
    set('admAboutNote', draft.aboutNote);
    set('admVision', draft.vision);
    set('admDiscordUrl', draft.discordUrl);
    set('admLynkUrl', draft.lynkUrl);
    set('admTeamIntro', draft.teamIntro);
    set('admHubTitle', draft.hubTitle);
    set('admHubDesc', draft.hubDesc);
    set('admCollab', draft.collabText);
    set('admFooter', draft.footerTagline);
    set('admContentTitle', draft.contentTitle);
    set('admContentDesc', draft.contentDesc);
    set('admDiscordName', draft.discordName);
    set('admDiscordDesc', draft.discordDesc);
    set('admDiscordImage', String(draft.discordImage || '').startsWith('data:') ? '' : draft.discordImage);
    set('admLynkName', draft.lynkName);
    set('admLynkDesc', draft.lynkDesc);
    set('admLynkImage', String(draft.lynkImage || '').startsWith('data:') ? '' : draft.lynkImage);

    renderAdmSections();
    renderAdmMetrics();
    renderAdmMissions();
    renderAdmPrograms();
    renderAdmHighlights();
    renderAdmProducts();
    renderAdmFounders();
    renderAdmSocials();
    renderStorageCard();
  }

  function renderAdmSections() {
    const wrap = document.getElementById('admSectionsList');
    wrap.innerHTML = SECTION_LABELS.map(([key, label]) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>${esc(label)}</strong>
          <label class="toggle-label">
            <input type="checkbox" ${draft.sections[key] !== false ? 'checked' : ''} data-sec-vis="${key}" /> Tampilkan
          </label>
        </div>
      </div>
    `).join('');
  }

  function emptyHint(text) {
    return `<p class="form-hint">${esc(text)}</p>`;
  }

  // ---- Editor konten tertaut (dipakai Contoh Program & Sorotan Konten) ----
  function resolveMf(ref) {
    const p = String(ref).split('.');
    if (p[0] === 'ex') { const pr = draft.programs[+p[1]]; return pr ? pr.examples[+p[2]] : null; }
    if (p[0] === 'hl') return draft.highlights[+p[1]] || null;
    return null;
  }

  function rerenderMf(ref) {
    if (String(ref).startsWith('ex.')) renderAdmPrograms(); else renderAdmHighlights();
  }

  function mediaFields(ref, it) {
    const imgIsData = String(it.image || '').startsWith('data:');
    return `
      <div class="admin-grid-2">
        <div class="field-group">
          <label>Judul (opsional)</label>
          <input type="text" class="glass-input" value="${esc(it.title)}" data-mf="${ref}|title" />
        </div>
        <div class="field-group">
          <label>Paste Link (Instagram / Reels / YouTube / TikTok / Discord / web)</label>
          <input type="url" class="glass-input" placeholder="https://www.instagram.com/p/..." value="${esc(it.url)}" data-mf="${ref}|url" />
        </div>
      </div>
      <div class="field-group">
        <label>Keterangan Singkat (opsional)</label>
        <input type="text" class="glass-input" value="${esc(it.caption || '')}" data-mf="${ref}|caption" />
      </div>
      <div class="admin-grid-2">
        <div class="field-group">
          <label>Cara Tampil</label>
          <select class="glass-input" data-mf-sel="${ref}|display">
            <option value="auto" ${it.display !== 'card' ? 'selected' : ''}>Otomatis: tampilkan kontennya langsung</option>
            <option value="card" ${it.display === 'card' ? 'selected' : ''}>Kartu dengan gambar sampul</option>
          </select>
        </div>
        <div class="field-group">
          <label>Gambar Sampul (upload dari HP/laptop)</label>
          <input type="file" accept="image/*" class="glass-input" data-mf-file="${ref}" />
        </div>
      </div>
      <div class="field-group">
        <label>Atau link gambar sampul (URL)</label>
        <input type="text" class="glass-input" placeholder="https://..." value="${esc(imgIsData ? '' : (it.image || ''))}" data-mf="${ref}|image" />
        ${imgIsData ? '<p class="form-hint">Gambar dari perangkat sudah terpasang.</p>' : ''}
      </div>
      <div class="item-actions">
        <button type="button" class="btn-glass-secondary sm" data-mf-prev="${ref}">✨ Ambil judul &amp; gambar dari link</button>
        ${it.image ? `<button type="button" class="btn-danger-soft" data-mf-clear="${ref}">Hapus gambar</button>` : ''}
      </div>`;
  }

  // Ambil judul / deskripsi / gambar dari sebuah link lewat server (hanya mengisi kolom yang masih kosong)
  async function previewFill(obj, map, done) {
    const url = String(obj.url || '').trim();
    if (!url) { showToast('Isi link dulu.'); return; }
    if (adminLocal) { showToast('Fitur ini butuh server aktif (folder api/ + Redeploy).'); return; }
    showToast('Mengambil data dari link...');
    try {
      const r = await apiCall('preview', { body: { url: safeUrl(url) }, key: adminKey });
      if (r.status === 401) { forceLogout('Sesi admin tidak valid. Masuk lagi.'); return; }
      if (!r.json || !r.json.ok) { showToast((r.json && r.json.message) || 'Tidak bisa mengambil data dari link ini. Isi manual.'); return; }
      if (!obj[map.title] && r.json.title) obj[map.title] = r.json.title;
      if (!obj[map.text] && r.json.description) obj[map.text] = r.json.description;
      if (!obj[map.image] && r.json.image) { obj[map.image] = r.json.image; if ('display' in obj) obj.display = 'card'; }
      done();
      showToast('Berhasil diambil. Periksa isiannya lalu simpan.');
    } catch (e) {
      showToast('Server tidak terjangkau.');
    }
  }

  function renderAdmHighlights() {
    const wrap = document.getElementById('admHighlightsList');
    if (!wrap) return;
    const list = draft.highlights || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada konten. Klik "+ Tambah Konten".') : list.map((h, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Konten #${idx + 1} (${esc(detectPlatform(h.url))})</strong>
          ${itemActions('highlights', idx, list.length, h.visible, 'data-h-vis', 'data-h-del')}
        </div>
        ${mediaFields('hl.' + idx, h)}
      </div>
    `).join('');
  }

  function renderAdmMetrics() {
    const wrap = document.getElementById('admMetricsList');
    const list = draft.metrics || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada statistik. Klik "+ Tambah Statistik".') : list.map((m, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Statistik #${idx + 1}</strong>
          ${itemActions('metrics', idx, list.length, m.visible, 'data-m-vis', 'data-m-del')}
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Angka / Nilai (mis. 744)</label>
            <input type="text" class="glass-input" value="${esc(m.value)}" data-m-val="${idx}" />
          </div>
          <div class="field-group">
            <label>Label Utama (mis. @mentawaiproject.id)</label>
            <input type="text" class="glass-input" value="${esc(m.label)}" data-m-lbl="${idx}" />
          </div>
        </div>
        <div class="field-group">
          <label>Keterangan Singkat</label>
          <input type="text" class="glass-input" value="${esc(m.note)}" data-m-note="${idx}" />
        </div>
      </div>
    `).join('');
  }

  function renderAdmMissions() {
    const wrap = document.getElementById('admMissionsList');
    const list = draft.missions || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada misi. Klik "+ Tambah Misi".') : list.map((m, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Misi #${idx + 1}</strong>
          ${itemActions('missions', idx, list.length, m.visible, 'data-mis-vis', 'data-mis-del')}
        </div>
        <textarea class="glass-input" rows="2" data-mis-txt="${idx}">${esc(m.text)}</textarea>
      </div>
    `).join('');
  }

  function renderAdmPrograms() {
    const wrap = document.getElementById('admProgramsList');
    const list = draft.programs || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada program. Klik "+ Tambah Program".') : list.map((p, idx) => {
      const exs = p.examples || [];
      const exHtml = exs.map((ex, eIdx) => `
        <div class="admin-card" style="padding:12px;">
          <div class="item-editor-head">
            <span class="platform-tag">Contoh Konten #${eIdx + 1} (${esc(detectPlatform(ex.url))})</span>
            <div class="item-actions">
              ${moveBtns('ex:' + idx, eIdx, exs.length)}
              <label class="toggle-label">
                <input type="checkbox" ${ex.visible !== false ? 'checked' : ''} data-p-ex-vis="${idx}:${eIdx}" /> Tampilkan
              </label>
              <button type="button" class="btn-danger-soft" data-p-ex-del="${idx}:${eIdx}">Hapus Link</button>
            </div>
          </div>
          ${mediaFields('ex.' + idx + '.' + eIdx, ex)}
        </div>
      `).join('');

      return `
        <div class="item-editor-box">
          <div class="item-editor-head">
            <strong>Program: ${esc(p.title)}</strong>
            ${itemActions('programs', idx, list.length, p.visible, 'data-p-vis', 'data-p-del')}
          </div>
          <div class="admin-grid-2">
            <div class="field-group">
              <label>Nama Program</label>
              <input type="text" class="glass-input" value="${esc(p.title)}" data-p-title="${idx}" />
            </div>
            <div class="field-group">
              <label>Status Badge (mis. BERJALAN — PRIORITAS)</label>
              <input type="text" class="glass-input" value="${esc(p.status)}" data-p-status="${idx}" />
            </div>
          </div>
          <div class="admin-grid-2">
            <div class="field-group">
              <label>Turunan Misi</label>
              <input type="text" class="glass-input" value="${esc(p.missionRef)}" data-p-mref="${idx}" />
            </div>
            <div class="field-group">
              <label>Warna Badge Status</label>
              <select class="glass-input" data-p-stype="${idx}">
                <option value="priority" ${p.statusType === 'priority' ? 'selected' : ''}>Hijau Prioritas</option>
                <option value="active" ${p.statusType === 'active' ? 'selected' : ''}>Hijau Berjalan</option>
                <option value="neutral" ${p.statusType === 'neutral' ? 'selected' : ''}>Netral Jangka Panjang</option>
              </select>
            </div>
          </div>
          <div class="field-group">
            <label>Deskripsi Ringkas Kartu</label>
            <textarea class="glass-input" rows="2" data-p-sdesc="${idx}">${esc(p.shortDesc)}</textarea>
          </div>
          <div class="field-group">
            <label>Penjelasan Lengkap (Muncul saat diklik)</label>
            <textarea class="glass-input" rows="2" data-p-fdesc="${idx}">${esc(p.fullDetail || '')}</textarea>
          </div>
          <div class="row-between" style="margin-top:6px;">
            <label style="font-weight:700;font-size:0.84rem;">Contoh Postingan / Link Langsung</label>
            <button type="button" class="btn-glass-secondary sm" data-p-ex-add="${idx}">+ Paste Link Contoh</button>
          </div>
          ${exHtml}
        </div>
      `;
    }).join('');
  }

  function renderAdmProducts() {
    const wrap = document.getElementById('admProductsList');
    const list = draft.products || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada produk. Klik "+ Tambah Produk".') : list.map((pr, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Produk #${idx + 1}: ${esc(pr.title)}</strong>
          ${itemActions('products', idx, list.length, pr.visible, 'data-pr-vis', 'data-pr-del')}
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Nama Produk</label>
            <input type="text" class="glass-input" value="${esc(pr.title)}" data-pr-title="${idx}" />
          </div>
          <div class="field-group">
            <label>Harga / Label (mis. Rp25.000 atau Gratis)</label>
            <input type="text" class="glass-input" value="${esc(pr.price)}" data-pr-price="${idx}" />
          </div>
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Paste Link Produk Lynk.id</label>
            <input type="url" class="glass-input" placeholder="https://lynk.id/mentawaiproject.id/..." value="${esc(pr.url)}" data-pr-url="${idx}" />
          </div>
          <div class="field-group">
            <label>Badge Produk (mis. E-BOOK / MERCH)</label>
            <input type="text" class="glass-input" value="${esc(pr.badge || '')}" data-pr-badge="${idx}" />
          </div>
        </div>
        <div class="field-group">
          <label>Deskripsi Produk</label>
          <textarea class="glass-input" rows="2" data-pr-desc="${idx}">${esc(pr.description)}</textarea>
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Link Gambar Produk (URL)</label>
            <input type="text" class="glass-input" placeholder="https://... atau upload file di samping" value="${esc(String(pr.image || '').startsWith('data:') ? '' : (pr.image || ''))}" data-pr-img="${idx}" />
            ${String(pr.image || '').startsWith('data:') ? '<p class="form-hint">Foto dari perangkat sudah terpasang. Isi kolom ini untuk menggantinya dengan URL.</p>' : ''}
          </div>
          <div class="field-group">
            <label>Atau Upload Foto Produk dari Perangkat</label>
            <input type="file" accept="image/*" class="glass-input" data-pr-file="${idx}" />
          </div>
        </div>
        <div class="item-actions">
          <button type="button" class="btn-glass-secondary sm" data-pr-prev="${idx}">✨ Ambil judul, deskripsi &amp; gambar dari link</button>
        </div>
      </div>
    `).join('');
  }

  function renderAdmFounders() {
    const wrap = document.getElementById('admFoundersList');
    const list = draft.founders || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada penggerak. Klik "+ Tambah Penggerak".') : list.map((f, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Penggerak #${idx + 1}: ${esc(f.name)}</strong>
          ${itemActions('founders', idx, list.length, f.visible, 'data-f-vis', 'data-f-del')}
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Nama Lengkap</label>
            <input type="text" class="glass-input" value="${esc(f.name)}" data-f-name="${idx}" />
          </div>
          <div class="field-group">
            <label>Peran (mis. Co-Founder)</label>
            <input type="text" class="glass-input" value="${esc(f.role)}" data-f-role="${idx}" />
          </div>
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Fokus / Divisi</label>
            <input type="text" class="glass-input" value="${esc(f.focus)}" data-f-focus="${idx}" />
          </div>
          <div class="field-group">
            <label>Ganti Foto (Upload dari HP/Laptop)</label>
            <input type="file" accept="image/*" class="glass-input" data-f-file="${idx}" />
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderAdmSocials() {
    const wrap = document.getElementById('admSocialsList');
    const list = draft.socials || [];
    wrap.innerHTML = list.length === 0 ? emptyHint('Belum ada tautan. Klik "+ Tambah Tautan".') : list.map((s, idx) => `
      <div class="item-editor-box">
        <div class="item-editor-head">
          <strong>Tautan #${idx + 1}</strong>
          ${itemActions('socials', idx, list.length, s.visible, 'data-s-vis', 'data-s-del')}
        </div>
        <div class="admin-grid-2">
          <div class="field-group">
            <label>Nama Platform</label>
            <input type="text" class="glass-input" value="${esc(s.platform)}" data-s-plat="${idx}" />
          </div>
          <div class="field-group">
            <label>Username / Teks Tampilan</label>
            <input type="text" class="glass-input" value="${esc(s.handle)}" data-s-hand="${idx}" />
          </div>
        </div>
        <div class="field-group">
          <label>URL Tujuan</label>
          <input type="url" class="glass-input" value="${esc(s.url)}" data-s-url="${idx}" />
        </div>
      </div>
    `).join('');
  }

  // Kompres foto di browser supaya data tetap kecil (JPG; PNG hanya bila kecil).
  function compressImageFile(file, maxWidth = 640) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext('2d');
          if (file.type !== 'image/png') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let out = file.type === 'image/png' ? canvas.toDataURL('image/png') : '';
          if (!out || out.length > 260000) {
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            out = canvas.toDataURL('image/jpeg', 0.76);
          }
          resolve(out);
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function moveItem(arr, idx, dir) {
    const to = idx + dir;
    if (!Array.isArray(arr) || to < 0 || to >= arr.length || idx < 0 || idx >= arr.length) return false;
    const [it] = arr.splice(idx, 1);
    arr.splice(to, 0, it);
    return true;
  }

  // Delegasi event input & tombol di panel admin
  function bindAdminEvents() {
    const body = document.getElementById('adminBodyContainer');
    if (!body) return;

    body.addEventListener('input', (e) => {
      const t = e.target;
      const d = t.dataset;
      if (d.mVal !== undefined) draft.metrics[+d.mVal].value = t.value;
      if (d.mLbl !== undefined) draft.metrics[+d.mLbl].label = t.value;
      if (d.mNote !== undefined) draft.metrics[+d.mNote].note = t.value;

      if (d.misTxt !== undefined) draft.missions[+d.misTxt].text = t.value;

      if (d.pTitle !== undefined) draft.programs[+d.pTitle].title = t.value;
      if (d.pStatus !== undefined) draft.programs[+d.pStatus].status = t.value;
      if (d.pMref !== undefined) draft.programs[+d.pMref].missionRef = t.value;
      if (d.pSdesc !== undefined) draft.programs[+d.pSdesc].shortDesc = t.value;
      if (d.pFdesc !== undefined) draft.programs[+d.pFdesc].fullDetail = t.value;

      if (d.pExTitle !== undefined) {
        const [pi, ei] = d.pExTitle.split(':').map(Number);
        draft.programs[pi].examples[ei].title = t.value;
      }
      if (d.pExUrl !== undefined) {
        const [pi, ei] = d.pExUrl.split(':').map(Number);
        draft.programs[pi].examples[ei].url = t.value;
      }
      if (d.pExCap !== undefined) {
        const [pi, ei] = d.pExCap.split(':').map(Number);
        draft.programs[pi].examples[ei].caption = t.value;
      }

      if (d.prTitle !== undefined) draft.products[+d.prTitle].title = t.value;
      if (d.prPrice !== undefined) draft.products[+d.prPrice].price = t.value;
      if (d.prUrl !== undefined) draft.products[+d.prUrl].url = t.value;
      if (d.prBadge !== undefined) draft.products[+d.prBadge].badge = t.value;
      if (d.prDesc !== undefined) draft.products[+d.prDesc].description = t.value;
      if (d.prImg !== undefined) draft.products[+d.prImg].image = t.value;

      if (d.fName !== undefined) draft.founders[+d.fName].name = t.value;
      if (d.fRole !== undefined) draft.founders[+d.fRole].role = t.value;
      if (d.fFocus !== undefined) draft.founders[+d.fFocus].focus = t.value;

      if (d.mf !== undefined) {
        const [ref, field] = d.mf.split('|');
        const obj = resolveMf(ref);
        if (obj) obj[field] = t.value;
      }

      if (d.sPlat !== undefined) draft.socials[+d.sPlat].platform = t.value;
      if (d.sHand !== undefined) draft.socials[+d.sHand].handle = t.value;
      if (d.sUrl !== undefined) draft.socials[+d.sUrl].url = t.value;
    });

    body.addEventListener('change', async (e) => {
      const t = e.target;
      const d = t.dataset;
      if (d.secVis !== undefined) draft.sections[d.secVis] = t.checked;
      if (d.mVis !== undefined) draft.metrics[+d.mVis].visible = t.checked;
      if (d.misVis !== undefined) draft.missions[+d.misVis].visible = t.checked;
      if (d.pVis !== undefined) draft.programs[+d.pVis].visible = t.checked;
      if (d.pStype !== undefined) draft.programs[+d.pStype].statusType = t.value;
      if (d.pExVis !== undefined) {
        const [pi, ei] = d.pExVis.split(':').map(Number);
        draft.programs[pi].examples[ei].visible = t.checked;
      }
      if (d.prVis !== undefined) draft.products[+d.prVis].visible = t.checked;
      if (d.fVis !== undefined) draft.founders[+d.fVis].visible = t.checked;
      if (d.sVis !== undefined) draft.socials[+d.sVis].visible = t.checked;
      if (d.hVis !== undefined) draft.highlights[+d.hVis].visible = t.checked;
      if (d.mfSel !== undefined) {
        const [ref, field] = d.mfSel.split('|');
        const obj = resolveMf(ref);
        if (obj) obj[field] = t.value;
      }

      try {
        if (d.mfFile !== undefined && t.files && t.files[0]) {
          const obj = resolveMf(d.mfFile);
          if (obj) {
            obj.image = await compressImageFile(t.files[0], 640);
            obj.display = 'card';
            rerenderMf(d.mfFile);
            showToast('Gambar sampul dimuat. Cara tampil diubah ke "Kartu".');
          }
        }
        if (d.prFile !== undefined && t.files && t.files[0]) {
          const idx = +d.prFile;
          draft.products[idx].image = await compressImageFile(t.files[0], 720);
          renderAdmProducts();
          showToast('Foto produk berhasil dimuat.');
        }
        if (d.fFile !== undefined && t.files && t.files[0]) {
          const idx = +d.fFile;
          draft.founders[idx].photo = await compressImageFile(t.files[0], 480);
          renderAdmFounders();
          showToast('Foto penggerak berhasil diperbarui.');
        }
      } catch (err) {
        showToast('Foto tidak bisa dibaca. Coba file JPG atau PNG lain.');
      }
    });

    body.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const d = btn.dataset;

      // Naik / turun urutan
      if (d.move !== undefined) {
        const parts = d.move.split(':');
        if (parts[0] === 'ex') {
          const pi = +parts[1];
          if (moveItem(draft.programs[pi].examples, +parts[2], +parts[3])) renderAdmPrograms();
        } else {
          const renderers = {
            metrics: renderAdmMetrics, missions: renderAdmMissions, programs: renderAdmPrograms,
            products: renderAdmProducts, founders: renderAdmFounders, socials: renderAdmSocials,
            highlights: renderAdmHighlights
          };
          if (renderers[parts[0]] && moveItem(draft[parts[0]], +parts[1], +parts[2])) renderers[parts[0]]();
        }
        return;
      }

      if (d.mfPrev !== undefined) {
        const obj = resolveMf(d.mfPrev);
        if (obj) previewFill(obj, { title: 'title', text: 'caption', image: 'image' }, () => rerenderMf(d.mfPrev));
        return;
      }
      if (d.mfClear !== undefined) {
        const obj = resolveMf(d.mfClear);
        if (obj) { obj.image = ''; rerenderMf(d.mfClear); }
        return;
      }
      if (d.prPrev !== undefined) {
        const obj = draft.products[+d.prPrev];
        if (obj) previewFill(obj, { title: 'title', text: 'description', image: 'image' }, renderAdmProducts);
        return;
      }
      if (d.hDel !== undefined) {
        draft.highlights.splice(+d.hDel, 1);
        renderAdmHighlights();
        return;
      }

      if (d.mDel !== undefined) {
        draft.metrics.splice(+d.mDel, 1);
        renderAdmMetrics();
      } else if (d.misDel !== undefined) {
        draft.missions.splice(+d.misDel, 1);
        renderAdmMissions();
      } else if (d.pDel !== undefined) {
        draft.programs.splice(+d.pDel, 1);
        renderAdmPrograms();
      } else if (d.pExAdd !== undefined) {
        const pi = +d.pExAdd;
        draft.programs[pi].examples = draft.programs[pi].examples || [];
        draft.programs[pi].examples.push({
          id: 'ex-' + Date.now(),
          title: 'Contoh Postingan Baru',
          caption: '',
          url: '',
          image: '',
          display: 'auto',
          visible: true
        });
        renderAdmPrograms();
      } else if (d.pExDel !== undefined) {
        const [pi, ei] = d.pExDel.split(':').map(Number);
        draft.programs[pi].examples.splice(ei, 1);
        renderAdmPrograms();
      } else if (d.prDel !== undefined) {
        draft.products.splice(+d.prDel, 1);
        renderAdmProducts();
      } else if (d.fDel !== undefined) {
        draft.founders.splice(+d.fDel, 1);
        renderAdmFounders();
      } else if (d.sDel !== undefined) {
        draft.socials.splice(+d.sDel, 1);
        renderAdmSocials();
      }
    });

    // Tombol tambah
    document.getElementById('addHighlightBtn').addEventListener('click', () => {
      draft.highlights.push({ id: 'hl-' + Date.now(), title: '', caption: '', url: '', image: '', display: 'auto', visible: true });
      renderAdmHighlights();
    });

    [['admDiscordFile', 'admDiscordImage'], ['admLynkFile', 'admLynkImage']].forEach(([fileId, textId]) => {
      document.getElementById(fileId).addEventListener('change', async (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        try {
          const data = await compressImageFile(f, 320);
          if (textId === 'admDiscordImage') draft.discordImage = data; else draft.lynkImage = data;
          document.getElementById(textId).value = '';
          showToast('Gambar dimuat. Klik Simpan & Publikasikan.');
        } catch (err) { showToast('Gambar tidak bisa dibaca.'); }
      });
    });

    document.getElementById('addMetricBtn').addEventListener('click', () => {
      draft.metrics.push({ id: 'm-' + Date.now(), value: '100', label: 'Metrik Baru', note: 'Keterangan', visible: true });
      renderAdmMetrics();
    });

    document.getElementById('addMissionBtn').addEventListener('click', () => {
      draft.missions.push({ id: 'mis-' + Date.now(), text: 'Misi pergerakan baru...', visible: true });
      renderAdmMissions();
    });

    document.getElementById('addProgramBtn').addEventListener('click', () => {
      draft.programs.push({
        id: 'prog-' + Date.now(),
        title: 'Program Baru',
        status: 'BERJALAN',
        statusType: 'active',
        missionRef: 'Turunan Misi',
        shortDesc: 'Deskripsi singkat program...',
        fullDetail: 'Penjelasan lengkap program...',
        visible: true,
        examples: []
      });
      renderAdmPrograms();
    });

    document.getElementById('addProductBtn').addEventListener('click', () => {
      draft.products.push({
        id: 'prod-' + Date.now(),
        title: 'Produk Baru Lynk.id',
        badge: 'PRODUK',
        price: 'Rp0',
        description: 'Deskripsi singkat produk.',
        image: '',
        url: draft.lynkUrl || 'https://lynk.id/mentawaiproject.id',
        visible: true
      });
      renderAdmProducts();
    });

    document.getElementById('addFounderBtn').addEventListener('click', () => {
      draft.founders.push({
        id: 'f-' + Date.now(),
        name: 'Nama Penggerak Baru',
        role: 'Tim Penggerak',
        focus: 'Divisi / Fokus',
        photo: './icon-512.png',
        visible: true
      });
      renderAdmFounders();
    });

    document.getElementById('addSocialBtn').addEventListener('click', () => {
      draft.socials.push({
        id: 'soc-' + Date.now(),
        platform: 'Media Sosial',
        handle: '@username',
        url: 'https://',
        visible: true
      });
      renderAdmSocials();
    });
  }

  function readStaticAdminFields() {
    const val = (id) => document.getElementById(id).value.trim();
    draft.heroBadge = val('admHeroBadge');
    draft.heroHashtag = val('admHeroHashtag');
    draft.heroTitle = val('admHeroTitle');
    draft.heroSubtitle = val('admHeroSubtitle');
    draft.aboutLead = val('admAboutLead');
    draft.aboutBody = val('admAboutBody');
    draft.aboutNote = val('admAboutNote');
    draft.vision = val('admVision');
    draft.discordUrl = val('admDiscordUrl');
    draft.lynkUrl = val('admLynkUrl');
    draft.teamIntro = val('admTeamIntro');
    draft.hubTitle = val('admHubTitle');
    draft.hubDesc = val('admHubDesc');
    draft.collabText = val('admCollab');
    draft.footerTagline = val('admFooter');
    draft.contentTitle = val('admContentTitle');
    draft.contentDesc = val('admContentDesc');
    draft.discordName = val('admDiscordName');
    draft.discordDesc = val('admDiscordDesc');
    draft.lynkName = val('admLynkName');
    draft.lynkDesc = val('admLynkDesc');
    const dImg = val('admDiscordImage');
    const lImg = val('admLynkImage');
    if (dImg || !String(draft.discordImage || '').startsWith('data:')) draft.discordImage = dImg;
    if (lImg || !String(draft.lynkImage || '').startsWith('data:')) draft.lynkImage = lImg;
  }

  function clearAdminSession() {
    adminKey = '';
    adminLocal = false;
    try {
      sessionStorage.removeItem(ADMIN_KEY_STORE);
      sessionStorage.removeItem(ADMIN_LOCAL_STORE);
    } catch (e) { /* abaikan */ }
  }

  function forceLogout(message) {
    clearAdminSession();
    updateAdminIndicator();
    document.getElementById('adminPanelBackdrop').hidden = true;
    showToast(message);
  }

  // Panel status penyimpanan (di tab Tautan & Backup)
  function renderStorageCard() {
    const box = document.getElementById('storageStatus');
    if (!box) return;
    const src = draft || state;
    const kb = Math.round(new Blob([JSON.stringify(src)]).size / 1024);
    let msg;
    if (adminLocal) {
      msg = '⚠️ Server belum aktif (folder api/ belum terbaca Vercel). Perubahan hanya tersimpan di browser ini. Ikuti panduan LANGKAH 3, lalu Redeploy.';
    } else if (syncMode === 'cloud') {
      msg = '✅ Online: perubahan langsung terlihat oleh semua pengunjung.';
    } else {
      msg = '⚠️ Database belum terhubung. Perubahan hanya tersimpan di browser ini. Hubungkan Upstash di Vercel (panduan LANGKAH 5), atau pakai tombol "Unduh content.json" di bawah lalu upload ke GitHub.';
    }
    box.innerHTML = '<p class="form-hint">' + esc(msg) + '</p><p class="form-hint">Ukuran data: ' + kb + ' KB dari ±880 KB. Gambar yang diunggah memakai ruang ini; gambar lewat link (URL) tidak.</p>';
  }

  // Simpan & publikasikan perubahan admin
  async function saveAllAdminChanges() {
    readStaticAdminFields();
    draft._updated = Date.now();

    const bytes = new Blob([JSON.stringify(draft)]).size;
    if (bytes > MAX_PAYLOAD_BYTES) {
      showToast('Data terlalu besar (' + Math.round(bytes / 1024) + ' KB, batas 880 KB). Pakai link gambar (URL) atau hapus gambar yang diunggah.');
      return;
    }

    state = mergeConfig(draft);
    writeLocal(state);
    renderPublicSite();
    renderStorageCard();

    if (adminLocal) {
      showToast('Tersimpan di browser ini. Server belum aktif, lihat panduan LANGKAH 3.');
      return;
    }

    const saveBtn = document.getElementById('saveAllAdminBtn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Menyimpan...';

    try {
      const r = await apiCall('save', { body: { config: state }, key: adminKey });
      if (r.status === 401) {
        forceLogout('Sesi admin tidak valid. Klik logo 3x untuk masuk lagi (perubahan tetap tersimpan di browser ini).');
        return;
      }
      if (r.json && r.json.ok) {
        if (r.json.mode) syncMode = r.json.mode;
        updateAdminIndicator();
        showToast(r.json.message || 'Perubahan berhasil disimpan!');
      } else {
        showToast((r.json && r.json.message) || 'Tersimpan di browser ini (server tidak terjangkau).');
      }
    } catch (err) {
      showToast('Tersimpan di browser ini (server tidak terjangkau).');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Simpan & Publikasikan';
    }
  }

  // Penanda menu aktif saat menggulir
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const ids = ['beranda', 'tentang', 'program', 'konten', 'produk', 'tim', 'komunitas'];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        const mobileId = id === 'tentang' ? 'beranda' : (id === 'konten' ? 'program' : id);
        document.querySelectorAll('.m-nav-item').forEach((a) => a.classList.toggle('active', a.dataset.nav === mobileId));
        document.querySelectorAll('.nav-link').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(savedTheme);
    loadInitialConfig();
    setupTripleClickAdmin();
    bindAdminEvents();
    setupScrollSpy();
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Tombol Esc menutup dialog
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      ['programModalBackdrop', 'adminLoginBackdrop'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.hidden = true;
      });
    });

    // Theme toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      const curr = document.documentElement.getAttribute('data-theme');
      applyTheme(curr === 'dark' ? 'light' : 'dark');
    });

    // Program detail modal delegation
    document.getElementById('programsGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-open-program]');
      if (btn) openProgramModal(btn.dataset.openProgram);
    });
    document.getElementById('closeProgramModalBtn').addEventListener('click', () => {
      document.getElementById('progModalBody').innerHTML = '';
      document.getElementById('programModalBackdrop').hidden = true;
    });
    document.getElementById('programModalBackdrop').addEventListener('click', (e) => {
      if (e.target.id === 'programModalBackdrop') {
        document.getElementById('progModalBody').innerHTML = '';
        e.target.hidden = true;
      }
    });

    // Admin login & panel controls
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
    document.getElementById('closeAdminLoginBtn').addEventListener('click', () => {
      document.getElementById('adminLoginBackdrop').hidden = true;
    });
    document.getElementById('closeAdminPanelBtn').addEventListener('click', () => {
      document.getElementById('adminPanelBackdrop').hidden = true;
    });
    document.getElementById('logoutAdminBtn').addEventListener('click', () => {
      clearAdminSession();
      updateAdminIndicator();
      document.getElementById('adminPanelBackdrop').hidden = true;
      showToast('Keluar dari mode admin.');
    });
    document.getElementById('saveAllAdminBtn').addEventListener('click', saveAllAdminChanges);

    // Admin Sub-Tabs switching
    document.querySelectorAll('.admin-tab').forEach((tabBtn) => {
      tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.admin-tab-pane').forEach((p) => { p.hidden = true; p.classList.remove('active'); });
        tabBtn.classList.add('active');
        const target = document.getElementById(tabBtn.dataset.tab);
        if (target) {
          target.hidden = false;
          target.classList.add('active');
        }
        if (tabBtn.dataset.tab === 'tab-tautan') renderStorageCard();
      });
    });

    // JSON Export / Import / Reset
    document.getElementById('exportConfigBtn').addEventListener('click', () => {
      readStaticAdminFields();
      draft._updated = Date.now();
      const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'content.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });

    document.getElementById('importConfigInput').addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result);
          draft = mergeConfig(imported);
          populateAdminForms();
          showToast('File JSON dimuat. Klik Simpan & Publikasikan untuk menerapkan.');
        } catch (err) {
          showToast('Format file JSON tidak valid.');
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('resetDefaultBtn').addEventListener('click', () => {
      draft = mergeConfig(null);
      populateAdminForms();
      showToast('Data dikembalikan ke pengaturan awal. Klik Simpan untuk menerapkan.');
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  });
})();
