<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProduitController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(): JsonResponse
    {
        try {
            $produits = Produit::where('in_stock', true)->get();
            
            return response()->json([
                'success' => true,
                'data' => $produits
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des produits'
            ], 500);
        }
    }

    /**
     * Display the specified product.
     */
    public function show($slug): JsonResponse
    {
        try {
            $produit = Produit::where('slug', $slug)->where('in_stock', true)->firstOrFail();
            
            return response()->json([
                'success' => true,
                'data' => $produit
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Produit non trouvé'
            ], 404);
        }
    }

    /**
     * Get featured products.
     */
    public function featured(): JsonResponse
    {
        try {
            $produits = Produit::where('featured', true)->where('in_stock', true)->get();
            
            return response()->json([
                'success' => true,
                'data' => $produits
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des produits en vedette'
            ], 500);
        }
    }

    /**
     * Get products by category.
     */
    public function byCategory($category): JsonResponse
    {
        try {
            $produits = Produit::where('category', $category)->where('in_stock', true)->get();
            
            return response()->json([
                'success' => true,
                'data' => $produits
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des produits par catégorie'
            ], 500);
        }
    }
}