<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'system' => 'Hotel Property Management System API',
        'status' => 'Active',
        'version' => '1.0.0'
    ]);
});