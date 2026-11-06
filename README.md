# REST API Perpustakaan — LKS PBO

Nama: Desty Ayudya  
NIM: H1101251023  
Kelas: B

## Kebutuhan
- PHP 8+
- Composer 2+
- MySQL/MariaDB

## Instalasi backend
1. Salin `.env.example` menjadi `.env`, lalu sesuaikan kredensial MySQL.
2. Jalankan `composer install` atau `composer dump-autoload -o`.
3. Buat database dan tabel dengan menjalankan `mysql -u root -p < database/schema.sql`.
4. Jalankan backend dari folder proyek: `php -S localhost:8000 -t public`.
5. Buka `http://localhost:8000/api/books`.

## Frontend
Buka terminal kedua, masuk ke folder `frontend-perpustakaan`, lalu jalankan:
`php -S localhost:3000`
Buka `http://localhost:3000`.

## Catatan
Folder `vendor/` dibuat otomatis oleh Composer dan tidak disertakan dalam ZIP.
File `.env` juga tidak disertakan karena berisi kredensial pribadi. Buat dari `.env.example`.
