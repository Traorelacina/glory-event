<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\Api\CommandeController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Get current user (protected)
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Public routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/featured', [ServiceController::class, 'featured']);
Route::get('/services/category/{category}', [ServiceController::class, 'byCategory']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/featured', [ProduitController::class, 'featured']);
Route::get('/produits/category/{category}', [ProduitController::class, 'byCategory']);
Route::get('/produits/{slug}', [ProduitController::class, 'show']);

Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/featured', [PortfolioController::class, 'featured']);
Route::get('/portfolio/category/{category}', [PortfolioController::class, 'byCategory']);
Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/commandes', [CommandeController::class, 'store']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);

// Protected admin routes
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/recent-orders', [AdminController::class, 'recentOrders']);
    Route::get('/recent-contacts', [AdminController::class, 'recentContacts']);
    
    // Commandes management
    Route::get('/commandes', [AdminController::class, 'commandes']);
    Route::get('/commandes/{id}', [AdminController::class, 'showCommande']);
    Route::put('/commandes/{id}', [AdminController::class, 'updateCommande']);
    Route::delete('/commandes/{id}', [AdminController::class, 'destroyCommande']);
    
    // Product management
    Route::get('/produits', [AdminController::class, 'produits']);
    Route::post('/produits', [AdminController::class, 'storeProduit']);
    Route::put('/produits/{id}', [AdminController::class, 'updateProduit']);
    Route::delete('/produits/{id}', [AdminController::class, 'destroyProduit']);
});