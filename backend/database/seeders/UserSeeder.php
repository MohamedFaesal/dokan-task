<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'test@dokan.sa'],
            [
                'name' => 'Dokan Test',
                'password' => 'Dokan@123456',
                'email_verified_at' => now(),
            ]
        );

        User::factory()->count(4)->create();
    }
}
