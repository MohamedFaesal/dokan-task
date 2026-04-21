<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ListUsers extends Command
{
    protected $signature = 'users:list';

    protected $description = 'List all users in the database';

    public function handle(): int
    {
        $users = User::query()->orderBy('id')->get(['id', 'name', 'email', 'created_at', 'password']);

        if ($users->isEmpty()) {
            $this->warn('No users found.');

            return self::SUCCESS;
        }

        $this->table(
            ['ID', 'Name', 'Email', 'Created'],
            $users->map(fn (User $user) => [
                $user->id,
                $user->name,
                $user->email,
                $user->password,
                $user->created_at?->toDateTimeString(),
            ])->all()
        );

        return self::SUCCESS;
    }
}
