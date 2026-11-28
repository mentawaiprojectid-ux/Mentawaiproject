# Pasang Mentawai Project — Langkah demi Langkah (tanpa coding)

Sandi admin sudah terpasang (dikirim terpisah lewat chat). Kamu hanya perlu mengupload file dan menyambungkan database gratis.

## LANGKAH 1 — Upload file ke GitHub
1. Ekstrak ZIP. Buka repository GitHub kamu → **Add file → Upload files**.
2. Pilih/seret SEMUA file di folder (gambar, index.html, styles.css, app.js, sw.js, manifest.json, vercel.json, package.json, content.json, dll). **Jangan** upload folder `api` di langkah ini.
3. Klik **Commit changes**.

## LANGKAH 2 — Hapus file lama yang salah tempat (jika ada)
Jika di repository ada file `auth.js`, `config.js`, atau `_lib.js` di luar folder: klik file → ikon titik tiga → **Delete file** → Commit.

## LANGKAH 3 — Buat folder `api` (satu file saja)
1. **Add file → Create new file**.
2. Di kolom nama, ketik persis: `api/admin.js` (saat mengetik tanda `/`, GitHub otomatis membuat folder `api`).
3. Buka file `api-admin.js.txt` dari ZIP, **salin semua isinya**, tempel ke kotak besar.
4. Klik **Commit changes → Commit**.

## LANGKAH 4 — Deploy di Vercel
1. vercel.com → **Add New → Project** → pilih repository → **Deploy**.
2. Biarkan semua pengaturan default: Framework **Other**, Root Directory **kosong**, Build Command **kosong**.
3. Tunggu sampai muncul **Congratulations**.

Tes: buka `https://ALAMAT-KAMU.vercel.app/api/admin?a=config` → harus muncul tulisan seperti `{"ok":true,...}`. Jika 404, ulangi Langkah 3 (pastikan nama file `api/admin.js`).

## LANGKAH 5 — Sambungkan database gratis (agar editan terlihat semua orang)
1. Di Vercel, buka proyek → tab **Storage**.
2. **Create Database** → pilih **Upstash** → **Redis** → paket **Free** → **Create**.
3. Saat ditanya, sambungkan ke proyek kamu (**Connect Project**). Variabel otomatis terisi, tidak perlu diketik.
4. Buka **Deployments** → titik tiga di deployment teratas → **Redeploy**.

## LANGKAH 6 — Buka panel admin
Buka website → klik logo kiri atas **3 kali cepat** → masukkan sandi. Lencana harus bertuliskan **Online · Semua Pengunjung**.

## Cara memakai Sorotan Konten
Tab **Sorotan Konten** → **+ Tambah Konten** → tempel link Instagram (post/Reels), YouTube, TikTok, atau undangan Discord. Kontennya tampil langsung. Link lain (mis. Lynk.id) tampil sebagai kartu; klik **Ambil judul & gambar dari link** untuk mengisi otomatis.

## Ganti sandi (opsional)
Vercel → **Settings → Environment Variables** → tambah `ADMIN_PASSWORD` = sandi baru → Redeploy.

## Tanpa database (cadangan)
Panel admin → tab **Tautan & Backup** → **Unduh content.json** → di GitHub buka `content.json` → pensil → ganti isinya → Commit.

## Rilis berikutnya
Jika mengganti file CSS/JS/gambar, naikkan angka `CACHE_NAME` di `sw.js`.
