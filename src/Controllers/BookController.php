<?php

namespace App\Controllers;

use App\Contracts\BookRepositoryInterface;

class BookController 
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository) 
    {
        $this->bookRepository = $bookRepository;
    }

    // Method untuk menampilkan semua buku (GET /books)
    public function index() 
    {
        header('Content-Type: application/json');
        try {
            $books = $this->bookRepository->getAll();
            echo json_encode([
                'status' => 'success',
                'data' => $books
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    // Method untuk mengambil detail buku berdasarkan ID (GET /books/{id})
    public function show($id) 
    {
        header('Content-Type: application/json');
        try {
            $book = $this->bookRepository->findById((int)$id);
            if (!$book) {
                http_response_code(404);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Buku tidak ditemukan'
                ]);
                return;
            }

            echo json_encode([
                'status' => 'success',
                'data' => $book
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}