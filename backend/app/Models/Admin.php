<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_active',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'last_login_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    const ROLE_ADMIN = 'admin';
    const ROLE_EDITOR = 'editor';

    public static $roles = [
        self::ROLE_ADMIN => 'Administrateur',
        self::ROLE_EDITOR => 'Éditeur'
    ];

    /**
     * Vérifier si l'admin a le rôle administrateur
     */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * Vérifier si l'admin a le rôle éditeur
     */
    public function isEditor(): bool
    {
        return $this->role === self::ROLE_EDITOR;
    }

    /**
     * Vérifier si l'admin est actif
     */
    public function isActive(): bool
    {
        return $this->is_active ?? true;
    }
}