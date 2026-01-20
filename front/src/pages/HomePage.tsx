import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Footer from '../components/Footer';
import { statisticsService } from '../../services/statisticsService';
import decorationImage from '../../images/event1.jpg';
import slidetrois from '../../images/slide3.jpeg';

interface HomePageProps {
  onNavigate: (page: string, section?: string) => void;
}

// Interface pour les portfolios
interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  date: string;
  created_at: string;
  images: any[];
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ events: 0, years: 0, satisfaction: 0, partners: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  
  // Nouvel état pour les portfolios
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loadingPortfolios, setLoadingPortfolios] = useState(true);

  // Fonction pour récupérer les portfolios
  const fetchPortfolios = async () => {
    try {
      setLoadingPortfolios(true);
      const response = await fetch('https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/api/portfolio', {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      // Tri par date de création (du plus récent au plus ancien)
      const sortedPortfolios = (data.data || []).sort((a: Portfolio, b: Portfolio) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setPortfolios(sortedPortfolios);
    } catch (error) {
      console.error('Erreur lors du chargement des portfolios:', error);
    } finally {
      setLoadingPortfolios(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

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

  // Images et textes pour le slider hero
  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Des Moments Inoubliables',
      subtitle: 'Transformez vos visions en moments magiques.',
      cta1: 'Commencer votre projet',
      cta2: 'Voir nos réalisations'
    },
    {
      image: decorationImage,
      title: "Des décorations d'exception",
      subtitle: "Vos cérémonies sont orchestrées avec élégance.",
      cta1: 'Obtenir un devis',
      cta2: 'Galerie photos'
    },
    {
      image: slidetrois,
      title: 'Des parfums tendances ',
      subtitle: 'Distinguez-vous en optant pour notre riche collection de parfums.',
      cta1: 'Organiser un événement',
      cta2: 'Voir le portfolio'
    },
  ];

  // Track page view
  useEffect(() => {
    statisticsService.trackView('home');
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Services principaux avec leurs catégories
  const services = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
      title: 'Wedding Planning',
      description: 'Des cérémonies inoubliables orchestrées avec élégance et raffinement',
      color: 'from-[#ad5945] to-[#d38074]',
      img: 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'mariage'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png',
      title: 'Événements Corporate',
      description: "Solutions professionnelles pour vos séminaires et réceptions d'entreprise",
      color: 'from-[#ca715b] to-[#ad5945]',
      img: 'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'corporate'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3290/3290425.png',
      title: 'Réceptions Privées',
      description: 'Créez des moments mémorables pour vos célébrations personnelles',
      color: 'from-[#d38074] to-[#ad5945]',
      img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'reception'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
      title: 'Décoration sur Mesure',
      description: 'Ambiances uniques adaptées à votre vision et votre style',
      color: 'from-[#ad5945] to-[#ca715b]',
      img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'decoration'
    },
  ];

  // Services détaillés
  const detailedServices = [
    {
      icon: 'https://img.icons8.com/?size=100&id=34F8IE9yR8fJ&format=png&color=000000',
      title: 'Wedding planer',
      description: 'Wedding planning complet pour votre jour parfait',
      color: 'from-[#ad5945] to-[#d38074]',
      slug: 'mariage'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=A8fp9eO99uvg&format=png&color=000000',
      title: 'Décoration sur mesure',
      description: 'Design et mise en scène sur mesure',
      color: 'from-[#ad5945] to-[#ca715b]',
      slug: 'decoration'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png',
      title: 'Cuisine et restauration',
      description: 'Cuisine africaine, européenne et américaine',
      color: 'from-[#d38074] to-[#ad5945]',
      slug: 'restauration'
    },
     {
      icon: 'https://cdn-icons-png.flaticon.com/512/3290/3290471.png',
      title: 'Événementiel',
      description: 'Organisation complète de tous types d\'événements',
      color: 'from-[#ca715b] to-[#ad5945]',
      slug: 'evenementiel'
    },
    {
      icon: 'https://img.icons8.com/color/96/000000/tableware.png',
      title: 'Location d\'ustensiles',
      description: 'Séminaires et conférences de haut niveau',
      color: 'from-[#ca715b] to-[#d38074]',
      slug: 'reunion-professionnelle'
    },
    
   
    {
      icon: 'https://img.icons8.com/?size=100&id=ODNJWlRzHZXD&format=png&color=000000',
      title: 'Location de tables et chaises',
      description: 'Anniversaires, baptêmes et célébrations familiales',
      color: 'from-[#d38074] to-[#ca715b]',
      slug: 'reception'
    },
  ];

  // Features
  const features = [
    {
      icon: 'https://img.icons8.com/?size=100&id=NEUI7OgKJl6r&format=png&color=000000',
      title: 'Service\nPersonnalisé',
      description: 'Chaque événement est unique et mérite une attention particulière'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=SsUyXplSFORf&format=png&color=000000',
      title: 'Délais\nRespectés',
      description: 'Livraison dans les temps avec une qualité constante'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=tt6pu1n8E0QU&format=png&color=000000',
      title: 'Excellence\nGarantie',
      description: 'Des prestations de qualité réalisées dans le respect des délais'
    },
    {
      icon: 'https://img.icons8.com/?size=100&id=104233&format=png&color=000000',
      title: 'Innovation\nCréative',
      description: 'Des concepts novateurs qui marquent les esprits'
    },
  ];

  // Raccourcis de catégories pour l'affichage
  const categoryLabels: { [key: string]: string } = {
    mariage: 'Mariage',
    corporate: 'Corporate',
    anniversaire: 'Anniversaire',
    evenement_professionnel: 'Événement Professionnel',
    reception: 'Réception',
    decoration: 'Décoration'
  };

  // Fonction pour gérer la navigation
  const handleNavigation = (page: string, section?: string) => {
    if (page === 'home' && section === 'portfolio-section') {
      // Si on veut revenir à la section portfolio
      setScrollToSection('portfolio-section');
      onNavigate('home');
    } else {
      onNavigate(page, section);
    }
  };

  // Effet pour scroller vers la section
  useEffect(() => {
    if (scrollToSection === 'portfolio-section' && portfolioSectionRef.current) {
      // Petit délai pour que la page soit rendue
      setTimeout(() => {
        portfolioSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
      setScrollToSection(null);
    }
  }, [scrollToSection]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { events: 500, years: 15, satisfaction: 98, partners: 50 };
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        events: Math.floor(targets.events * easeOut),
        years: Math.floor(targets.years * easeOut),
        satisfaction: Math.floor(targets.satisfaction * easeOut),
        partners: Math.floor(targets.partners * easeOut),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen font-playfair text-[#111827] overflow-x-hidden">
      {/* Import des polices et animations CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
          }
          50% { 
            transform: translateY(-10px) translateX(-10px); 
          }
          75% { 
            transform: translateY(-15px) translateX(5px); 
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes morphBlob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(173, 89, 69, 0.3), inset 0 0 20px rgba(173, 89, 69, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(211, 128, 116, 0.5), inset 0 0 20px rgba(173, 89, 69, 0.2);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        @keyframes blinkGlow {
          0%, 100% {
            background-color: rgba(173, 89, 69, 0.2);
            box-shadow: 0 0 20px rgba(173, 89, 69, 0.3);
          }
          50% {
            background-color: rgba(211, 128, 116, 0.3);
            box-shadow: 0 0 30px rgba(211, 128, 116, 0.5);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(173, 89, 69, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(211, 128, 116, 0.6), 0 0 30px rgba(173, 89, 69, 0.4);
          }
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

        .text-shadow-gentle {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .text-shadow-elegant {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
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
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer 2s infinite;
        }

        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-tilt {
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .parallax-layer {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glowing-badge {
          animation: blinkGlow 3s ease-in-out infinite;
        }

        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Section Hero avec Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slides avec effet de zoom */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-1000 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              opacity: currentSlide === index ? 1 : 0,
              transform: currentSlide === index 
                ? `translateY(${scrollY * 0.5}px) scale(1.1)` 
                : `translateY(${scrollY * 0.5}px) scale(1)`,
              zIndex: currentSlide === index ? 1 : 0
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[#ad5945]/30 to-black/60"></div>
          </div>
        ))}

        {/* Particules flottantes décoratives */}
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
          <div 
            className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/25 rounded-full"
            style={{ 
              animation: 'float 10s ease-in-out infinite',
              animationDelay: '4s',
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          ></div>
        </div>

        {/* Content avec animations élégantes */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto text-white">
          <div 
            className="inline-block mb-6 overflow-hidden"
            style={{ animation: 'fadeInUp 0.8s ease-out' }}
          >
            
          </div>

          <h1 
            className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight text-glow"
            style={{ animation: 'slideDown 1s ease-out 0.2s both' }}
          >
            {heroSlides[currentSlide].title}
          </h1>
          
          <p 
            className="font-lora text-xl md:text-3xl mb-12 text-white/90 font-light max-w-3xl mx-auto leading-relaxed italic"
            style={{ animation: 'slideUp 1s ease-out 0.4s both' }}
          >
            {heroSlides[currentSlide].subtitle}
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}
          >
            <button
              onClick={() => onNavigate('contact')}
              className="group relative bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-10 py-4 rounded-full font-inter font-semibold text-lg hover:shadow-2xl hover:shadow-[#ad5945]/50 transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 overflow-hidden magnetic-button"
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
              <span className="relative z-10">{heroSlides[currentSlide].cta1}</span>
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="group px-10 py-4 rounded-full font-inter font-semibold text-lg border-2 border-white text-white hover:bg-white hover:text-[#ad5945] transition-all duration-300 transform hover:-translate-y-2 hover:scale-110"
            >
              {heroSlides[currentSlide].cta2}
            </button>
          </div>

          {/* Indicateurs de slide */}
          <div className="flex justify-center gap-3 mt-16">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentSlide === index ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/75'
                }`}
                style={{ animation: 'scaleIn 0.5s ease-out' }}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 text-white/70"
          style={{ animation: 'bounce 2s ease-in-out infinite' }}
        >
          <span className="font-inter text-xs uppercase tracking-widest rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/70 to-transparent"></div>
        </div>
      </section>

      {/* Section Features avec animations au scroll */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Blobs animés en arrière-plan */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-96 h-96 bg-[#ad5945] rounded-full blur-3xl"
            style={{ animation: 'morphBlob 10s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#d38074] rounded-full blur-3xl"
            style={{ animation: 'morphBlob 12s ease-in-out infinite', animationDelay: '2s' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="features-header"
            data-animate
            className="text-center mb-20"
            style={{
              opacity: isVisible['features-header'] ? 1 : 0,
              transform: isVisible['features-header'] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-3 rounded-full font-raleway text-sm font-semibold uppercase tracking-widest mb-6 shimmer-effect glowing-badge">
              Notre Engagement
            </span>
            <h2 className="font-dm-serif text-5xl md:text-6xl font-normal text-gray-900 mb-8 tracking-tight text-glow">
              L'Excellence dans
              <span className="block font-playfair italic text-5xl md:text-6xl text-[#ad5945] mt-2">
                Chaque Détail
              </span>
            </h2>
            <p className="font-lora text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light italic">
              Nous combinons créativité, professionnalisme et expertise pour donner vie à vos projets les plus ambitieux
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className="text-center group p-8 rounded-3xl hover:bg-gradient-to-br hover:from-[#ad5945]/5 hover:to-[#d38074]/5 transition-all duration-500 cursor-default border border-transparent hover:border-[#ad5945]/20 card-tilt"
                style={{
                  opacity: isVisible[`feature-${index}`] ? 1 : 0,
                  transform: isVisible[`feature-${index}`] ? 'translateY(0) rotateX(0deg)' : 'translateY(30px) rotateX(-10deg)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(20px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                }}
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg border border-gray-200 relative overflow-hidden group-hover:shadow-xl group-hover:shadow-[#ad5945]/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ad5945]/10 to-[#d38074]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-12 h-12 relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                    style={{ animation: 'wiggle 3s ease-in-out infinite' }}
                  />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-gray-900 mb-4 tracking-tight group-hover:text-[#ad5945] transition-colors duration-300 whitespace-pre-line">
                  {feature.title}
                </h3>
                
                <p className="font-inter text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="pb-8"
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center group p-6 rounded-3xl bg-white shadow-lg border border-gray-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#ad5945]/10 to-[#d38074]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                      <img 
                        src={feature.icon} 
                        alt={feature.title}
                        className="w-10 h-10"
                      />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-3 tracking-tight whitespace-pre-line">
                      {feature.title}
                    </h3>
                    
                    <p className="font-inter text-gray-600 leading-relaxed font-light text-sm">
                      {feature.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Section Services avec animations avancées */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-[#ad5945] rounded-full blur-3xl"
            style={{ 
              animation: 'float 8s ease-in-out infinite',
              transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#d38074] rounded-full blur-3xl"
            style={{ 
              animation: 'float 10s ease-in-out infinite', 
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ca715b] rounded-full blur-3xl"
            style={{ 
              animation: 'float 12s ease-in-out infinite', 
              animationDelay: '4s',
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="services-header"
            data-animate
            className="text-center mb-20"
            style={{
              opacity: isVisible['services-header'] ? 1 : 0,
              transform: isVisible['services-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-3 rounded-full font-inter text-sm font-semibold uppercase tracking-widest mb-6 shimmer-effect glowing-badge">
              Notre Expertise
            </span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-8 tracking-tight text-glow">
              Des services de qualité
              <span className="block font-playfair italic text-5xl md:text-6xl text-[#d38074] mt-2">
                à Votre Disposition
              </span>
            </h2>
            <p className="font-inter text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Mariage, Anniversaire, Baby Shower, Baptême, Cérémonie 
professionnelle, nous mettons à votre disposition notre expertise 
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                data-animate
                className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-[#d38074]/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#ad5945]/30 cursor-pointer overflow-hidden"
                onClick={() => onNavigate('services')}
                onMouseEnter={() => setIsHovering(`service-${index}`)}
                onMouseLeave={() => setIsHovering(null)}
                style={{
                  opacity: isVisible[`service-${index}`] ? 1 : 0,
                  transform: isVisible[`service-${index}`] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <div className={`relative w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg overflow-hidden group-hover:shadow-xl group-hover:shadow-[#ad5945]/40`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ad5945]/20 to-[#d38074]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-12 h-12 relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                    style={{
                      animation: isHovering === `service-${index}` ? 'pulse 1s ease-in-out infinite' : 'wiggle 3s ease-in-out infinite'
                    }}
                  />
                </div>

                <h3 className="font-playfair text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ad5945] group-hover:to-[#d38074] transition-all tracking-tight">
                  {service.title}
                </h3>
                <p className="font-inter text-gray-300 leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1.1}
              centeredSlides={true}
              loop
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              className="pb-8"
            >
              {detailedServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 cursor-pointer overflow-hidden"
                    onClick={() => onNavigate('services')}
                  >
                    <div className={`relative w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-lg`}>
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-10 h-10"
                      />
                    </div>

                    <h3 className="font-playfair text-xl font-semibold text-white mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="font-inter text-gray-300 leading-relaxed mb-4 font-light text-sm">
                      {service.description}
                    </p>

                    <div className="flex items-center text-[#d38074] font-inter font-medium text-sm tracking-wide">
                      <span className="mr-2">En savoir plus</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div 
            id="services-cta"
            data-animate
            className="text-center mt-20"
            style={{
              opacity: isVisible['services-cta'] ? 1 : 0,
              transform: isVisible['services-cta'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.3s',
            }}
          >
            <button
              onClick={() => onNavigate('services')}
              className="group relative bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-12 py-6 rounded-full font-inter font-semibold text-lg hover:shadow-2xl hover:shadow-[#ad5945]/50 transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 inline-flex items-center gap-3 overflow-hidden magnetic-button"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-8px) scale(1.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d38074] to-[#ca715b] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative z-10 tracking-wide">Explorer tous nos services</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Section Portfolio avec les portfolios réels */}
      <section ref={portfolioSectionRef} className="py-24 bg-white" id="portfolio-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="portfolio-header"
            data-animate
            className="text-center mb-20"
            style={{
              opacity: isVisible['portfolio-header'] ? 1 : 0,
              transform: isVisible['portfolio-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Nos Réalisations
              <span className="block font-playfair italic text-4xl md:text-5xl text-[#ad5945] mt-3">
                d'Exception
              </span>
            </h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Découvrez nos réalisations les plus récentes, orchestrées avec élégance et expertise
            </p>
          </div>

          {loadingPortfolios ? (
            // Loading state
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ad5945] mb-4"></div>
              <p className="font-inter text-gray-600">Chargement des réalisations...</p>
            </div>
          ) : portfolios.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-playfair text-2xl text-gray-700 mb-2">Aucune réalisation pour le moment</h3>
              <p className="font-inter text-gray-500">Nos réalisations seront bientôt disponibles.</p>
            </div>
          ) : (
            <>
              {/* Desktop Carousel - CORRIGÉ : visible sur desktop */}
              <div className="hidden md:block relative px-12">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={3}
                  navigation={{
                    nextEl: '.portfolio-next',
                    prevEl: '.portfolio-prev',
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="pb-12"
                >
                  {portfolios.map((portfolio, index) => (
                    <SwiperSlide key={portfolio.id}>
                      <div
                        id={`portfolio-${index}`}
                        data-animate
                        className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
                        onClick={() => onNavigate('gallery')} {/* Redirection vers galerie */}
                        onMouseEnter={() => setIsHovering(`portfolio-${index}`)}
                        onMouseLeave={() => setIsHovering(null)}
                        style={{
                          opacity: isVisible[`portfolio-${index}`] ? 1 : 0,
                          transform: isVisible[`portfolio-${index}`] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                          transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                        }}
                      > 
                        <div className="relative overflow-hidden h-64">
                          <img
                            src={`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/${portfolio.image}`}
                            alt={portfolio.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            style={{
                              filter: isHovering === `portfolio-${index}` ? 'brightness(1.1)' : 'brightness(1)'
                            }}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=600';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="absolute top-4 left-4 z-20">
                            <span className="bg-white/90 backdrop-blur-sm text-[#ad5945] px-4 py-2 rounded-full text-sm font-semibold">
                              {categoryLabels[portfolio.category] || portfolio.category}
                            </span>
                          </div>

                          {portfolio.featured && (
                            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              À la une
                            </div>
                          )}

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-75">
                            <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl ${isHovering === `portfolio-${index}` ? 'animate-pulse' : ''}`}>
                              <ArrowRight className="w-8 h-8 text-[#ad5945]" />
                            </div>
                          </div>

                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ad5945] to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d38074] to-transparent"></div>
                          </div>
                        </div>
                        
                        <div className="p-8 bg-white relative z-10">
                          <h3 className="font-playfair text-xl font-semibold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ad5945] group-hover:to-[#d38074] transition-all tracking-tight">
                            {portfolio.title}
                          </h3>
                          <p className="font-inter text-gray-700 text-sm mb-4 font-light line-clamp-2">
                            {portfolio.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500 text-xs font-inter">
                              {new Date(portfolio.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center text-[#ad5945] font-inter font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 tracking-wide">
                              <span className="mr-2">Voir plus</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        <div 
                          className="absolute top-4 right-4 w-3 h-3 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ animation: isHovering === `portfolio-${index}` ? 'pulse 2s ease-in-out infinite' : 'none' }}
                        ></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation buttons for desktop */}
                <button className="portfolio-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                  <svg className="w-6 h-6 text-[#ad5945]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="portfolio-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                  <svg className="w-6 h-6 text-[#ad5945]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1.1}
                  centeredSlides={true}
                  loop
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  className="pb-8"
                >
                  {portfolios.map((portfolio) => (
                    <SwiperSlide key={portfolio.id}>
                      <div 
                        className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => onNavigate('gallery')} {/* Redirection vers galerie */}
                      >
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={`https://wispy-tabina-lacinafreelance-e4d8a9bf.koyeb.app/${portfolio.image}`}
                            alt={portfolio.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=600';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 text-[#ad5945] px-3 py-1 rounded-full text-xs font-semibold">
                              {categoryLabels[portfolio.category] || portfolio.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 bg-white">
                          <h3 className="font-playfair text-lg font-semibold mb-2 tracking-tight">
                            {portfolio.title}
                          </h3>
                          <p className="font-inter text-gray-600 text-sm font-light line-clamp-2 mb-3">
                            {portfolio.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-gray-500 text-xs font-inter">
                              {new Date(portfolio.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center text-[#ad5945] font-inter font-medium text-sm tracking-wide">
                              <span className="mr-2">Voir plus</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* CTA pour voir tous les portfolios - CORRIGÉ : redirection vers galerie */}
              <div className="text-center mt-12">
                <button
                  onClick={() => onNavigate('gallery')}
                  className="group relative bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-8 py-4 rounded-full font-inter font-semibold text-lg hover:shadow-2xl hover:shadow-[#ad5945]/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
                >
                  <span>Voir la galerie complète</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Boutique avec animations dynamiques */}
      <section 
        id="boutique-section" 
        data-animate
        className="py-24 bg-gradient-to-br from-[#ad5945] via-[#d38074] to-[#ca715b] text-white text-center relative overflow-hidden"
        style={{
          opacity: isVisible['boutique-section'] ? 1 : 0,
          transform: isVisible['boutique-section'] ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            style={{ 
              animation: 'float 6s ease-in-out infinite',
              transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
            }}
          ></div>
          <div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            style={{ 
              animation: 'float 8s ease-in-out infinite', 
              animationDelay: '2s',
              transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl"
            style={{ 
              animation: 'float 10s ease-in-out infinite', 
              animationDelay: '4s',
              transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8 shimmer-effect glowing-badge" style={{ animation: 'slideDown 0.8s ease-out' }}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
              alt="Sparkles"
              className="w-5 h-5"
              style={{ animation: 'rotate 3s linear infinite' }}
            />
            <span className="font-inter text-sm font-semibold uppercase tracking-widest">
              Parfums d'Exception
            </span>
          </div>

          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-8 tracking-tight text-glow" style={{ animation: 'slideDown 0.8s ease-out 0.1s both' }}>
            Découvrez notre
            <span className="block font-playfair italic text-5xl md:text-6xl text-white mt-2">
              collection
            </span>
          </h2>
          
          <p className="font-inter text-gray-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
            Des fragrances uniques pour sublimer vos moments les plus précieux
          </p>

          <button
            onClick={() => onNavigate('boutique')}
            className="group relative bg-white text-[#ad5945] px-12 py-6 rounded-full font-inter font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 inline-flex items-center gap-3 overflow-hidden magnetic-button"
            style={{ animation: 'slideUp 0.8s ease-out 0.4s both' }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-8px) scale(1.1)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
              alt="Sparkles"
              className="relative z-10 w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            />
            <span className="relative z-10 tracking-wide">Explorer la boutique</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
