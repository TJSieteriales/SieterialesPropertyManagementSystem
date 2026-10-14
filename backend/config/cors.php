<?php

$frontendUrl = env('FRONTEND_URL');
$frontendHost = env('FRONTEND_HOST');

$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

if ($frontendUrl) {
    $allowedOrigins[] = rtrim($frontendUrl, '/');
}

if ($frontendHost) {
    $allowedOrigins[] = str_starts_with($frontendHost, 'http')
        ? rtrim($frontendHost, '/')
        : 'https://'.rtrim($frontendHost, '/');
}

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_values(array_unique($allowedOrigins)),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];