const API_BASE_URL = 'http://localhost:8000/api';
const CSRF_URL = 'http://localhost:8000/sanctum/csrf-cookie';

class ApiClient {
  private baseURL: string;
  private csrfURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.csrfURL = CSRF_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    const config: RequestInit = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          window.location.href = '/admin/login';
        }
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const text = await response.text();
        let message = `HTTP error! status: ${response.status}`;
        try {
          const data = JSON.parse(text);
          message = data.message || message;
        } catch {}
        throw new Error(message);
      }

      if (response.status === 204) return { success: true };
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // ============================
  // Auth methods
  // ============================
  async csrfCookie() {
    const res = await fetch(this.csrfURL, { 
      method: 'GET',
      credentials: 'include' 
    });
    if (!res.ok) throw new Error('Impossible d’obtenir le cookie CSRF');
  }

  async login(email: string, password: string) {
    await this.csrfCookie();

    const res = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password, device_name: 'web-admin' }),
    });

    if (!res.ok) {
      const text = await res.text();
      let errorMessage = `Erreur API (${res.status})`;
      
      try {
        const errorData = JSON.parse(text);
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Si la réponse n'est pas du JSON, utiliser le texte brut
        if (text.includes('<!DOCTYPE html>')) {
          errorMessage = 'Endpoint non trouvé (404). Vérifiez la configuration du serveur.';
        } else {
          errorMessage += `: ${text.substring(0, 100)}`;
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  }

  async logout() {
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  async getCurrentUser() {
    return this.request('/user');
  }

  // ============================
  // Admin methods
  // ============================
  async getDashboardStats() {
    const res = await this.request('/admin/dashboard');
    return res.data || res;
  }

  async getRecentOrders() {
    const res = await this.request('/admin/recent-orders');
    return res.data || res;
  }

  async getRecentContacts() {
    const res = await this.request('/admin/recent-contacts');
    return res.data || res;
  }

  // ============================
  // Commandes (Admin)
  // ============================
  async getCommandes() {
    const res = await this.request('/admin/commandes');
    return res.data || res;
  }

  async getCommande(id: number) {
    const res = await this.request(`/admin/commandes/${id}`);
    return res.data || res;
  }

  async updateCommandeStatus(id: number, status: string) {
    const res = await this.request(`/admin/commandes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return res.data || res;
  }

  async deleteCommande(id: number) {
    const res = await this.request(`/admin/commandes/${id}`, { method: 'DELETE' });
    return res;
  }

  // ============================
  // Produits (Admin + Public)
  // ============================
  async getProduits() {
    const res = await this.request('/produits');
    return res.data || res;
  }

  async getProduit(slug: string) {
    const res = await this.request(`/produits/${slug}`);
    return res.data || res;
  }

  async getFeaturedProduits() {
    const res = await this.request('/produits/featured');
    return res.data || res;
  }

  async getProduitsByCategory(category: string) {
    const res = await this.request(`/produits/category/${category}`);
    return res.data || res;
  }

  async createProduit(data: any) {
    const res = await this.request('/admin/produits', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data || res;
  }

  async updateProduit(id: number, data: any) {
    const res = await this.request(`/admin/produits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.data || res;
  }

  async deleteProduit(id: number) {
    const res = await this.request(`/admin/produits/${id}`, { method: 'DELETE' });
    return res;
  }

  // ============================
  // Services
  // ============================
  async getServices() {
    const res = await this.request('/services');
    return res.data || res;
  }

  async getService(slug: string) {
    const res = await this.request(`/services/${slug}`);
    return res.data || res;
  }

  async getFeaturedServices() {
    const res = await this.request('/services/featured');
    return res.data || res;
  }

  async getServicesByCategory(category: string) {
    const res = await this.request(`/services/category/${category}`);
    return res.data || res;
  }

  // ============================
  // Portfolio
  // ============================
  async getPortfolio() {
    const res = await this.request('/portfolio');
    return res.data || res;
  }

  async getPortfolioItem(id: number) {
    const res = await this.request(`/portfolio/${id}`);
    return res.data || res;
  }

  async getFeaturedPortfolio() {
    const res = await this.request('/portfolio/featured');
    return res.data || res;
  }

  async getPortfolioByCategory(category: string) {
    const res = await this.request(`/portfolio/category/${category}`);
    return res.data || res;
  }

  // ============================
  // Contact
  // ============================
  async submitContact(data: any) {
    const res = await this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data || res;
  }

  // ============================
  // Commandes (Client)
  // ============================
  async createCommande(data: any) {
    const res = await this.request('/commandes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.data || res;
  }

  async getCommandeClient(id: number) {
    const res = await this.request(`/commandes/${id}`);
    return res.data || res;
  }
}

export const apiClient = new ApiClient();