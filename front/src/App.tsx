import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BoutiquePage from './pages/BoutiquePage';
import CartPage from './pages/CartPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProduitsPage from './pages/AdminProduitsPage';
import AdminCommandesPage from './pages/AdminCommandesPage';
import AdminContactsPage from './pages/AdminContactsPage';
import AdminPortfoliosPage from './pages/AdminPortfoliosPage';
import ProtectedRoute from './components/ProtectedRoute';
import PortfolioCategoryPage from './pages/PortfolioCategoryPage'; // Ajout de l'import
import { statisticsService } from '../services/statisticsService';

// Composant pour le tracking des pages
function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
    const pageName = getPageNameFromPath(location.pathname);
    if (pageName) {
      statisticsService.trackView(pageName);
    }
    // Scroll vers le haut à chaque changement de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const getPageNameFromPath = (path: string) => {
    const routes: { [key: string]: string } = {
      '/': 'home',
      '/services': 'services',
      '/boutique': 'boutique',
      '/cart': 'cart',
      '/gallery': 'gallery',
      '/contact': 'contact',
      '/portfolio/mariage': 'portfolio-mariage',
      '/portfolio/corporate': 'portfolio-corporate',
      '/portfolio/reception': 'portfolio-reception',
      '/portfolio/decoration': 'portfolio-decoration',
    };
    
    return routes[path] || null;
  };

  return null;
}

// Layout principal avec Header
function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fonction de navigation que vous passerez aux composants
  const handleNavigate = (page: string, category?: string) => {
    if (category) {
      // Navigation vers une catégorie spécifique de portfolio
      navigate(`/portfolio/${category}`);
    } else {
      navigate(`/${page === 'home' ? '' : page}`);
    }
  };

  // Déterminer la page actuelle depuis l'URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/portfolio/')) return 'portfolio';
    return path.substring(1); // Enlève le '/' du début
  };

  return (
    <>
      <Header currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/services" element={<ServicesPage onNavigate={handleNavigate} />} />
        <Route path="/boutique" element={<BoutiquePage onNavigate={handleNavigate} />} />
        <Route path="/cart" element={<CartPage onNavigate={handleNavigate} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Routes pour les pages de portfolio par catégorie */}
        <Route 
          path="/portfolio/mariage" 
          element={<PortfolioCategoryPage category="mariage" onNavigate={handleNavigate} />} 
        />
        <Route 
          path="/portfolio/corporate" 
          element={<PortfolioCategoryPage category="corporate" onNavigate={handleNavigate} />} 
        />
        <Route 
          path="/portfolio/reception" 
          element={<PortfolioCategoryPage category="reception" onNavigate={handleNavigate} />} 
        />
        <Route 
          path="/portfolio/decoration" 
          element={<PortfolioCategoryPage category="decoration" onNavigate={handleNavigate} />} 
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      
      <Routes>
        {/* Pages publiques avec layout */}
        <Route path="/*" element={<MainLayout />} />

        {/* Pages admin sans Header */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produits"
          element={
            <ProtectedRoute>
              <AdminProduitsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/commandes"
          element={
            <ProtectedRoute>
              <AdminCommandesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute>
              <AdminContactsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/portfolios"
          element={
            <ProtectedRoute>
              <AdminPortfoliosPage />
            </ProtectedRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;