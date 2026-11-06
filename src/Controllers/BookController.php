<?php

namespace App\Controllers;

use App\Services\BookService;
use App\Core\Response;
use App\Core\Request;
use Exception;

class BookController
{
    private BookService $bookService;
    private Response $response;
    private Request $request;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
        $this->response = new Response();
        $this->request = new Request();
    }

    public function index(): void
    {
        try {
            $books = $this->bookService->list();
            $this->response->json([
                'success' => true,
                'message' => 'Daftar buku',
                'data' => $books
            ], 200);
        } catch (Exception $e) {
            $this->response->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): void
    {
        try {
            $book = $this->bookService->getById((int)$id);
            if (!$book) {
                $this->response->json([
                    'success' => false,
                    'message' => "Buku dengan ID {$id} tidak ditemukan"
                ], 404);
                return;
            }
            $this->response->json([
                'success' => true,
                'data' => $book
            ], 200);
        } catch (Exception $e) {
            $this->response->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function store(): void
    {
        try {
            $data = $this->request->getBody();
            $newBook = $this->bookService->create($data);
            $this->response->json([
                'success' => true,
                'message' => 'Buku berhasil dibuat',
                'data' => $newBook
            ], 201);
        } catch (Exception $e) {
            $this->response->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function update($id): void
    {
        try {
            $data = $this->request->getBody();
            $updatedBook = $this->bookService->update((int)$id, $data);
            $this->response->json([
                'success' => true,
                'message' => 'Buku berhasil diubah',
                'data' => $updatedBook
            ], 200);
        } catch (Exception $e) {
            $this->response->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function destroy($id): void
    {
        try {
            $this->bookService->delete((int)$id);
            $this->response->json([
                'success' => true,
                'message' => 'Buku berhasil dihapus'
            ], 200);
        } catch (Exception $e) {
            $this->response->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 404);
        }
    }
}