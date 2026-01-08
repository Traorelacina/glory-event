import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import logo from '../images/logo_event.jpg';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', page: 'home', path: '/' },
    { label: 'Services', page: 'services', path: '/services' },
    { label: 'Galerie', page: 'gallery', path: '/gallery' },
    { label: 'Boutique', page: 'boutique', path: '/boutique' },
    { label: 'Contact', page: 'contact', path: '/contact' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header toujours visible et fixe */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-[#fef8f6] to-[#fff5f2] backdrop-blur-md shadow-lg py-4 border-b border-[#ad5945]/10' 
            : 'bg-gradient-to-r from-[#fef8f6]/95 to-[#fff5f2]/95 backdrop-blur-sm py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-12 h-12 transform transition-transform group-hover:scale-110">
                <img
                  src={logo}
                  alt="Events Prestige Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-12 h-12 bg-gradient-to-br from-[#ad5945] to-[#d38074] rounded-lg flex items-center justify-center shadow-lg';
                    fallback.innerHTML = '<span class="text-white font-bold text-lg">EP</span>';
                    target.parentNode?.insertBefore(fallback, target);
                  }}
                />
              </div>
            </Link>

            {/* Navigation desktop - plus proche du logo */}
            <nav className="hidden md:flex items-center space-x-8 ml-16">
              {navItems.map((item) => (
                <Link
                  key={item.page}
                  to={item.path}
                  className={`transition-all duration-300 font-medium relative group ${
                    currentPage === item.page
                      ? 'text-[#ad5945] font-semibold'
                      : 'text-[#111827] hover:text-[#ad5945]'
                  }`}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ad5945] to-[#d38074] transform transition-all duration-300"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ad5945] to-[#d38074] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Boutons à droite */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Bouton panier */}
              <Link
                to="/cart"
                className="relative p-2 rounded-lg transition-all duration-300 text-[#111827] hover:bg-gray-100 hover:scale-110 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:text-[#ad5945] transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Bouton devis */}
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-2 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#ad5945]/30"
              >
                Demander un devis
              </Link>
            </div>

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#111827] p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <nav className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.page}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-3 transition-all duration-200 group ${
                      currentPage === item.page
                        ? 'text-[#ad5945] bg-gradient-to-r from-[#ad5945]/10 to-[#d38074]/10 font-semibold border-r-2 border-[#ad5945]'
                        : 'text-[#111827] hover:bg-gray-50 hover:pl-6 hover:text-[#ad5945]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074] opacity-0 group-hover:opacity-100 transition-opacity ${
                        currentPage === item.page ? 'opacity-100' : ''
                      }`}></span>
                      {item.label}
                    </span>
                  </Link>
                ))}
                
                {/* Panier mobile */}
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3 text-[#111827] hover:bg-gray-50 transition-all duration-200 hover:pl-6 hover:text-[#ad5945] group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Panier
                  </span>
                  {totalItems > 0 && (
                    <span className="bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-md">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                {/* Devis mobile */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-center shadow-lg"
                  >
                    Demander un devis
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Espace réservé avec hauteur dynamique selon le scroll */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled ? 'h-20' : 'h-24'
        }`}
      ></div>
    </>
  );
}