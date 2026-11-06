# REST API Perpustakaan — LKS PBO

Nama: Desty Ayudya  
NIM: H1101251023  
Kelas: B

## Kebutuhan
- PHP 8+
- Composer 2+
- MySQL/MariaDB

## 🚀 Daftar Fitur
1. **Dashboard Interaktif:** 
   * Menampilkan kartu statistik total buku (warna biru) dan total kategori (warna oranye).
   * Tabel daftar 5 buku terbaru yang diimpor langsung dari API backend.
2. **Manajemen Buku (CRUD):** 
   * Menampilkan tabel data buku lengkap dengan kolom: ID, Judul, Penulis, Tahun, Stok, dan Aksi.
   * Modal form interaktif untuk menambah dan mengedit data buku.
3. **Manajemen Kategori (CRUD):** 
   * Menampilkan tabel data kategori buku.
   * Fitur Tambah, Edit, dan Hapus kategori.
4. **Sistem Notifikasi (Toast):** 
   * Memunculkan notifikasi *toast* otomatis di pojok kanan atas setiap kali operasi CRUD berhasil dilakukan.

---

## 🛠️ Cara Menjalankan Proyek (Dua Terminal)

Pastikan **Laragon / MySQL** sudah aktif, lalu jalankan dua terminal terpisah:

### **Terminal 1: Menjalankan Backend PHP**
Masuk ke folder utama proyek lalu jalankan server PHP pada port 8000:
```bash
cd rest-api-perpustakaan-lks-pbo
php -S localhost:8000 -t public

### **2. Buat File `.gitignore` di Root Repositori**
Buat file bernama `.gitignore` di folder utama proyek (`rest-api-perpustakaan-lks-pbo/.gitignore`) untuk mengabaikan file sensitif dan folder *vendor* composer:

```text
# Dependencies / Vendor
/rest-api-perpustakaan/vendor/
/frontend-perpustakaan/node_modules/

# Environment & Config
.env
.env.local
config.local.php

# System Files
.DS_Store
Thumbs.db
*.log