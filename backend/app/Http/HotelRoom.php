<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelRoom extends Model
{
    use HasFactory;

    // The Eloquent model for the hotel_rooms table
    protected $table = 'hotel_rooms';

    public const ROOM_TYPES = [
        'Standard Single',
        'Deluxe Double',
        'Executive Suite',
        'Penthouse',
    ];

    protected $fillable = [
        'room_number',
        'room_type',
        'nightly_rate',
    ];

    protected function casts(): array
    {
        return [
            'nightly_rate' => 'decimal:2',
        ];
    }
}