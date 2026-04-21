<?php

namespace App\Services;

use App\Models\User;
use Laravel\Sanctum\NewAccessToken;

class TokenService
{
    private const TOKEN_NAME = 'api';

    /**
     * Create a Laravel Sanctum personal access token (stored in `personal_access_tokens`).
     *
     * @return array{token: string, token_type: string}
     */
    public function generateTokenDetails(User $user): array
    {
        /** @var NewAccessToken $newAccessToken */
        $newAccessToken = $user->createToken(self::TOKEN_NAME);

        return [
            'token' => $newAccessToken->plainTextToken,
            'token_type' => 'Bearer',
        ];
    }
}
