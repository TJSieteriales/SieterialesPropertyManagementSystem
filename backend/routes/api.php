<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecordController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    try {
        DB::select('SELECT 1');

        return response()->json([
            'app' => 'ok',
            'database' => 'ok',
        ]);
    } catch (Throwable $exception) {
        return response()->json([
            'app' => 'ok',
            'database' => 'error',
        ], 503);
    }
});

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // USER and ADMIN can read records.
    Route::get('/records', [RecordController::class, 'index']);
    Route::get('/records/{record}', [RecordController::class, 'show']);

    // ADMIN is the super-admin role and has full CRUD control.
    Route::middleware('admin')->group(function () {
        Route::post('/records', [RecordController::class, 'store']);
        Route::match(['put', 'patch'], '/records/{record}', [RecordController::class, 'update']);
        Route::delete('/records/{record}', [RecordController::class, 'destroy']);
    });
});
