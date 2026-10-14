<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultUsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL');
        $adminPassword = env('ADMIN_PASSWORD');
        $userEmail = env('USER_EMAIL');
        $userPassword = env('USER_PASSWORD');

        if ($adminEmail && $adminPassword) {
            User::updateOrCreate(
                ['email' => $adminEmail],
                [
                    'name' => env('ADMIN_NAME', 'Administrator'),
                    'password' => $adminPassword,
                    'role' => 'admin',
                ]
            );
        } else {
            $this->command?->warn('Admin not seeded: set ADMIN_EMAIL and ADMIN_PASSWORD.');
        }

        if ($userEmail && $userPassword) {
            User::updateOrCreate(
                ['email' => $userEmail],
                [
                    'name' => env('USER_NAME', 'Normal User'),
                    'password' => $userPassword,
                    'role' => 'user',
                ]
            );
        } else {
            $this->command?->warn('User not seeded: set USER_EMAIL and USER_PASSWORD.');
        }
    }
}
