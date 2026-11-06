<?php

namespace App\Repositories;

use App\Contracts\BookRepositoryInterface;
use App\Models\Book;
use PDO;

class MySQLBookRepository implements BookRepositoryInterface {
    private PDO $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    public function getAll(): array {
        $stmt = $this->db->query("SELECT * FROM books");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $books = [];
        foreach ($results as $row) {
            $books[] = new Book(
                $row['id'],
                $row['judul'],
                $row['penulis'],
                $row['tahun'],
                $row['stok']
            );
        }
        return $books;
    }

    public function findById(int $id): ?Book {
        $stmt = $this->db->prepare("SELECT * FROM books WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new Book(
            $row['id'],
            $row['judul'],
            $row['penulis'],
            $row['tahun'],
            $row['stok']
        );
    }

    public function create(array $data): Book {
        $stmt = $this->db->prepare("INSERT INTO books (judul, penulis, tahun, stok) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['judul'],
            $data['penulis'],
            $data['tahun'],
            $data['stok']
        ]);

        $id = $this->db->lastInsertId();
        return new Book($id, $data['judul'], $data['penulis'], $data['tahun'], $data['stok']);
    }

    public function update(int $id, array $data): ?Book {
        $stmt = $this->db->prepare("UPDATE books SET judul = ?, penulis = ?, tahun = ?, stok = ? WHERE id = ?");
        $success = $stmt->execute([
            $data['judul'],
            $data['penulis'],
            $data['tahun'],
            $data['stok'],
            $id
        ]);

        if (!$success) {
            return null;
        }

        return $this->findById($id);
    }

    public function delete(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM books WHERE id = ?");
        return $stmt->execute([$id]);
    }
}