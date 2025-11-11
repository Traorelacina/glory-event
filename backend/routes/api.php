<?php

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\Api\CommandeController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Services Routes
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/featured', [ServiceController::class, 'featured']);
Route::get('/services/category/{category}', [ServiceController::class, 'byCategory']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);

// Products Routes
Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/featured', [ProduitController::class, 'featured']);
Route::get('/produits/category/{category}', [ProduitController::class, 'byCategory']);
Route::get('/produits/{slug}', [ProduitController::class, 'show']);

// Portfolio Routes
Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/featured', [PortfolioController::class, 'featured']);
Route::get('/portfolio/category/{category}', [PortfolioController::class, 'byCategory']);
Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);

// Contact Route
Route::post('/contact', [ContactController::class, 'store']);

// Order Route
Route::post('/commandes', [CommandeController::class, 'store']);
Route::get('/commandes/{id}', [CommandeController::class, 'show']);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/recent-orders', [AdminController::class, 'recentOrders']);
    Route::get('/recent-contacts', [AdminController::class, 'recentContacts']);
});