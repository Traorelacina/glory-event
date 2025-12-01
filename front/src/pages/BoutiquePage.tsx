import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Loader, AlertCircle, Eye } from "lucide-react";
import { useCartStore, Product } from "../store/cartStore";
import ProductDetailModal from "../components/ProductDetailModal";
import Footer from "../components/Footer";

interface BoutiquePageProps {
  onNavigate: (page: string) => void;
}

// API URL
const API_URL = 'http://127.0.0.1:8000/api';
const STORAGE_URL = 'http://127.0.0.1:8000/storage';

export default function BoutiquePage({ onNavigate }: BoutiquePageProps) {
  const { addItem, getTotalItems } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/produits`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setProducts(data.data);
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion au serveur');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STORAGE_URL}/${imagePath}`;
  };

  const getFallbackImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Non Disponible%3C/text%3E%3C/svg%3E';
  };

  const categories = ["Tous", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(
    (p) => selectedCategory === "Tous" || p.category === selectedCategory
  );

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="min-h-screen pt-32 pb-12 bg-gradient-to-b from-white via-slate-50 to-white font-playfair text-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
              Boutique Parfums
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de fragrances d'exception
            </p>

            {/* Points décoratifs */}
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
            </div>

            {/* CATEGORIES */}
            <div className="mt-12 flex justify-center gap-3 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full font-inter font-medium transition-all transform hover:-translate-y-1 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white shadow-lg shadow-[#ad5945]/30"
                      : "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ERREUR */}
          {error && (
            <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-4 shadow-sm">
              <AlertCircle className="text-red-600 flex-shrink-0" size={28} />
              <div className="flex-1">
                <p className="text-red-800 font-semibold text-lg">{error}</p>
                <button 
                  onClick={fetchProducts}
                  className="text-red-600 underline text-sm mt-2 hover:text-red-700 font-medium"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-20 h-20 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Loader className="animate-spin text-white" size={32} />
              </div>
              <p className="text-gray-600 font-medium text-xl">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-xl border border-slate-100">
              <div className="w-24 h-24 bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShoppingCart className="text-white" size={40} />
              </div>
              <p className="text-gray-700 font-semibold text-2xl mb-3">Aucun produit disponible</p>
              <p className="text-gray-500 text-lg mb-6">
                {selectedCategory !== "Tous" 
                  ? `Aucun produit dans la catégorie "${selectedCategory}"`
                  : "Vérifiez votre connexion ou contactez l'administrateur"
                }
              </p>
              <button
                onClick={() => setSelectedCategory("Tous")}
                className="px-6 py-3 bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Voir tous les produits
              </button>
            </div>
          ) : (
            <>
              {/* GRID PRODUITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group border border-slate-100"
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = getFallbackImage();
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      {product.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Vedette
                        </div>
                      )}

                      {!product.in_stock && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          Rupture
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-block bg-gradient-to-r from-[#ad5945]/10 to-[#d38074]/10 text-[#ad5945] px-3 py-1.5 rounded-lg text-xs font-inter font-semibold uppercase tracking-wide border border-[#ad5945]/20">
                          {product.category}
                        </span>
                      </div>
                      
                      <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      
                      <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#ad5945] to-[#d38074] bg-clip-text text-transparent">
                          {Number(product.price).toLocaleString('fr-FR')} FCFA
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.in_stock}
                          className={`p-3 rounded-full transform transition-all shadow-lg ${
                            product.in_stock
                              ? 'bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white hover:shadow-xl hover:scale-110 active:scale-95 hover:shadow-[#ad5945]/30'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      {/* BOUTON DÉTAIL */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-inter font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-md border border-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                        Voir les détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION APPEL À L'ACTION */}
              <div className="bg-gradient-to-r from-[#ad5945] to-[#d38074] rounded-3xl p-12 text-white text-center relative overflow-hidden mb-16">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h3 className="font-cormorant text-3xl md:text-4xl font-bold mb-4">
                    Des questions sur nos parfums ?
                  </h3>
                  <p className="font-inter text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Notre équipe d'experts est là pour vous conseiller et vous aider à trouver la fragrance parfaite
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="bg-white text-[#ad5945] px-8 py-4 rounded-full font-inter font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Nous contacter
                    </button>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-inter font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                    >
                      Voir le haut
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* MODAL PRODUIT */}
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          getImageUrl={getImageUrl}
          getFallbackImage={getFallbackImage}
        />
      </div>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8) rotateX(-10deg); }
          to { opacity: 1; transform: scale(1) rotateX(0deg); }
        }

        @keyframes morphBlob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(173, 89, 69, 0.3), inset 0 0 20px rgba(173, 89, 69, 0.1); }
          50% { box-shadow: 0 0 40px rgba(211, 128, 116, 0.5), inset 0 0 20px rgba(173, 89, 69, 0.2); }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(173, 89, 69, 0.3); }
          50% { text-shadow: 0 0 20px rgba(211, 128, 116, 0.6), 0 0 30px rgba(173, 89, 69, 0.4); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }

        @keyframes blinkGlow {
          0%, 100% { background-color: rgba(173, 89, 69, 0.2); box-shadow: 0 0 20px rgba(173, 89, 69, 0.3); }
          50% { background-color: rgba(211, 128, 116, 0.3); box-shadow: 0 0 30px rgba(211, 128, 116, 0.5); }
        }

        .font-playfair {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        .font-dm-serif {
          font-family: 'DM Serif Display', serif;
          letter-spacing: -0.3px;
        }

        .font-raleway {
          font-family: 'Raleway', sans-serif;
          letter-spacing: 0.3px;
        }

        .font-lora {
          font-family: 'Lora', serif;
          letter-spacing: 0.2px;
        }

        .font-inter {
          font-family: 'Raleway', sans-serif;
          letter-spacing: 0.3px;
        }

        .font-cormorant {
          font-family: 'Lora', serif;
          letter-spacing: 0.2px;
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }

        .glowing-badge {
          animation: blinkGlow 3s ease-in-out infinite;
        }

        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}