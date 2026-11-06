<?php

namespace App\Services;

use App\Contracts\BookRepositoryInterface;
use Exception;

class BookService
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function list(): array
    {
        return $this->bookRepository->getAll();
    }

    public function create(array $data): array
    {
        // Validasi logika bisnis: Judul wajib diisi
        if (empty(trim($data['judul'] ?? ''))) {
            throw new Exception("Judul wajib diisi");
        }

        // Validasi tambahan opsional untuk field lain jika diperlukan
        if (empty(trim($data['penulis'] ?? ''))) {
            throw new Exception("Penulis wajib diisi");
        }

        // Panggil repository untuk menyimpan data
        $createdBook = $this->bookRepository->create($data);

        // Ubah ke array asosiatif jika hasil return berupa objek/array standar
        return [
            'id' => method_exists($createdBook, 'getId') ? $createdBook->getId() : ($createdBook['id'] ?? null),
            'judul' => method_exists($createdBook, 'getJudul') ? $createdBook->getJudul() : ($data['judul'] ?? ''),
            'penulis' => method_exists($createdBook, 'getPenulis') ? $createdBook->getPenulis() : ($data['penulis'] ?? ''),
            'tahun' => method_exists($createdBook, 'getTahun') ? $createdBook->getTahun() : ($data['tahun'] ?? 0),
            'stok' => method_exists($createdBook, 'getStok') ? $createdBook->getStok() : ($data['stok'] ?? 0),
        ];
    }
}