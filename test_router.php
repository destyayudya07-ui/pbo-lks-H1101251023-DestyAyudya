<?php

ob_start(); // Mencegah warning header di CLI

require 'vendor/autoload.php';

use App\Core\Router;
use App\Core\Request;
use App\Core\Response;
use App\Core\Container;

// 1. Test Container
$container = new Container();
$container->bind('test', function() {
    return "Container bekerja!";
});
echo $container->make('test') . PHP_EOL;

// 2. Test Router & Response
$router = new Router();
$request = new Request();
$response = new Response();

$router->get('/api/hello', function() use ($response) {
    $response->json([
        "success" => true,
        "message" => "Router bekerja! Endpoint /api/hello terpanggil."
    ]);
});

// Simulasi URI untuk pengujian
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['REQUEST_URI'] = '/api/hello';

$router->dispatch($request, $response);