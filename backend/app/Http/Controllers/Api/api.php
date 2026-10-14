<?php

use App\Http\Controllers\Api\HotelRoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public or protected room routes
Route::apiResource('rooms', HotelRoomController::class);