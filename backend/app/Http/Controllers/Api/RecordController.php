<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Record;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'records' => Record::latest()->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $record = Record::create($this->validatedData($request));

        return response()->json([
            'message' => 'Record created successfully.',
            'record' => $record,
        ], 201);
    }

    public function show(Record $record): JsonResponse
    {
        return response()->json([
            'record' => $record,
        ]);
    }

    public function update(Request $request, Record $record): JsonResponse
    {
        $record->update($this->validatedData($request));

        return response()->json([
            'message' => 'Record updated successfully.',
            'record' => $record->fresh(),
        ]);
    }

    public function destroy(Record $record): JsonResponse
    {
        $record->delete();

        return response()->json([
            'message' => 'Record deleted successfully.',
        ]);
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:active,inactive'],
        ]);
    }
}