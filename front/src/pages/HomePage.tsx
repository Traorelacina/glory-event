'use client';

import { ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Footer from '../components/Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ events: 0, years: 0, satisfaction: 0, partners: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Icônes images pour les services principaux
  const services = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png', // Mariage
      title: 'Mariages de Luxe',
      description: 'Des cérémonies inoubliables orchestrées avec élégance et raffinement',
      color: 'from-[#ad5945] to-[#d38074]',
      img: 'https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png', // Corporate
      title: 'Événements Corporate',
      description: "Solutions professionnelles pour vos séminaires et réceptions d'entreprise",
      color: 'from-[#ca715b] to-[#ad5945]',
      img: 'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3290/3290425.png', // Réception
      title: 'Réceptions Privées',
      description: 'Créez des moments mémorables pour vos célébrations personnelles',
      color: 'from-[#d38074] to-[#ad5945]',
      img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png', // Décoration
      title: 'Décoration sur Mesure',
      description: 'Ambiances uniques adaptées à votre vision et votre style',
      color: 'from-[#ad5945] to-[#ca715b]',
      img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
  ];

  // Icônes images pour les services détaillés
  const detailedServices = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/9295/9295413.png', // Cœur mariage
      title: 'Organisation de Mariage',
      description: 'Wedding planning complet pour votre jour parfait',
      color: 'from-[#ad5945] to-[#d38074]',
      slug: 'mariage'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3594/3594296.png', // Réunion
      title: 'Réunion Professionnelle',
      description: 'Séminaires et conférences de haut niveau',
      color: 'from-[#ca715b] to-[#d38074]',
      slug: 'reunion-professionnelle'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png', // Décoration
      title: 'Décoration',
      description: 'Design et mise en scène sur mesure',
      color: 'from-[#ad5945] to-[#ca715b]',
      slug: 'decoration'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png', // Restauration
      title: 'Restauration',
      description: 'Cuisine africaine, européenne et américaine',
      color: 'from-[#d38074] to-[#ad5945]',
      slug: 'restauration'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/3290/3290471.png', // Événementiel
      title: 'Événementiel',
      description: 'Organisation complète de tous types d\'événements',
      color: 'from-[#ca715b] to-[#ad5945]',
      slug: 'evenementiel'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/619/619032.png', // Maison réception
      title: 'Réceptions Privées',
      description: 'Anniversaires, baptêmes et célébrations familiales',
      color: 'from-[#d38074] to-[#ca715b]',
      slug: 'reception'
    },
  ];

  // Icônes images pour les features
  const features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png', // Check personnalisé
      title: 'Service Personnalisé',
      description: 'Chaque événement est unique et mérite une attention particulière'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2088/2088617.png', // Horloge délais
      title: 'Respect des Délais',
      description: 'Livraison dans les temps avec une qualité constante'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2589/2583977.png', // Étoile excellence
      title: 'Excellence Garantie',
      description: 'Des prestations haut de gamme pour des résultats exceptionnels'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933245.png', // Innovation
      title: 'Innovation Créative',
      description: 'Des concepts novateurs qui marquent les esprits'
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      text: 'Une équipe exceptionnelle qui a transformé notre mariage en un conte de fées. Chaque détail était parfait.',
    },
    {
      id: '2',
      name: 'Jean Dupont',
      text: 'Professionnalisme et créativité au rendez-vous. Notre événement corporate a été un véritable succès.',
    },
    {
      id: '3',
      name: 'Marie Laurent',
      text: 'Des prestations haut de gamme et une écoute attentive. Je recommande sans hésitation!',
    },
  ];

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
    <div className="min-h-screen font-sans text-[#111827] overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Votre contenu hero existant */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-[#ad5945]/20 to-black/50"></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ad5945]/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '4s' }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d38074]/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '6s', animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ca715b]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '5s', animationDelay: '1s' }}
          ></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto text-white">
          <p 
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed"
            style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
          >
            Transformez vos visions en <span className="text-[#ca715b] font-semibold">moments magiques</span>. 
            De l'organisation d'événements premium à notre collection exclusive de parfums.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}
          >
            <button
              onClick={() => onNavigate('contact')}
              className="group relative bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:shadow-[#ad5945]/50 flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d38074] to-[#ca715b] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative z-10">Commencer votre projet</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="group relative bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2983/2983788.png" 
                alt="Camera" 
                className="relative z-10 w-5 h-5 group-hover:rotate-12 transition-transform filter invert"
              />
              <span className="relative z-10">Voir nos réalisations</span>
            </button>
          </div>
        </div>

        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform">
            <span className="text-white text-sm font-medium">Découvrir</span>
            <ArrowRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="features-header"
            data-animate
            className="text-center mb-16"
            style={{
              opacity: isVisible['features-header'] ? 1 : 0,
              transform: isVisible['features-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Notre Engagement
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              L'Excellence dans Chaque Détail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous combinons créativité, professionnalisme et expertise pour donner vie à vos projets les plus ambitieux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                data-animate
                className="text-center group p-6 rounded-2xl hover:bg-gradient-to-br hover:from-[#ad5945]/10 hover:to-[#d38074]/10 transition-all duration-300 cursor-default"
                style={{
                  opacity: isVisible[`feature-${index}`] ? 1 : 0,
                  transform: isVisible[`feature-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#ad5945] to-[#d38074] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-8 h-8 filter invert"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-[#ad5945] rounded-full blur-3xl"
            style={{ animation: 'float 8s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#d38074] rounded-full blur-3xl"
            style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ca715b] rounded-full blur-3xl"
            style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '4s' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            id="services-header"
            data-animate
            className="text-center mb-16"
            style={{
              opacity: isVisible['services-header'] ? 1 : 0,
              transform: isVisible['services-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Notre Expertise
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Services Premium à Votre Disposition
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              De l'organisation de mariages de rêve aux événements corporate sophistiqués, nous maîtrisons tous les aspects de l'événementiel de luxe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                id={`service-${index}`}
                data-animate
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-[#d38074]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ad5945]/20 cursor-pointer overflow-hidden"
                onClick={() => onNavigate('services')}
                style={{
                  opacity: isVisible[`service-${index}`] ? 1 : 0,
                  transform: isVisible[`service-${index}`] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-8 h-8 filter invert"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ad5945] group-hover:to-[#d38074] transition-all">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex items-center text-[#d38074] font-medium text-sm group-hover:text-[#ca715b] transition-colors">
                  <span className="mr-2">En savoir plus</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>

                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          <div 
            id="services-cta"
            data-animate
            className="text-center mt-16"
            style={{
              opacity: isVisible['services-cta'] ? 1 : 0,
              transform: isVisible['services-cta'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out 0.3s',
            }}
          >
            <button
              onClick={() => onNavigate('services')}
              className="group relative bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#ad5945]/50 transform hover:-translate-y-1 transition-all inline-flex items-center gap-3 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#d38074] to-[#ca715b] translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="relative z-10">Explorer tous nos services</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="portfolio-header"
            data-animate
            className="text-center mb-16"
            style={{
              opacity: isVisible['portfolio-header'] ? 1 : 0,
              transform: isVisible['portfolio-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des prestations sur mesure pour faire de votre événement un moment d'exception
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                id={`portfolio-${index}`}
                data-animate
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                onClick={() => onNavigate('services')}
                style={{
                  opacity: isVisible[`portfolio-${index}`] ? 1 : 0,
                  transform: isVisible[`portfolio-${index}`] ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-100 scale-75">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-2xl`}>
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-8 h-8 filter invert"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white relative z-10">
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#ad5945] group-hover:to-[#d38074] transition-all">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">{service.description}</p>
                  
                  <div className="flex items-center text-[#ad5945] font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                    <span className="mr-1">Découvrir</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections témoignages et boutique restent identiques */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="testimonials-header"
            data-animate
            className="text-center mb-16"
            style={{
              opacity: isVisible['testimonials-header'] ? 1 : 0,
              transform: isVisible['testimonials-header'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease-out',
            }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Témoignages de nos Clients
            </h2>
            <p className="text-xl text-gray-600">Leur satisfaction est notre plus belle récompense</p>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={windowWidth < 768 ? 1 : 3}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col group hover:-translate-y-2 border border-gray-100">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <img 
                        key={i}
                        src="https://cdn-icons-png.flaticon.com/512/2589/2583977.png"
                        alt="Star"
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ad5945] to-[#d38074] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#111827]">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">Client vérifié</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-green-600">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                      alt="Verified"
                      className="w-4 h-4"
                    />
                    <span>Témoignage vérifié</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section 
        id="boutique-section"
        data-animate
        className="py-20 bg-gradient-to-br from-[#ad5945] via-[#d38074] to-[#ca715b] text-white text-center relative overflow-hidden"
        style={{
          opacity: isVisible['boutique-section'] ? 1 : 0,
          transform: isVisible['boutique-section'] ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          ></div>
          <div 
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '2s' }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
              alt="Sparkles"
              className="w-4 h-4 filter invert"
            />
            <span className="text-sm font-semibold uppercase tracking-wider">Collection Exclusive</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Découvrez notre Collection de Parfums
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Des fragrances exclusives pour sublimer vos événements et créer une ambiance unique
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="Check"
                className="w-5 h-5 filter invert"
              />
              <span>Fragrances Premium</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="Check"
                className="w-5 h-5 filter invert"
              />
              <span>Fabrication Artisanale</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                alt="Check"
                className="w-5 h-5 filter invert"
              />
              <span>Livraison Rapide</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('boutique')}
            className="group relative bg-white text-[#ad5945] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2933/2933245.png"
              alt="Sparkles"
              className="relative z-10 w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            />
            <span className="relative z-10">Explorer la boutique</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      <style jsx>{`
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
      `}</style>
    </div>
  );
}