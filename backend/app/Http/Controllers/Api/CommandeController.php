<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class CommandeController extends Controller
{
    /**
     * Store a newly created order.
     */
    public function store(Request $request): JsonResponse
    {
        DB::beginTransaction();
        
        try {
            $validated = $request->validate([
                'client_name' => 'required|string|max:255',
                'client_email' => 'required|email',
                'client_phone' => 'required|string|max:50',
                'produits' => 'required|array|min:1',
                'produits.*.id' => 'required|exists:produits,id',
                'produits.*.quantity' => 'required|integer|min:1'
            ]);

            // Calculer le total
            $total = 0;
            foreach ($validated['produits'] as $item) {
                $produit = Produit::find($item['id']);
                $total += $produit->price * $item['quantity'];
            }

            // Créer la commande
            $commande = Commande::create([
                'client_name' => $validated['client_name'],
                'client_email' => $validated['client_email'],
                'client_phone' => $validated['client_phone'],
                'total' => $total,
                'status' => 'en_attente'
            ]);

            // Attacher les produits
            foreach ($validated['produits'] as $item) {
                $commande->produits()->attach($item['id'], [
                    'quantity' => $item['quantity']
                ]);
            }

            DB::commit();

            // Ici vous pouvez ajouter l'envoi d'email
            // $this->sendConfirmationEmail($commande);

            return response()->json([
                'success' => true,
                'message' => 'Commande créée avec succès',
                'data' => [
                    'commande' => $commande,
                    'produits' => $commande->produits
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified order.
     */
    public function show($id): JsonResponse
    {
        try {
            $commande = Commande::with('produits')->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $commande
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Commande non trouvée'
            ], 404);
        }
    }

    /**
     * Send confirmation email (à implémenter)
     */
    private function sendConfirmationEmail(Commande $commande): void
    {
        // Implémentation de l'envoi d'email
        // Mail::to($commande->client_email)->send(new CommandeConfirmation($commande));
    }
}