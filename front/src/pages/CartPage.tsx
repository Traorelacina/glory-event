import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Loader, AlertCircle, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

// API URL
const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage';

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
  });

  // Fonction pour obtenir l'URL complète de l'image
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STORAGE_URL}/${imagePath}`;
  };

  // Image de secours en SVG
  const getFallbackImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage%3C/text%3E%3C/svg%3E';
  };

  const handleSubmitOrder = async () => {
    // Validation
    if (!formData.client_name || !formData.client_email || !formData.client_phone) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.client_email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        client_name: formData.client_name.trim(),
        client_email: formData.client_email.trim(),
        client_phone: formData.client_phone.trim(),
        produits: items.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      };

      const response = await fetch(`${API_URL}/commandes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de la création de la commande');
      }

      setIsSubmitted(true);
      
      // Redirection après succès
      setTimeout(() => {
        clearCart();
        setIsOrderFormOpen(false);
        setIsSubmitted(false);
        setFormData({
          client_name: '',
          client_email: '',
          client_phone: '',
        });
        onNavigate('boutique');
      }, 3000);

    } catch (err: any) {
      console.error('Order submission error:', err);
      setError(err.message || 'Erreur lors de la création de la commande');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Découvrez notre collection de parfums exclusifs
          </p>
          <button
            onClick={() => onNavigate('boutique')}
            className="bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-8 py-4 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Explorer la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#111827] mb-6">
            Votre Panier
          </h1>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]"></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LISTE DES ARTICLES */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex gap-6 group"
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = getFallbackImage();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-lg w-8 text-center bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                        {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RÉCAPITULATIF */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 sticky top-32">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600 font-semibold">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                    {getTotalPrice().toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white py-4 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Finaliser la commande
              </button>

              <button
                onClick={() => onNavigate('boutique')}
                className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 border border-gray-200"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FORMULAIRE DE COMMANDE */}
      {isOrderFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full my-8 shadow-2xl border border-slate-100">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">
                  Commande confirmée !
                </h3>
                <p className="text-gray-600 text-lg">
                  Nous vous contacterons très bientôt. Merci pour votre confiance !
                </p>
                <div className="mt-6 flex justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074] animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  Finaliser votre commande
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                    <p className="text-red-800 text-sm flex-1">{error}</p>
                    <button 
                      onClick={() => setError(null)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ad5945] focus:border-transparent outline-none transition-all hover:border-gray-400"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ad5945] focus:border-transparent outline-none transition-all hover:border-gray-400"
                      placeholder="jean.dupont@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#ad5945] focus:border-transparent outline-none transition-all hover:border-gray-400"
                      placeholder="+225 07 XX XX XX XX"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Votre commande</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="flex-1 truncate mr-2">{item.name} x{item.quantity}</span>
                        <span className="font-semibold whitespace-nowrap bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                          {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-gray-900 text-lg">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                        {getTotalPrice().toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => {
                        setIsOrderFormOpen(false);
                        setError(null);
                      }}
                      disabled={isSubmitting}
                      className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white py-4 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin" size={20} />
                          Envoi en cours...
                        </>
                      ) : (
                        'Confirmer la commande'
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}