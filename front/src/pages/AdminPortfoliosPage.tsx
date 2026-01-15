import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Calendar, Image as ImageIcon, X } from 'lucide-react';
import AdminNavbar from '../components/AdminNavbar';
import { useAuthStore } from '../../store/AuthStore';
import axios from 'axios';

interface PortfolioImage {
  id: number;
  image_path: string;
  order: number;
}

interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  date: string;
  created_at: string;
  images: PortfolioImage[]; // Images supplémentaires
}

const categoryLabels: { [key: string]: string } = {
  mariage: 'Mariage',
  corporate: 'Corporate',
  anniversaire: 'Anniversaire',
  evenement_professionnel: 'Événement Professionnel',
};

export default function AdminPortfoliosPage() {
  const { token } = useAuthStore();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'mariage',
    featured: false,
    date: new Date().toISOString().split('T')[0],
    image: null as File | null,
    additionalImages: [] as File[],
    deletedImages: [] as number[], // IDs des images à supprimer
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Afficher la notification pendant 3 secondes
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get('https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/api/portfolio');
      setPortfolios(response.data.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des portfolios:', error);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('featured', formData.featured ? '1' : '0');
      data.append('date', formData.date);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      // Ajouter les images supplémentaires
      formData.additionalImages.forEach((file, index) => {
        data.append(`additional_images[${index}]`, file);
      });

      // Ajouter les IDs des images à supprimer (pour la mise à jour)
      if (editingPortfolio) {
        formData.deletedImages.forEach((id, index) => {
          data.append(`deleted_images[${index}]`, id.toString());
        });
      }

      if (editingPortfolio) {
        await axios.put(`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/api/admin/portfolio/${editingPortfolio.id}`, data, {
          headers: { 
            'Authorization': `Bearer ${token}`,
          },
        });
        showNotification('success', 'Portfolio mis à jour avec succès!');
      } else {
        await axios.post('https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/api/admin/portfolio', data, {
          headers: { 
            'Authorization': `Bearer ${token}`,
          },
        });
        showNotification('success', 'Portfolio créé avec succès!');
      }

      await fetchPortfolios();
      closeModal();
    } catch (error: any) {
      console.error('Erreur complète:', error);
      
      if (error.response?.status === 401) {
        showNotification('error', 'Session expirée. Veuillez vous reconnecter.');
      } else if (error.response?.data?.errors) {
        const errors = Object.values(error.response.data.errors).flat().join(', ');
        showNotification('error', `Erreurs: ${errors}`);
      } else if (error.response?.data?.message) {
        showNotification('error', `Erreur: ${error.response.data.message}`);
      } else {
        showNotification('error', 'Erreur lors de la sauvegarde du portfolio');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce portfolio ?')) return;

    try {
      await axios.delete(`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/api/admin/portfolio/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      await fetchPortfolios();
      showNotification('success', 'Portfolio supprimé avec succès!');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      if (error.response?.status === 401) {
        showNotification('error', 'Session expirée. Veuillez vous reconnecter.');
      } else if (error.response?.data?.message) {
        showNotification('error', `Erreur: ${error.response.data.message}`);
      } else {
        showNotification('error', 'Erreur lors de la suppression du portfolio');
      }
    }
  };

  const openModal = (portfolio?: Portfolio) => {
    if (portfolio) {
      setEditingPortfolio(portfolio);
      setFormData({
        title: portfolio.title,
        description: portfolio.description || '',
        category: portfolio.category,
        featured: portfolio.featured,
        date: portfolio.date,
        image: null,
        additionalImages: [],
        deletedImages: [],
      });
    } else {
      setEditingPortfolio(null);
      setFormData({
        title: '',
        description: '',
        category: 'mariage',
        featured: false,
        date: new Date().toISOString().split('T')[0],
        image: null,
        additionalImages: [],
        deletedImages: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPortfolio(null);
    setFormData({
      title: '',
      description: '',
      category: 'mariage',
      featured: false,
      date: new Date().toISOString().split('T')[0],
      image: null,
      additionalImages: [],
      deletedImages: [],
    });
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...filesArray]
      }));
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const removeExistingImage = (imageId: number) => {
    setFormData(prev => ({
      ...prev,
      deletedImages: [...prev.deletedImages, imageId]
    }));
  };

  const filteredPortfolios = selectedCategory === 'all'
    ? portfolios
    : portfolios.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <AdminNavbar />
      
      {/* Notification */}
      {notification && (
        <div className={`fixed top-24 right-4 z-50 ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-4">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Ajoutez ce CSS dans votre fichier global ou en inline */}
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Gestion des Portfolios
              </h1>
              <p className="text-gray-600">Gérez vos projets et réalisations</p>
            </div>
            
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nouveau Portfolio
            </button>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Tous ({portfolios.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = portfolios.filter(p => p.category === key).length;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Grille des portfolios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48">
                <img
                  src={`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/${portfolio.image}`}
                  alt={portfolio.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                  }}
                />
                {portfolio.featured && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    À la une
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {categoryLabels[portfolio.category]}
                </div>
                
                {/* Badge pour images supplémentaires */}
                {portfolio.images && portfolio.images.length > 0 && (
                  <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    +{portfolio.images.length} photos
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {portfolio.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {portfolio.description}
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(portfolio.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex gap-2">
                  
                  
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPortfolios.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucun portfolio dans cette catégorie</p>
            {portfolios.length === 0 && (
              <button
                onClick={() => openModal()}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Créer votre premier portfolio
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {editingPortfolio ? 'Modifier le portfolio' : 'Nouveau portfolio'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Mariage Sophie & Thomas"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Décrivez le projet..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image principale {!editingPortfolio && '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingPortfolio}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    image: e.target.files?.[0] || null 
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {editingPortfolio && editingPortfolio.image && !formData.deletedImages.includes(-1) && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Image actuelle :</p>
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/${editingPortfolio.image}`} 
                        alt="Current portfolio" 
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(-1)}
                        className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Images supplémentaires
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                
                {/* Aperçu des nouvelles images */}
                {formData.additionalImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Nouvelles images :</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.additionalImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Nouvelle image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Images existantes (pour l'édition) */}
                {editingPortfolio && editingPortfolio.images && editingPortfolio.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-2">Images existantes :</p>
                    <div className="flex flex-wrap gap-2">
                      {editingPortfolio.images
                        .filter(img => !formData.deletedImages.includes(img.id))
                        .map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/${image.image_path}`}
                              alt={`Image supplémentaire`}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Mettre en avant (À la une)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50"
                >
                  {loading ? 'Enregistrement...' : editingPortfolio ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
