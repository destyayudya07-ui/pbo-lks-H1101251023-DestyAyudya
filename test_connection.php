<?php
require_once __DIR__ . '/vendor/autoload.php';

use App\Config\Env;
use App\Database\Connection;

Env::load(__DIR__ . '/.env');

try {
    $db = Connection::getInstance();
    echo "Koneksi database berhasil!\n";
    
    $stmt = $db->query("SELECT VERSION()");
    $version = $stmt->fetchColumn();
    echo "Versi MySQL: " . $version . "\n";
} catch (\Exception $e) {
    echo "Koneksi gagal: " . $e->getMessage() . "\n";
}