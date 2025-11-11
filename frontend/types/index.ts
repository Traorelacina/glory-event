export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Commande {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: 'en_attente' | 'confirmee' | 'annulee';
  total: number;
  created_at: string;
  produits: ProduitCommande[];
}

export interface ProduitCommande {
  id: number;
  name: string;
  price: number;
  pivot: {
    quantity: number;
  };
}

export interface Produit {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

export interface DashboardStats {
  total_services: number;
  total_produits: number;
  total_commandes: number;
  commandes_en_attente: number;
  total_contacts: number;
  total_portfolio: number;
}