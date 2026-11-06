<?php

namespace App\Core;

class Request
{
    public function getMethod(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public function getUri(): string
    {
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        // Habiskan query string jika ada
        $path = parse_url($uri, PHP_URL_PATH);
        return $path;
    }

    public function getBody(): array
    {
        $body = [];
        if ($this->getMethod() === 'GET') {
            foreach ($_GET as $key => $value) {
                $body[$key] = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS);
            }
        }

        if ($this->getMethod() === 'POST' || $this->getMethod() === 'PUT') {
            $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
            if (strpos($contentType, 'application/json') !== false) {
                $content = trim(file_get_contents('php://input'));
                $decoded = json_decode($content, true);
                if (is_array($decoded)) {
                    $body = $decoded;
                }
            } else {
                foreach ($_POST as $key => $value) {
                    $body[$key] = filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS);
                }
            }
        }

        return $body;
    }
}