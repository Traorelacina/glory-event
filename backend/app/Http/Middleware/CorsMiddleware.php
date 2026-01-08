<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        // Définir les origines autorisées
        $allowedOrigins = [
            'https://gloryevent.netlify.app',
            'https://*.netlify.app',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5175',
        ];
        
        $origin = $request->header('Origin');
        
        // Vérifier si l'origine est autorisée
        $isAllowed = false;
        foreach ($allowedOrigins as $allowedOrigin) {
            if (strpos($allowedOrigin, '*') !== false) {
                // Gérer les wildcards
                $pattern = '/^' . str_replace('*', '.*', str_replace('.', '\.', $allowedOrigin)) . '$/';
                if (preg_match($pattern, $origin)) {
                    $isAllowed = true;
                    break;
                }
            } elseif ($origin === $allowedOrigin) {
                $isAllowed = true;
                break;
            }
        }
        
        if ($origin && $isAllowed) {
            $response->header('Access-Control-Allow-Origin', $origin);
        }
        
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token');
        $response->header('Access-Control-Allow-Credentials', 'true');
        
        // Gérer les requêtes OPTIONS (preflight)
        if ($request->isMethod('OPTIONS')) {
            $response->setStatusCode(200);
        }
        
        return $response;
    }
}