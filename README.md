# TaxLaboratory Universitas Gunadarma

Ini adalah kode sumber untuk website resmi Laboratorium Akuntansi Lanjut B (Lab Akuntansi Pajak) Universitas Gunadarma.

## Teknologi yang Dipakai
* React.js (via Vite): Framework utama buat bikin websitenya biar cepat dan ringan.
* Tailwind CSS: Buat ngatur desain, warna, dan tata letak tanpa harus nulis CSS manual yang panjang.
* React Router DOM: Buat ngatur perpindahan antar halaman tanpa harus loading ulang browser.

## Cara Install Manual dari Nol
Kalau kamu penasaran perintah apa saja yang diketik buat masukin React dan teman-temannya di project ini dari awal, ini dia urutannya:

1. Bikin project React baru pakai Vite:
   ```bash
   npm create vite@latest tax-laboratory -- --template react
   cd tax-laboratory
2. React DOM : npm install react-router-dom
3. Install CSS Tailwind : npm install -D tailwindcss postcss autoprefixer, npx tailwindcss init -p

## Cara Menjalankan Local
1. Pastikan sudah install Node.js di komputer.
2. Buka terminal di dalam folder project ini.
3. Ketik `npm install` lalu enter. Ini fungsinya buat mendownload semua package/library yang dibutuhin (masuknya nanti ke folder node_modules).
4. Kalau proses install sudah selesai, ketik `npm run dev`.
5. Nanti akan muncul link (biasanya localhost:5173). Buka link itu di browser buat lihat websitenya.

## Panduan Folder dan File
Biar nggak bingung pas mau edit-edit, ini penjelasan file-file penting yang ada di dalam project ini:

### 1. Halaman Utama (Folder src/pages/)
Di sini tempatnya semua kode halaman penuh. Kalau kamu mau ngedit isi halaman tertentu, cari filenya di sini:
* Home.jsx: Halaman depan atau beranda website.
* TentangKami.jsx, Team.jsx, Staff.jsx: Bagian dari menu Profil.
* TataTertib.jsx, Modul.jsx, SoftwarePajak.jsx: Bagian dari menu Layanan.
* Oprec.jsx, Lokasi.jsx, Faq.jsx: Bagian dari menu Informasi.
* Kontak.jsx: Halaman buat nampilin kontak dan email lab.

### 2. Komponen Potongan (Folder src/components/)
Folder ini isinya potongan-potongan kode yang sering dipakai berulang kali, atau sengaja dipisah biar file halaman di atas nggak kepanjangan.
* Navbar.jsx, MobileMenu.jsx, ScrollProgress.jsx: Ini kumpulan file buat ngurusin menu navigasi di bagian paling atas.
* Footer.jsx: Bagian informasi paling bawah website.
* ContactCard.jsx, ModulCard.jsx, MemberCard.jsx, dll: File untuk nampilin desain kotak-kotak (card) di tiap halaman.
* Icons.jsx, ContactIcons.jsx, dll: Kumpulan gambar ikon SVG murni.
* PageTransition.jsx: Buat ngasih efek animasi pas pindah halaman.

### 3. Data Teks (Folder src/data/)
Biar isi file di src/pages/ nggak kepanjangan sama tulisan, datanya dipisah ke sini. Bentuknya bisa .js, .jsx, atau .json. Kalau mau update konten teks, ganti aja di sini:
* modulData.json: Berisi daftar link dan nama modul praktikum.
* softwareData.json: Berisi data list software pajak (e-SPT, e-Faktur).
* teamData.json, staffData.js: Berisi data nama dan jabatan asisten/staff.
* oprecData.jsx: Berisi teks timeline atau alur pendaftaran oprec.
* rulesData.jsx, faqData.js: Berisi teks tata tertib dan tanya jawab.

### 4. Gambar dan Dokumen (Folder public/)
Semua aset fisik ditaruh di sini biar gampang dipanggil di dalam kode.
* public/img-template/: Tempat nyimpen desain statis kayak logo (LogoTaxLab.webp), background, dan gambar pendukung lainnya.
* public/img-team/: Tempat nyimpen foto-foto anggota asisten, IT support, dan foto angkatan per tahun.
* public/files/: Tempat nyimpen dokumen PDF kayak modul komputer, modul perpajakan, atau panduan download. File di sini bisa langsung di-download sama user.

### 5. File Inti Lainnya
* App.jsx & main.jsx: File pusat yang nyambungin semua rute halaman React supaya bisa jalan.
* index.css: Tempat naruh settingan dasar Tailwind CSS.
* package.json: Daftar catatan library apa aja yang dipakai di project ini.

## Kontak Pengembang
Website ini dikembangkan oleh Team IT Support TaxLaboratory.

* Email: taxlab.it@gmail.com
* Instagram: @taxlaboratory