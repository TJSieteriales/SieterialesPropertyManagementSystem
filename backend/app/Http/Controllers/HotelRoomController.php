<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HotelRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class HotelRoomController extends Controller
{
    // GET /api/rooms - all rooms, newest first
    public function index(): JsonResponse
    {
        return response()->json([
            'rooms' => HotelRoom::orderByDesc('id')->get(),
        ]);
    }

    // POST /api/rooms - validate and save a new room to the database
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'room_number' => ['required', 'string', 'max:20', 'unique:hotel_rooms,room_number'],
            'room_type' => ['required', Rule::in(HotelRoom::ROOM_TYPES)],
            'nightly_rate' => ['required', 'numeric', 'gt:0', 'max:9999999.99'],
        ]);

        $room = HotelRoom::create($data);

        return response()->json([
            'message' => 'Room added successfully.',
            'room' => $room->fresh(),
        ], 201);
    }

    // GET /api/rooms/{hotelRoom} - full details of one room
    public function show(HotelRoom $hotelRoom): JsonResponse
    {
        return response()->json([
            'room' => $hotelRoom,
        ]);
    }
}