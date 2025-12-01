# AGENTS.md - Project Guidelines

## Build/Test/Lint Commands

### Frontend (front/ - React + Vite)
- **Dev**: `npm run dev` (Vite dev server on :5173)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint)
- **Type check**: `npm run typecheck`

### Frontend (frontend/ - Next.js)
- **Dev**: `npm run dev` (Next.js dev server on :3000)
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

### Backend (Laravel PHP)
- **Dev**: `composer run dev` (Artisan + Laravel Sail + Pail logs)
- **Setup**: `composer run setup` (First-time installation)
- **Test**: `composer run test` (PHPUnit)
- **Serve**: `php artisan serve` (on :8000)

## Architecture Overview

**Monorepo structure**: Three subprojects
- **backend/**: Laravel 12 API with Sanctum auth, MySQL database, RESTful routes
- **front/**: React 18 + TypeScript + Vite SPA for events/perfume platform
- **frontend/**: Next.js 16 alternative frontend (UnoCSS styling)

**Database**: MySQL via Laravel migrations  
**API Client**: Supabase integration in front/, axios in backend  
**State Management**: Zustand (front/)  
**Services**: Supabase auth + custom services (statisticsService)

## Code Style & Conventions

### TypeScript/React
- Use functional components with hooks
- Type all props explicitly (interface pattern: `ComponentProps`)
- Import order: React → lucide/icons → internal components/types
- PascalCase components, camelCase functions/variables
- Tailwind + custom CSS for styling (Playfair/Inter/Cormorant fonts)
- Use `data-animate` for scroll reveal effects

### Laravel/PHP
- PSR-4 autoloading (App\\, Database\\, Tests\\)
- Routes in `/routes` (RESTful conventions)
- Models in `/app/Models`, Controllers in `/app/Http/Controllers`
- Migrations in `/database/migrations`

### Format & Imports
- ESLint config present in all frontends
- PostCSS + Tailwind 4.0+ (frontend) / 3.4 (front/)
- Vite as bundler for both React and Laravel assets
- No semicolons convention in some files

### Naming & Patterns
- Event/perfume services: descriptive slugs (e.g., 'mariage', 'decoration')
- Colors: Brown gradient (#ad5945, #d38074, #ca715b)
- Animations: Custom CSS (fadeInUp, float, morphBlob, etc.)
- Error handling: Check imports and type compatibility
