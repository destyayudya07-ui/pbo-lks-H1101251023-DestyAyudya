<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

require __DIR__.'/../vendor/autoload.php';
use App\Config\Env;
use App\Database\Connection;
use App\Repositories\MySQLBookRepository;
use App\Services\BookService;
use App\Controllers\BookController;
use App\Core\Request;
use App\Core\Router;
use App\Core\Response;

try {
    Env::load(__DIR__.'/../.env');
    $controller = new BookController(new BookService(new MySQLBookRepository(Connection::get())));
    $router = new Router();
    $router->get('/api/books', fn()=>$controller->index());
    $router->get('/api/books/{id}', fn($id)=>$controller->show($id));
    $router->post('/api/books', fn()=>$controller->store((new Request())->body()));
    $router->put('/api/books/{id}', fn($id)=>$controller->update($id,(new Request())->body()));
    $router->delete('/api/books/{id}', fn($id)=>$controller->destroy($id));
    $router->dispatch(new Request());
} catch (Throwable $e) {
    Response::json(['success'=>false,'message'=>'Kesalahan server: '.$e->getMessage()],500);
}
