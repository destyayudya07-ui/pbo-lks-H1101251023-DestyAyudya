<?php

namespace App\Core;

use Closure;
use Exception;

class Container
{
    private array $bindings = [];
    private array $instances = [];

    public function bind(string $abstract, Closure|string $concrete): void
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function make(string $abstract): mixed
    {
        if (isset($this->instances[$abstract])) {
            return $this->instances[$abstract];
        }

        if (!isset($this->bindings[$abstract])) {
            // Jika belum di-bind, coba instansiasi langsung (Auto-wiring sederhana)
            return new $abstract();
        }

        $concrete = $this->bindings[$abstract];

        if ($concrete instanceof Closure) {
            $object = $concrete($this);
        } else {
            $object = new $concrete();
        }

        $this->instances[$abstract] = $object;
        return $object;
    }
}