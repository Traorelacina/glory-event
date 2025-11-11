<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Store a newly created contact message.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string|max:50',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
                'service' => 'nullable|string|max:100'
            ]);

            $contact = Contact::create($validated);

            // Ici vous pouvez ajouter l'envoi d'email de notification
            // $this->sendNotificationEmail($contact);

            return response()->json([
                'success' => true,
                'message' => 'Message envoyé avec succès',
                'data' => $contact
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi du message',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send notification email (à implémenter)
     */
    private function sendNotificationEmail(Contact $contact): void
    {
        // Implémentation de l'envoi d'email
        // Mail::to('contact@glory-event.com')->send(new ContactNotification($contact));
    }
}