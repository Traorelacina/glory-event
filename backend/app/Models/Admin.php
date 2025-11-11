<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    protected $hidden = [
        'password'
    ];

    const ROLE_ADMIN = 'admin';
    const ROLE_EDITOR = 'editor';

    public static $roles = [
        self::ROLE_ADMIN => 'Administrateur',
        self::ROLE_EDITOR => 'Éditeur'
    ];
}