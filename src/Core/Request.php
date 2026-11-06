<?php
namespace App\Core;
class Request {
    public function method(): string { return $_SERVER['REQUEST_METHOD'] ?? 'GET'; }
    public function path(): string { return parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/'; }
    public function body(): array {
        $raw=file_get_contents('php://input'); $data=json_decode($raw,true);
        return is_array($data) ? $data : $_POST;
    }
}
