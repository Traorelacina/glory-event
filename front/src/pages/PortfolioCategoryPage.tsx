import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Sparkles, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '../components/Footer';

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
  images: PortfolioImage[];
}

interface PortfolioCategoryPageProps {
  category: string;
  onNavigate: (page: string) => void;
}

// Mapping des catégories vers leurs informations de style
const categoryInfo: { [key: string]: {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  headerImage: string;
  apiCategory: string;
  serviceDescription?: string;
}} = {
  'mariage': {
    title: 'Mariages de Luxe',
    description: 'Des cérémonies inoubliables orchestrées avec élégance et raffinement',
    icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
    gradient: 'from-[#ad5945] to-[#d38074]',
    headerImage: 'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920',
    apiCategory: 'mariage',
    serviceDescription: 'Transformez le plus beau jour de votre vie en un moment magique et inoubliable. Notre équipe d\'experts orchestre chaque détail avec passion et professionnalisme pour créer une célébration à votre image.'
  },
  'corporate': {
    title: 'Événements Corporate',
    description: 'Solutions professionnelles pour vos séminaires et réceptions d\'entreprise',
    icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png',
    gradient: 'from-[#ca715b] to-[#ad5945]',
    headerImage: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920',
    apiCategory: 'corporate',
    serviceDescription: 'Donnez à vos événements professionnels une dimension exceptionnelle. Séminaires, lancements de produits, galas d\'entreprise : nous créons des expériences qui marquent les esprits et renforcent votre image de marque.'
  },
  'reception': {
    title: 'Réceptions Privées',
    description: 'Créez des moments mémorables pour vos célébrations personnelles',
    icon: 'https://cdn-icons-png.flaticon.com/512/3290/3290425.png',
    gradient: 'from-[#d38074] to-[#ad5945]',
    headerImage: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920',
    apiCategory: 'anniversaire',
    serviceDescription: 'Anniversaires, fiançailles, baptêmes ou simplement l\'envie de célébrer : nous créons des moments de partage authentiques dans des cadres enchanteurs. Chaque réception est unique, à votre image.'
  },
  'decoration': {
    title: 'Décoration sur Mesure',
    description: 'Ambiances uniques adaptées à votre vision et votre style',
    icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
    gradient: 'from-[#ad5945] to-[#ca715b]',
    headerImage: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1920',
    apiCategory: 'evenement_professionnel',
    serviceDescription: 'L\'art de créer des ambiances qui racontent votre histoire. Notre équipe de décorateurs talentueux conçoit des univers visuels époustouflants, du concept initial jusqu\'à la réalisation finale.'
  }
};

