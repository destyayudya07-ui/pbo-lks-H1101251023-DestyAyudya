<?php
namespace App\Repositories;
use PDO;
use App\Models\Book;
use App\Contracts\BookRepositoryInterface;

class MySQLBookRepository implements BookRepositoryInterface {
    public function __construct(private PDO $pdo) {}
    private function model(array $r): Book {
        return new Book((int)$r['id'], $r['judul'], $r['penulis'], (int)$r['tahun'], (int)$r['stok']);
    }
    public function findAll(): array {
        return array_map(fn($r) => $this->model($r), $this->pdo->query('SELECT * FROM books ORDER BY id')->fetchAll());
    }
    public function findById(int $id): ?Book {
        $s=$this->pdo->prepare('SELECT * FROM books WHERE id=?'); $s->execute([$id]); $r=$s->fetch();
        return $r ? $this->model($r) : null;
    }
    public function create(array $d): Book {
        $s=$this->pdo->prepare('INSERT INTO books (judul,penulis,tahun,stok) VALUES (?,?,?,?)');
        $s->execute([$d['judul'],$d['penulis'],$d['tahun'],$d['stok']]);
        return $this->findById((int)$this->pdo->lastInsertId());
    }
    public function update(int $id, array $d): ?Book {
        if (!$this->findById($id)) return null;
        $s=$this->pdo->prepare('UPDATE books SET judul=?,penulis=?,tahun=?,stok=? WHERE id=?');
        $s->execute([$d['judul'],$d['penulis'],$d['tahun'],$d['stok'],$id]);
        return $this->findById($id);
    }
    public function delete(int $id): bool {
        $s=$this->pdo->prepare('DELETE FROM books WHERE id=?'); $s->execute([$id]); return $s->rowCount()>0;
    }
}
