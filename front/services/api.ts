const API_BASE_URL = 'http://127.0.0.1:8000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    role_label: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Interface pour un portfolio
export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  date: string;
  created_at: string;
  updated_at: string;
}

// Interface pour les données du formulaire de portfolio
export interface PortfolioFormData {
  title: string;
  description: string;
  category: string;
  featured: boolean;
  date: string;
  image?: File;
}

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message || 'Une erreur est survenue',
      errors: data.errors,
    } as ApiError;
  }

  return data;
}

// Fonction pour créer un FormData à partir d'un objet
function createFormData(data: any): FormData {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      if (key === 'image' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (key === 'featured') {
        formData.append(key, data[key] ? '1' : '0');
      } else {
        formData.append(key, data[key].toString());
      }
    }
  });
  
  return formData;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return handleResponse(response);
  },

  logout: async (token: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};

export const adminApi = {
  getDashboard: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  getRecentOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/recent-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },

  getRecentContacts: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/recent-contacts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return handleResponse(response);
  },
};

export const portfolioApi = {
  // Récupérer tous les portfolios (public)
  getAll: async (): Promise<{ success: boolean; data: Portfolio[] }> => {
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Récupérer un portfolio par ID (public)
  getById: async (id: number): Promise<{ success: boolean; data: Portfolio }> => {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Récupérer les portfolios par catégorie (public)
  getByCategory: async (category: string): Promise<{ success: boolean; data: Portfolio[] }> => {
    const response = await fetch(`${API_BASE_URL}/portfolio/category/${category}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Récupérer les portfolios mis en avant (public)
  getFeatured: async (): Promise<{ success: boolean; data: Portfolio[] }> => {
    const response = await fetch(`${API_BASE_URL}/portfolio/featured`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return handleResponse(response);
  },

  // Créer un nouveau portfolio (protégé)
  create: async (data: PortfolioFormData, token: string): Promise<{ success: boolean; data: Portfolio; message: string }> => {
    const formData = createFormData(data);
    
    const response = await fetch(`${API_BASE_URL}/admin/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Ne pas mettre 'Content-Type': 'multipart/form-data', le navigateur le fera automatiquement
      },
      body: formData,
    });

    return handleResponse(response);
  },

  // Mettre à jour un portfolio (protégé)
  update: async (id: number, data: Partial<PortfolioFormData>, token: string): Promise<{ success: boolean; data: Portfolio; message: string }> => {
    const formData = createFormData(data);
    
    const response = await fetch(`${API_BASE_URL}/admin/portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    return handleResponse(response);
  },

  // Supprimer un portfolio (protégé)
  delete: async (id: number, token: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/admin/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    return handleResponse(response);
  },
};

// Option alternative utilisant axios si vous préférez
export const portfolioAxiosApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/portfolio`);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/portfolio/${id}`);
    return response.json();
  },

  create: async (data: FormData, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    return response.json();
  },

  delete: async (id: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