export default function PortfolioCategoryPage({ category, onNavigate }: PortfolioCategoryPageProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [expandedPortfolios, setExpandedPortfolios] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const info = categoryInfo[category] || categoryInfo['mariage'];

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Setup intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [portfolios]);

  // Fetch portfolios from API
  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/portfolio/category/${info.apiCategory}`);
        const data = await response.json();
        if (data.success) {
          setPortfolios(data.data || []);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [category, info.apiCategory]);

  const togglePortfolioGallery = (portfolioId: number) => {
    setExpandedPortfolios(prev => 
      prev.includes(portfolioId) 
        ? prev.filter(id => id !== portfolioId)
        : [...prev, portfolioId]
    );
  };

  const getGalleryImages = (portfolio: Portfolio) => {
    const allImages = [
      portfolio.image,
      ...(portfolio.images?.map(img => `http://localhost:8000/${img.image_path}`) || [])
    ];
    return allImages.filter(Boolean);
  };

  return (
    <div className="min-h-screen font-playfair text-[#111827] overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
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

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
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

        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8) rotateX(-10deg); }
          to { opacity: 1; transform: scale(1) rotateX(0deg); }
        }

        .font-playfair { font-family: 'Playfair Display', serif; letter-spacing: -0.5px; }
        .font-dm-serif { font-family: 'DM Serif Display', serif; letter-spacing: -0.3px; }
        .font-raleway { font-family: 'Raleway', sans-serif; letter-spacing: 0.3px; }
        .font-lora { font-family: 'Lora', serif; letter-spacing: 0.2px; }
        .font-inter { font-family: 'Raleway', sans-serif; letter-spacing: 0.3px; }

        .shimmer-effect { position: relative; overflow: hidden; }
        .shimmer-effect::after {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }

        .glowing-badge { animation: blinkGlow 3s ease-in-out infinite; }
        .text-glow { animation: textGlow 3s ease-in-out infinite; }
        .magnetic-button { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }

        .service-card {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover {
          transform: translateY(-12px);
        }

        .icon-box {
          background: white;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .service-card:hover .icon-box {
          transform: rotate(12deg) scale(1.15);
          box-shadow: 0 20px 50px rgba(173, 89, 69, 0.25);
          animation: glow 2s ease-in-out infinite;
        }

        .gallery-expand {
          animation: fadeInUp 0.5s ease-out;
        }

        .button-hover {
          position: relative;
          overflow: hidden;
        }

        .button-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .button-hover:hover::before {
          width: 300px;
          height: 300px;
        }

        .image-overlay {
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover .image-overlay {
          background: linear-gradient(135deg, rgba(173, 89, 69, 0.3) 0%, rgba(211, 128, 116, 0.3) 100%);
        }

        .service-image {
          position: relative;
          overflow: hidden;
        }

        .service-image img {
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover .service-image img {
          transform: scale(1.08) rotate(1deg);
        }

        .service-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.2) 100%);
          opacity: 0;
          transition: opacity 0.7s ease;
          pointer-events: none;
        }

        .service-card:hover .service-image::after {
          opacity: 1;
        }

        .chevron-rotate {
          transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .chevron-rotate.rotated {
          transform: rotate(180deg);
        }

        .gallery-image-wrapper {
          position: relative;
          overflow: hidden;
        }

        .gallery-image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          z-index: 1;
        }

        .gallery-image-wrapper:hover::before {
          transform: translateX(100%);
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .shape {
          position: absolute;
          background: linear-gradient(135deg, rgba(173, 89, 69, 0.05), rgba(211, 128, 116, 0.05));
          animation: morphBlob 8s ease-in-out infinite, float 6s ease-in-out infinite;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }

        .shape-1 { width: 300px; height: 300px; top: 10%; left: 5%; animation-delay: 0s; }
        .shape-2 { width: 200px; height: 200px; top: 60%; right: 10%; animation-delay: 2s; }
        .shape-3 { width: 150px; height: 150px; bottom: 10%; left: 50%; animation-delay: 4s; }
      `}</style>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${info.headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#ad5945]/40 to-black/70"></div>
        </div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
            style={{ 
              animation: 'float 6s ease-in-out infinite',
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full"
            style={{ 
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto text-white">
            <button
  onClick={() => onNavigate('home', 'portfolio-section')}
  className="mb-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 magnetic-button"
  style={{ animation: 'fadeInUp 0.8s ease-out' }}
  onMouseEnter={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = '';
  }}
>
  <ArrowLeft className="w-5 h-5" />
  <span className="font-inter font-medium">Retour</span>
</button>
          
          <h1 
            className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight text-glow"
            style={{ animation: 'slideDown 1s ease-out 0.2s both' }}
          >
            {info.title}
          </h1>
          
          <p 
            className="font-lora text-xl md:text-2xl mb-8 text-white/90 font-light max-w-3xl mx-auto leading-relaxed italic"
            style={{ animation: 'slideUp 1s ease-out 0.3s both' }}
          >
            {info.description}
          </p>

          <div 
            className="flex justify-center gap-2"
            style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
          >
            <div className="w-3 h-3 rounded-full bg-white/70"></div>
            <div className="w-3 h-3 rounded-full bg-white/70" style={{ animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
            <div className="w-3 h-3 rounded-full bg-white/70" style={{ animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
          </div>
        </div>
      </section>

      {/* Description du Service */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div 
              className="inline-block mb-6"
              style={{ animation: 'fadeInUp 0.8s ease-out' }}
            >
              <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-3 rounded-full font-raleway text-sm font-semibold uppercase tracking-widest mb-6 shimmer-effect glowing-badge">
                Notre Expertise
              </span>
            </div>
            <h2 className="font-dm-serif text-3xl md:text-4xl font-normal text-slate-900 mb-6 leading-tight tracking-tight">
              Découvrez notre expertise en {info.title.toLowerCase()}
            </h2>
          </div>
          
          <div 
            className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-200"
            style={{ animation: 'scaleUp 0.8s ease-out' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img 
                    src={info.headerImage} 
                    alt={info.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="font-lora text-lg text-slate-600 leading-relaxed font-light italic">
                  {info.serviceDescription || "Notre équipe d'experts est dédiée à créer des expériences exceptionnelles qui allient créativité, précision et excellence. Chaque détail est soigneusement pensé pour transformer votre vision en réalité."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid avec affichage service */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] mb-6 leading-tight">
              Nos Réalisations
            </h2>
            <p className="font-lora text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light italic">
              Découvrez nos projets phares et laissez-vous inspirer par nos créations
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-[#ad5945] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : portfolios.length === 0 ? (
            <div 
              className="text-center py-20"
              style={{ animation: 'fadeInUp 0.8s ease-out' }}
            >
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-dm-serif text-2xl text-gray-600 mb-2">Aucune réalisation pour le moment</h3>
              <p className="font-inter text-gray-500">De nouvelles réalisations seront bientôt disponibles</p>
            </div>
          ) : (
            <div className="space-y-16">
              {portfolios.map((portfolio, index) => {
                const isExpanded = expandedPortfolios.includes(portfolio.id);
                const galleryImages = getGalleryImages(portfolio);

                return (
                  <div
                    key={portfolio.id}
                    id={`portfolio-${portfolio.id}`}
                    data-animate
                    className="service-card"
                    style={{
                      opacity: isVisible[`portfolio-${portfolio.id}`] ? 1 : 0,
                      transform: isVisible[`portfolio-${portfolio.id}`] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-slate-100 group">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div 
                          className="relative h-72 md:h-96 service-image overflow-hidden"
                          onMouseEnter={() => setIsHovering(`image-${portfolio.id}`)}
                          onMouseLeave={() => setIsHovering(null)}
                        >
                          <img
                            src={`http://localhost:8000/${portfolio.image}`}
                            alt={portfolio.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            style={{
                              transform: isHovering === `image-${portfolio.id}` ? `scale(1.15) rotate(2deg)` : 'scale(1) rotate(0deg)'
                            }}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                          <div className="absolute inset-0 image-overlay bg-gradient-to-t from-black/40 to-transparent"></div>
                          
                          {portfolio.featured && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                              <Sparkles className="w-4 h-4" />
                              À la une
                            </div>
                          )}
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(portfolio.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          <h2 className="font-dm-serif text-3xl md:text-4xl font-normal text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-[#ad5945] transition-colors duration-300">
                            {portfolio.title}
                          </h2>

                          <p className="font-lora text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-light italic">
                            {portfolio.description}
                          </p>

                          <div className="flex flex-wrap gap-3 pt-2">
                            <button
                              onClick={() => togglePortfolioGallery(portfolio.id)}
                              className={`button-hover magnetic-button font-raleway relative px-6 py-2 rounded-full font-semibold transition-all duration-300 border flex items-center gap-2 text-sm hover:scale-110 ${
                                isExpanded
                                  ? "bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white border-[#ad5945] shadow-lg"
                                  : "bg-white text-slate-700 hover:bg-slate-50 hover:border-[#ad5945]/30 border-slate-200"
                              }`}
                            >
                              {isExpanded ? "Masquer galerie" : "Voir galerie"}
                              <ChevronDown className={`chevron-rotate w-4 h-4 ${isExpanded ? "rotated" : ""}`} />
                            </button>
                            <button
                              onClick={() => onNavigate('contact')}
                              className="button-hover magnetic-button font-raleway relative px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#ad5945] to-[#d38074] hover:shadow-lg hover:shadow-[#ad5945]/50 transition-all duration-300 flex items-center gap-2 group text-sm transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left - rect.width / 2;
                                const y = e.clientY - rect.top - rect.height / 2;
                                e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-8px) scale(1.1)`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                              }}
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-[#d38074] to-[#ca715b] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                              <span className="relative z-10">Demander un devis</span>
                              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && galleryImages.length > 0 && (
                        <div className="gallery-expand p-8 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
                          <h3 className="font-dm-serif text-2xl font-normal text-slate-900 mb-8">Galerie Photos</h3>
                          <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation={{
                              nextEl: `.swiper-button-next-${portfolio.id}`,
                              prevEl: `.swiper-button-prev-${portfolio.id}`,
                            }}
                            pagination={{
                              clickable: true,
                              dynamicBullets: true,
                              el: `.swiper-pagination-${portfolio.id}`,
                            }}
                            autoplay={{ delay: 3000 }}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                              640: { slidesPerView: 2 },
                              1024: { slidesPerView: 4 },
                            }}
                            className="swiper-custom"
                          >
                            {galleryImages.map((image, idx) => (
                              <SwiperSlide key={idx}>
                                <div className="gallery-image-wrapper relative aspect-square rounded-xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-[#ad5945]/30 transition-all duration-500 transform hover:-translate-y-2">
                                  <img
                                    src={image}
                                    alt={`${portfolio.title} ${idx + 1}`}
                                    className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-500 group-hover:rotate-12">
                                      <Sparkles className="w-8 h-8 text-[#ad5945]" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <div className="flex justify-center gap-4 mt-8">
                            <button
                              className={`swiper-button-prev-${portfolio.id} w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ad5945] hover:to-[#d38074] hover:border-0 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-125`}
                            >
                              <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                            <div className={`swiper-pagination-${portfolio.id} flex justify-center gap-2`}></div>
                            <button
                              className={`swiper-button-next-${portfolio.id} w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ad5945] hover:to-[#d38074] hover:border-0 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-125`}
                            >
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="portfolio-cta"
            data-animate
            className="text-center"
            style={{
              opacity: isVisible['portfolio-cta'] ? 1 : 0,
              transform: isVisible['portfolio-cta'] ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="bg-gradient-to-br from-[#ad5945] via-[#d38074] to-[#ca715b] rounded-3xl p-16 text-white relative overflow-hidden group/cta">
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
                  style={{ 
                    animation: 'float 8s ease-in-out infinite',
                    transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                  }}
                ></div>
                <div 
                  className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"
                  style={{ 
                    animation: 'float 10s ease-in-out infinite', 
                    animationDelay: '2s',
                    transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`
                  }}
                ></div>
              </div>

              <div className="relative z-10">
                <h3 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-glow">
                  Inspiré par nos réalisations ?
                </h3>
                <p className="font-lora text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light leading-relaxed italic">
                  Notre équipe est prête à transformer votre vision en un événement exceptionnel. Contactez-nous pour discuter de votre projet.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-white text-[#ad5945] px-12 py-4 rounded-full font-raleway font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 inline-flex items-center gap-3 group/cta-btn relative overflow-hidden magnetic-button"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    e.currentTarget.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-8px) scale(1.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 translate-y-full group-hover/cta-btn:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative z-10">Commencer votre projet</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover/cta-btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}