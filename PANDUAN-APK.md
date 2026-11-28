# Panduan Membuat APK (Mentawai Project)

Situs ini sudah memenuhi syarat PWA (manifest, service worker, ikon 192/512/maskable, HTTPS dari Vercel). Ada dua jalur untuk membungkusnya menjadi APK.

## Jalur A — PWABuilder (paling mudah)
1. Pastikan situs sudah live di Vercel (mis. `https://NAMA-PROYEK.vercel.app` atau domain sendiri).
2. Buka **pwabuilder.com**, masukkan URL, klik **Start**.
3. Pilih **Package for stores → Android**.
4. Isi:
   - **Package ID:** `id.zerotoone.mentawaiproject` (boleh diganti, tapi harus unik dan tidak bisa diubah setelah terbit)
   - **App name:** `Mentawai Project` · **Short name:** `Mentawai`
   - Biarkan opsi **Signing key: Create new**, lalu **simpan file keystore + kata sandinya** di tempat aman. Kehilangan key = tidak bisa memperbarui aplikasi.
5. Unduh ZIP hasilnya (berisi `.apk` untuk uji coba, `.aab` untuk Play Store, dan `assetlinks.json`).

## Jalur B — Bubblewrap (CLI, di komputer sendiri)
```
npm i -g @bubblewrap/cli
bubblewrap init --manifest=https://DOMAIN-KAMU/manifest.json
bubblewrap build
```
Bubblewrap membutuhkan JDK dan Android SDK (akan ditawarkan unduhnya saat pertama dijalankan).

## assetlinks.json (agar tanpa bilah alamat browser)
1. Dari hasil PWABuilder/Bubblewrap, ambil sidik jari **SHA-256** key kamu.
2. Buat folder `.well-known/` di root repository, isi `assetlinks.json` (contoh di bawah), commit, deploy.
3. Cek di `https://DOMAIN-KAMU/.well-known/assetlinks.json`.

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "id.zerotoone.mentawaiproject",
    "sha256_cert_fingerprints": ["[ISI: SHA-256 dari key kamu]"]
  }
}]
```
Jika memakai Play App Signing, tambahkan juga sidik jari dari Play Console.

## Ukuran ikon
192×192 dan 512×512 (`any`), 512×512 `maskable` (logo di dalam zona aman 80%). Semua sudah disertakan.

## Catatan Play Store
- Butuh akun Google Play Developer (biaya pendaftaran sekali bayar).
- **Kebijakan privasi:** wajib berupa URL halaman publik. Situs ini tidak mengumpulkan data pengunjung (tanpa form, tanpa analitik), jadi cukup halaman singkat yang menyatakan hal itu.
- **Data safety:** jawab "tidak mengumpulkan / membagikan data pengguna" selama kamu tidak menambah analitik atau form.
- **Rating konten:** isi kuesioner IARC (konten edukasi/komunitas, tanpa konten dewasa).
- Aplikasi TWA tidak berisi kode sendiri; setiap perubahan di Vercel langsung tampil tanpa rilis ulang APK.
