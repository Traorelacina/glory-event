import { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Award, Sparkles, Utensils, ArrowRight, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Service } from '../types';
import Footer from '../components/Footer';

interface ServicesPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      id: 'mariages',
      title: 'Mariages de Luxe',
      description:
        'Transformez le plus beau jour de votre vie en un moment magique et inoubliable. Notre équipe d\'experts orchestre chaque détail avec passion et professionnalisme pour créer une célébration à votre image.',
      image:
        'https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://scontent.fabj5-2.fna.fbcdn.net/v/t39.30808-6/558455144_792108313615912_2798952595938159567_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEbj8oFgGOihZjy6ekWUxbGRAQhTiXs1TtEBCFOJezVO_XZbiEp0cqORgrCI-OE7UrLQAH4wazyFLT3wy3QC_lO&_nc_ohc=Z_Fy0zEt4hIQ7kNvwExVvoa&_nc_oc=AdlnnakOfeIGf13bBTsjWH1UarbU1GFrpwxi6CnRQ42-S4XEtUqFxmZzgFdnMsMxuT8&_nc_zt=23&_nc_ht=scontent.fabj5-2.fna&_nc_gid=zb49MJbgYbpW1GTwKxxu9w&oh=00_AfhS-Y5ctawbwd2CHypSMCGM7KVpmi6L_vGCcKoOrJXFNQ&oe=691D29E8',
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'corporate',
      title: 'Événements Corporate',
      description:
        'Donnez à vos événements professionnels une dimension exceptionnelle. Séminaires, lancements de produits, galas d\'entreprise : nous créons des expériences qui marquent les esprits et renforcent votre image de marque.',
      image:
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'receptions',
      title: 'Réceptions Privées',
      description:
        'Anniversaires, fiançailles, baptêmes ou simplement l\'envie de célébrer : nous créons des moments de partage authentiques dans des cadres enchanteurs. Chaque réception est unique, à votre image.',
      image:
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
    },
    {
      id: 'restauration',
      title: 'Service de Restauration',
      description:
        'Une expérience culinaire raffinée pour sublimer vos événements. Notre chef et son équipe créent des menus sur mesure, alliant créativité et excellence gustative pour émerveiller vos convives.',
      image:
        'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920',
      gallery: [
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/474700308_591402277019851_1044336786120214148_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGGvr4Aqe3p-kx9PqYBGuwIC5kFvK_EemoLmQW8r8R6aqA_Gqhqc-FKrZ6zVAh8Ha2uGbTYkdXKCgnFOjRtTOI0&_nc_ohc=ILiTpx-6M44Q7kNvwGIqFNM&_nc_oc=AdkkcW7O1HaAfsHOEdJFdSp2z1hBX8ekFSF15Iz9_VAZjAEWWD8gPUZ-XKiRvmbvJUg&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=w4xXWWeP4RIEPqQ61Nlk3Q&oh=00_AfjomZnrz3Xcmt5YIoJA6-K5Qy311Ta7_Zdof2Zuw&oe=691D2C10',
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/474662104_591402373686508_7233185737982302691_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFn2lHgMka55V2VkEJqupT_yBdKITuZ0_fIF0ohO5nT90k2a66y5LLWh8na-S27mNNLEx9VTMHw5ZT4y8YRYFcY&_nc_ohc=3UktVKNNxdYQ7kNvwFJXmd2&_nc_oc=AdnrRSX-olwaC9EFFW_5LwH8C_F2zho-ybBId96eMIoc_816TdfcmlUCqhp--9_Atf8&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=b-Jradn5In5YuMDGOL_vnA&oh=00_AfgSfUFK7WvXMSqDdOc2Kw_U6J7EzJPn45EW9elfEZYosA&oe=691D2A40',
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/474720015_591402087019870_8831783553154247261_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG_Z4MzetQ_XG6antf3x8Ajac2fsNUTxqxpzZ-w1RPGrGqUO80f9naCCeeP4yaKO46nuUu0K-Xm8QEvUkn5Afd-&_nc_ohc=jpxOYXDexOkQ7kNvwG78bxZ&_nc_oc=Adkk6pZhZ6ZVN3AXWB9uWjnzKRkUIthB8WWEe3QGKeXbF9AknvmNgFvgl_eT9QS2430&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=t1753w9WGOg8GScwbE8AWQ&oh=00_AfgRA94aHVIm5hMtqTO7yIoJA6-K5Qy311Ta7_Zdof2Zuw&oe=691D430E',
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/473619720_588177324009013_5269678523535177740_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFxoeSxMGf5Wyhe8TTwaKlOEUNuTGzDZTkRQ25MbMNlOTrSCN5YEhp2PY-ejRlmcqEJ45dlfxSEyajCtorIeNXK&_nc_ohc=I7Na-_8jJXgQ7kNvwHRavqs&_nc_oc=AdnHgC4XPpdCWOg6bX5aRM6XZGOYscsVct-VKwsrSyfoLO6Tc_i_CcQTjQY9mFCA0yY&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=-ZB6p_4bm12M8jBk-IlHow&oh=00_AfiuyGd1syxerR__o_nbPIN52kKl14Pcb54R0lPL0LP6xA&oe=691D35F0',
      ],
    },
    {
      id: 'decoration',
      title: 'Décoration sur Mesure',
      description:
        'L\'art de créer des ambiances qui racontent votre histoire. Notre équipe de décorateurs talentueux conçoit des univers visuels époustouflants, du concept initial jusqu\'à la réalisation finale.',
      image:
        'https://scontent.fabj5-2.fna.fbcdn.net/v/t51.82787-15/561846531_17984930459906860_3449748711829899152_n.jpg?stp=dst-jpegr_tt6&_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE-97ASt1R-tFyGboBYyqlhyjwfjU_pK1bKPB-NT-krVp5qtP4UMyKfIREn082A8ERfuTeW_dRomWFJnLgjZTbg&_nc_ohc=Z-lqF8E5lhUQ7kNvwFBAR6T&_nc_oc=AdkB23WdhQOW5MGSxL5_4uKpCPwcQk3LETrbi_xl9CTh0uZe1knyZhBw04OicdgGmR8&_nc_zt=23&se=-1&_nc_ht=scontent.fabj5-2.fna&_nc_gid=Ty4fuSzn5IErOcPanImtdw&oh=00_AfhwzHgIUCI7JFcF5CJobh5-PkDc9QIae-PNsB3cffUa8g&oe=691D2000',
      gallery: [
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/565690055_802299149263495_5241726712948988641_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHqmn6Mg1k5KHHjQA3xnpryVCwmStiPL3lULCZK2I8veVW_UcozuXcd_j2_KJ_1_z_33kZc4KKGvI5t6CyYmHQX&_nc_ohc=O4GigUzmJAMQ7kNvwHduM0T&_nc_oc=Adl38_QGpUNm2m2Mb7rCOhCRfkye_iExayKDz77M4NSzp15Nvo0G44F8yWFudDYpqMc&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=a5OAA6jR5ZWTzBbCPu1CxQ&oh=00_AfiHACLVmZcLTsu-uutj86fTsBs-05LvN8R3HRFlqouLSg&oe=691D1F72',
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/565285021_802303479263062_6137982315505036741_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeGV-zPsgd99GV0TBQ5DQibIzVS2pJ0_cr_NVLaknT9yv-2GHqNH2eRf4VkdZXQ8fh0is6IyP6sAtyQfWJQ3some&_nc_ohc=6to8fId3D3QQ7kNvwHinux7&_nc_oc=Adn78Eof7W1KrNXzTtp3Ojv2pjo8YIobqWqYLud3eqErdumlHdoYpnTB0mIH_HLyasA&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=wbb9YDz_doqlKr9kiNLNeQ&oh=00_AfjFueKa8eny4Ddx_OpXk4vqoHC59dULkFPwtkMJu2cp5w&oe=691D340E',
        'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://scontent.fabj5-1.fna.fbcdn.net/v/t39.30808-6/565652070_802304075929669_8307697976189990695_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEwTH7sVnE7JVywizNqFqkBiLPl-3e7kWeIs-X7d7uRZ7ep5o4YGTQZZGsSBOL_C8IfFEC5qbFav91QLwpEkzNv&_nc_ohc=cgIrBnSqc8YQ7kNvwG_fTTj&_nc_oc=Adm0MY4F6V90onyEPttHk9ejT4-Ph2Xry55Gf5i0bOD3RWoOTo3ocvNUmhmaOqgddEU&_nc_zt=23&_nc_ht=scontent.fabj5-1.fna&_nc_gid=1IEB4VEBvAsjvKN8IGR0jw&oh=00_AfgEcPvzqKkLl14Pcb54R0lPL0LP6xA&oe=691D33C8',
      ],
    },
  ];

  const icons = {
    mariages: Calendar,
    corporate: Users,
    receptions: Award,
    restauration: Utensils,
    decoration: Sparkles,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsHeaderVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <style>{`
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: floatUp 3s ease-in-out infinite;
        }

        .service-card {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover {
          transform: translateY(-8px);
        }

        .icon-box {
          background: linear-gradient(135deg, #ad5945 0%, #d38074 100%);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover .icon-box {
          transform: rotate(12deg) scale(1.1);
          box-shadow: 0 20px 40px rgba(173, 89, 69, 0.3);
        }

        .gallery-expand {
          animation: fadeInUp 0.6s ease-out;
        }

        .button-hover {
          position: relative;
          overflow: hidden;
        }

        .button-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s ease;
        }

        .button-hover:hover::before {
          left: 100%;
        }

        .image-overlay {
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card:hover .image-overlay {
          background: linear-gradient(135deg, rgba(173, 89, 69, 0.2) 0%, rgba(211, 128, 116, 0.2) 100%);
        }

        .blur-in {
          backdrop-filter: blur(0px);
          transition: backdrop-filter 0.3s ease;
        }

        .blur-in.blurred {
          backdrop-filter: blur(4px);
        }

        .stagger-item {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .service-image {
          position: relative;
          overflow: hidden;
        }

        .service-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: 2;
        }

        .service-card:hover .service-image::before {
          opacity: 1;
        }

        .chevron-rotate {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .chevron-rotate.rotated {
          transform: rotate(180deg);
        }

        .header-parallax {
          transform: translateY(${scrollY * 0.5}px);
          opacity: ${Math.max(0, 1 - scrollY / 300)};
        }

        .text-gradient {
          background: linear-gradient(135deg, #ad5945 0%, #d38074 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="pt-32 pb-20 overflow-hidden" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={headerRef}
            className="header-parallax text-center mb-20"
          >
            <div className="stagger-item" style={{ animationDelay: '0s' }}>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-gradient mb-8 leading-tight">
                Nos Services
              </h1>
            </div>
            <div className="stagger-item" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Des prestations d'excellence pour transformer vos événements en expériences mémorables
              </p>
            </div>
            <div
              className="stagger-item mt-8 flex justify-center gap-2"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ad5945] to-[#d38074]" style={{ animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
            </div>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = icons[service.id as keyof typeof icons];
              const isExpanded = selectedService === service.id;

              return (
                <div
                  key={service.id}
                  className="stagger-item service-card"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-3xl transition-shadow duration-500 border border-slate-100">
                    <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                      <div className={`relative h-96 md:h-auto service-image ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 image-overlay bg-gradient-to-t from-black/40 to-transparent"></div>
                      </div>

                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="w-16 h-16 icon-box rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                          {service.title}
                        </h2>

                        <p className="text-slate-600 text-lg leading-relaxed mb-8 line-clamp-3">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                          <button
                            onClick={() => setSelectedService(isExpanded ? null : service.id)}
                            className={`button-hover relative px-8 py-3 rounded-full font-semibold transition-all duration-300 border border-slate-200 flex items-center gap-2 ${
                              isExpanded
                                ? 'bg-slate-100 text-slate-900 border-slate-300'
                                : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400'
                            }`}
                          >
                            {isExpanded ? 'Masquer la galerie' : 'Voir la galerie'}
                            <ChevronDown className={`chevron-rotate w-4 h-4 ${isExpanded ? 'rotated' : ''}`} />
                          </button>
                          <button
                            onClick={() => onNavigate('contact', service.id)}
                            className="button-hover relative px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#ad5945] to-[#d38074] hover:shadow-2xl hover:shadow-[#ad5945]/30 transition-all duration-300 flex items-center gap-2 group"
                          >
                            Demander un devis
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="gallery-expand p-8 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
                        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-8">
                          Galerie
                        </h3>
                        <Swiper
                          modules={[Navigation, Pagination]}
                          navigation={{
                            nextEl: `.swiper-button-next-${service.id}`,
                            prevEl: `.swiper-button-prev-${service.id}`,
                          }}
                          pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            el: `.swiper-pagination-${service.id}`
                          }}
                          spaceBetween={20}
                          slidesPerView={1}
                          breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                          }}
                          className="swiper-custom"
                        >
                          {service.gallery.map((image, idx) => (
                            <SwiperSlide key={idx}>
                              <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                                <img
                                  src={image}
                                  alt={`${service.title} ${idx + 1}`}
                                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-6 h-6 text-[#ad5945]" />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <div className="flex justify-center gap-4 mt-6">
                          <button className={`swiper-button-prev-${service.id} w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ad5945] hover:to-[#d38074] hover:border-0 hover:text-white transition-all shadow-md hover:shadow-lg`}>
                            <ArrowRight className="w-5 h-5 rotate-180" />
                          </button>
                          <div className={`swiper-pagination-${service.id} flex justify-center gap-2`}></div>
                          <button className={`swiper-button-next-${service.id} w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#ad5945] hover:to-[#d38074] hover:border-0 hover:text-white transition-all shadow-md hover:shadow-lg`}>
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
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}