<?php
namespace App\Controllers;
use App\Core\Response;
use App\Services\BookService;
use Throwable;
class BookController {
    public function __construct(private BookService $service) {}
    private function run(callable $fn,int $status=200):void {
        try { Response::json(['success'=>true,'data'=>$fn()],$status); }
        catch(Throwable $e){$code=(int)$e->getCode(); if($code<400||$code>599)$code=500; Response::json(['success'=>false,'message'=>$e->getMessage()],$code);}
    }
    public function index():void{$this->run(fn()=>$this->service->list());}
    public function show(int $id):void{$this->run(fn()=>$this->service->show($id));}
    public function store(array $d):void{$this->run(fn()=>$this->service->create($d),201);}
    public function update(int $id,array $d):void{$this->run(fn()=>$this->service->update($id,$d));}
    public function destroy(int $id):void{$this->run(function()use($id){$this->service->delete($id);return ['message'=>'Buku berhasil dihapus'];});}
}
