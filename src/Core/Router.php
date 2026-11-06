<?php
namespace App\Core;
class Router {
    private array $routes=[];
    public function get(string $p,callable $h):void{$this->add('GET',$p,$h);}
    public function post(string $p,callable $h):void{$this->add('POST',$p,$h);}
    public function put(string $p,callable $h):void{$this->add('PUT',$p,$h);}
    public function delete(string $p,callable $h):void{$this->add('DELETE',$p,$h);}
    private function add(string $m,string $p,callable $h):void{$this->routes[]=['method'=>$m,'pattern'=>$p,'handler'=>$h];}
    public function dispatch(Request $r):void {
        foreach($this->routes as $route){
            $regex='#^'.preg_replace('#\{id\}#','([0-9]+)',preg_quote($route['pattern'],'#')).'$#';
            if($r->method()===$route['method'] && preg_match($regex,$r->path(),$m)){
                array_shift($m); ($route['handler'])(...array_map('intval',$m)); return;
            }
        }
        Response::json(['success'=>false,'message'=>'Endpoint tidak ditemukan: '.$r->path()],404);
    }
}
