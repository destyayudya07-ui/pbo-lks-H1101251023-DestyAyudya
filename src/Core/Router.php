<?php

namespace App\Core;

class Router
{
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): void
    {
        $this->add('PUT', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->add('DELETE', $path, $handler);
    }

    private function add(string $method, string $path, callable|array $handler): void
    {
        // Normalisasi path
        $path = '/' . trim($path, '/');
        $this->routes[$method][$path] = $handler;
    }

    public function dispatch(Request $request, Response $response): void
    {
        $method = $request->getMethod();
        // Sesuaikan basis path jika project berada di subfolder (misal /rest-api-perpustakaan-lks-pbo/public)
        $uri = '/' . trim(str_replace('/rest-api-perpustakaan-lks-pbo/public', '', $request->getUri()), '/');
        
        if ($uri === '//') {
            $uri = '/';
        }

        if (isset($this->routes[$method][$uri])) {
            $handler = $this->routes[$method][$uri];
            
            if (is_callable($handler)) {
                call_user_func($handler);
                return;
            }

            if (is_array($handler)) {
                [$controller, $action] = $handler;
                if (is_string($controller)) {
                    $controller = new $controller();
                }
                call_user_func([$controller, $action]);
                return;
            }
        }

        $response->json([
            'success' => false,
            'message' => 'Endpoint tidak ditemukan: ' . $uri
        ], 404);
    }
}