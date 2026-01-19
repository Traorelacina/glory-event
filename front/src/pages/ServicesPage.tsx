import { useState, useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import type { Service } from "../types"
import Footer from "../components/Footer"
import decorationImage from '../../images/event1.jpg';

interface ServicesPageProps {
  onNavigate: (page: string, serviceId?: string) => void
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  const services: Service[] = [
    {
      id: "wedding-planner",
      title: "Wedding Planner",
      description: "Transformez le plus beau jour de votre vie en un moment magique et inoubliable. Nos wedding planners orchestrent chaque détail avec passion et professionnalisme pour créer une célébration à votre image, de la conception à la réalisation.",
      image: "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920",
      icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
    },
    {
      id: "decoration",
      title: "Décoration sur Mesure",
      description: "L'art de créer des ambiances qui racontent votre histoire. Notre équipe de décorateurs talentueux conçoit des univers visuels époustouflants, du concept initial jusqu'à la réalisation finale, pour tous types d'événements.",
      image:  decorationImage,
      icon: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
    },
    {
      id: "restauration",
      title: "Cuisine et Restauration",
      description: "Une expérience culinaire raffinée pour sublimer vos événements. Notre chef et son équipe créent des menus sur mesure, alliant créativité et excellence gustative pour émerveiller vos convives avec des saveurs inoubliables.",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920",
      icon: "https://cdn-icons-png.flaticon.com/512/2738/2738730.png",
    },
    {
      id: "evenementiel",
      title: "Événementiel",
      description: "Donnez vie à vos événements professionnels et privés avec notre expertise complète. Séminaires, lancements de produits, galas ou conférences, nous créons des expériences qui marquent les esprits et renforcent votre message.",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920",
      icon: "https://cdn-icons-png.flaticon.com/512/1067/1067566.png",
    },
    {
      id: "location-ustensiles",
      title: "Location d'Ustensiles",
      description: "Un service complet de location d'ustensiles et d'équipements pour vos événements. De la vaisselle fine aux équipements de cuisine professionnels, nous vous proposons tout le nécessaire pour réussir votre réception.",
      image: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1920",
      icon: "https://cdn-icons-png.flaticon.com/512/3502/3502601.png",
    },
    {
      id: "location-mobilier",
      title: "Location de Tables et Chaises",
      description: "Un large choix de mobilier élégant pour aménager vos espaces événementiels. Tables rondes, rectangulaires, chaises design ou classiques, nous adaptons le mobilier à votre thématique et au nombre de vos invités.",
      image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=1920",
      icon: "https://cdn-icons-png.flaticon.com/512/2917/2917242.png",
    },
  ]

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
  }, []);

  return (
    <div className="min-h-screen font-playfair text-[#111827] overflow-x-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }

        @keyframes morphBlob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
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

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(173, 89, 69, 0.3), inset 0 0 20px rgba(173, 89, 69, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(211, 128, 116, 0.5), inset 0 0 20px rgba(173, 89, 69, 0.2);
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

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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

        .glowing-badge {
          animation: blinkGlow 3s ease-in-out infinite;
        }

        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

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

        .gallery-image-wrapper {
          position: relative;
          overflow: hidden;
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
          animation: morphBlob 8s ease-in-out infinite, floatUp 6s ease-in-out infinite;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 10%;
          left: 50%;
          animation-delay: 4s;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="pt-32 pb-20 relative" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <div style={{ animation: 'slideDown 0.8s ease-out' }}>
              <span className="inline-block bg-gradient-to-r from-[#ad5945] to-[#d38074] text-white px-6 py-3 rounded-full font-raleway text-sm font-semibold uppercase tracking-widest mb-6 shimmer-effect glowing-badge">
                Nos Services
              </span>
            </div>

            <h1 
              className="font-playfair text-5xl md:text-7xl font-bold text-[#111827] mb-6 text-glow leading-tight"
              style={{ animation: 'slideDown 0.8s ease-out 0.1s both' }}
            >
              Services d'Excellence
            </h1>

            <p 
              className="font-lora text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8 italic"
              style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}
            >
              Des prestations d'excellence pour transformer vos événements en expériences mémorables et inoubliables
            </p>

            <div 
              className="flex justify-center gap-2"
              style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
            </div>
          </div>

          <div className="space-y-16 relative z-10">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className="service-card"
                style={{
                  opacity: isVisible[`service-${service.id}`] ? 1 : 0,
                  transform: isVisible[`service-${service.id}`] ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-slate-100 group">
                  <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                    <div 
                      className={`relative h-72 md:h-96 service-image ${index % 2 === 1 ? "md:col-start-2" : ""} overflow-hidden`}
                      onMouseEnter={() => setIsHovering(`image-${service.id}`)}
                      onMouseLeave={() => setIsHovering(null)}
                    >
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        style={{
                          transform: isHovering === `image-${service.id}` ? `scale(1.15) rotate(2deg)` : 'scale(1) rotate(0deg)'
                        }}
                      />
                      <div className="absolute inset-0 image-overlay bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="w-16 h-16 icon-box rounded-2xl flex items-center justify-center mb-6 border border-slate-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                        <img 
                          src={service.icon || "/placeholder.svg"} 
                          alt={service.title} 
                          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                          style={{ animation: 'wiggle 3s ease-in-out infinite' }}
                        />
                      </div>

                      <h2 className="font-dm-serif text-3xl md:text-4xl font-normal text-slate-900 mb-4 leading-tight tracking-tight group-hover:text-[#ad5945] transition-colors duration-300">
                        {service.title}
                      </h2>

                      <p className="font-lora text-slate-600 text-base md:text-lg leading-relaxed mb-6 font-light italic">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={() => onNavigate("contact")}
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
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section finale */}
          <div 
            id="services-cta"
            data-animate
            className="text-center mt-24"
            style={{
              opacity: isVisible['services-cta'] ? 1 : 0,
              transform: isVisible['services-cta'] ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(40px)',
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
                  Prêt à créer votre événement ?
                </h3>
                <p className="font-lora text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light leading-relaxed italic">
                  Notre équipe d'experts est à votre disposition pour concrétiser votre vision et créer une expérience exceptionnelle
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
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  )
}
