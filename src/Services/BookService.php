<?php
namespace App\Services;
use App\Contracts\BookRepositoryInterface;
use Exception;

class BookService {
    public function __construct(private BookRepositoryInterface $repo) {}
    public function list(): array { return array_map(fn($b)=>$b->toArray(), $this->repo->findAll()); }
    public function show(int $id): array {
        $b=$this->repo->findById($id); if (!$b) throw new Exception("Buku dengan ID $id tidak ditemukan",404);
        return $b->toArray();
    }
    private function validate(array $d): array {
        if (trim($d['judul'] ?? '')==='') throw new Exception('Judul wajib diisi',422);
        if (trim($d['penulis'] ?? '')==='') throw new Exception('Penulis wajib diisi',422);
        foreach (['tahun','stok'] as $k) if (!isset($d[$k]) || !is_numeric($d[$k])) throw new Exception(ucfirst($k).' wajib berupa angka',422);
        return ['judul'=>trim($d['judul']),'penulis'=>trim($d['penulis']),'tahun'=>(int)$d['tahun'],'stok'=>(int)$d['stok']];
    }
    public function create(array $d): array { return $this->repo->create($this->validate($d))->toArray(); }
    public function update(int $id,array $d): array {
        $b=$this->repo->update($id,$this->validate($d)); if (!$b) throw new Exception("Buku dengan ID $id tidak ditemukan",404);
        return $b->toArray();
    }
    public function delete(int $id): void { if (!$this->repo->delete($id)) throw new Exception("Buku dengan ID $id tidak ditemukan",404); }
}
