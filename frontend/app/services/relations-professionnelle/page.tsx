'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function ReunionProfessionnellePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const corporateServices = [
    {
      icon: '🎯',
      title: 'Séminaires & Conférences',
      description: 'Organisation complète d\'événements professionnels d\'envergure',
      color: 'from-blue-500 to-cyan-500',
      features: ['Sélection de lieux prestigieux', 'Équipement audiovisuel 4K', 'Interprétation simultanée', 'Streaming professionnel'],
      image: '/images/services/seminaire.jpg',
    },
    {
      icon: '🤝',
      title: 'Team Building Excellence',
      description: 'Renforcez la cohésion de vos équipes avec des expériences mémorables',
      color: 'from-purple-500 to-pink-500',
      features: ['Activités personnalisées', 'Challenges créatifs', 'Coaching d\'équipe', 'Débriefing analytique'],
      image: '/images/services/teambuilding.jpg',
    },
    {
      icon: '🚀',
      title: 'Lancements de Produits',
      description: 'Événements spectaculaires pour marquer les esprits',
      color: 'from-orange-500 to-red-500',
      features: ['Concept créatif unique', 'Expérience immersive', 'Relations presse', 'Couverture média 360°'],
      image: '/images/services/lancement.jpg',
    },
    {
      icon: '🎊',
      title: 'Soirées Corporate',
      description: 'Célébrations d\'entreprise inoubliables',
      color: 'from-green-500 to-emerald-500',
      features: ['Galas de prestige', 'Cocktails VIP', 'Networking premium', 'Entertainment de classe mondiale'],
      image: '/images/services/gala-corporate.jpg',
    },
  ];

  const packages = [
    {
      name: 'Business Essential',
      price: 'À partir de 2M FCFA',
      description: 'Pour les réunions et événements de taille moyenne',
      features: [
        'Salle équipée (50-100 pers)',
        'Sonorisation professionnelle',
        'Vidéo projecteur HD',
        'Coffee break & déjeuner',
        'Support technique',
        'Coordination jour J',
      ],
      popular: false,
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      name: 'Corporate Premium',
      price: 'À partir de 5M FCFA',
      description: 'La solution complète pour vos événements d\'envergure',
      features: [
        'Tout Business Essential +',
        'Lieu premium (100-300 pers)',
        'Équipement audiovisuel 4K',
        'Décoration sur-mesure',
        'Animation & entertainment',
        'Photographie professionnelle',
        'Service traiteur premium',
        'Guest management',
      ],
      popular: true,
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      name: 'Executive Prestige',
      price: 'Sur devis personnalisé',
      description: 'L\'excellence absolue pour vos événements stratégiques',
      features: [
        'Tout Corporate Premium +',
        'Hôtel 5 étoiles & château',
        'Équipement broadcast pro',
        'Scénographie immersive',
        'Service VIP personnalisé',
        'Sécurité & protocole',
        'Conciergerie 24/7',
        'Hélicoptère & transport VIP',
      ],
      popular: false,
      gradient: 'from-amber-500/20 to-yellow-500/20',
    },
  ];

  const stats = [
    { number: '300+', label: 'Événements Corporate', icon: '📊' },
    { number: '50+', label: 'Entreprises Partenaires', icon: '🏢' },
    { number: '15K+', label: 'Participants Accueillis', icon: '👥' },
    { number: '99%', label: 'Taux de Satisfaction', icon: '⭐' },
  ];

  const industries = [
    { name: 'Finance & Banque', icon: '🏦', color: 'from-green-400 to-emerald-600' },
    { name: 'Technologie', icon: '💻', color: 'from-blue-400 to-cyan-600' },
    { name: 'Pharmaceutique', icon: '⚕️', color: 'from-red-400 to-pink-600' },
    { name: 'Télécoms', icon: '📱', color: 'from-purple-400 to-indigo-600' },
    { name: 'Automobile', icon: '🚗', color: 'from-gray-400 to-slate-600' },
    { name: 'Immobilier', icon: '🏢', color: 'from-orange-400 to-amber-600' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.4}px)`,
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Premium */}
      <section className={styles.hero}>
        <div className={styles.heroParallax} style={parallaxStyle}>
          <div className={styles.heroBackground} />
          <div className={styles.heroGrid} />
        </div>

        <div className={styles.heroGlowTop} />
        <div className={styles.heroGlowBottom} />

        <div className="container-custom">
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>
              <span className={styles.heroLabelIcon}>🏢</span>
              <span className={styles.heroLabelText}>Corporate Events</span>
              <div className={styles.heroLabelShimmer} />
            </div>

            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>Événements</span>
              <span className={styles.heroTitleLine}>
                <span className={styles.heroTitleGradient}>Corporate</span>
                <span className={styles.heroTitleAccent}> d'Excellence</span>
              </span>
            </h1>

            <p className={styles.heroSubtitle}>
              Transformez vos réunions professionnelles en expériences stratégiques 
              qui renforcent votre image de marque et fédèrent vos équipes.
            </p>

            <div className={styles.heroActions}>
              <Link href="/contact">
                <Button variant="primary" size="lg" className={styles.heroBtn}>
                  <span>Planifier Mon Événement</span>
                  <svg className={styles.heroBtnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Nos Réalisations
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="var(--color-primary)"/>
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar} id="stats" data-animate>
        <div className="container-custom">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${styles.statCard} ${isVisible.stats ? styles.statVisible : ''}`}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statGlow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className={styles.servicesSection} id="services" data-animate>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nos Services</span>
            <h2 className={styles.sectionTitle}>
              Solutions <span className={styles.titleGradient}>Corporate</span> Complètes
            </h2>
            <p className={styles.sectionSubtitle}>
              De la conception à l'exécution, nous orchestrons chaque détail
            </p>
          </div>

          <div className={styles.servicesCarousel}>
            <div className={styles.servicesTrack}>
              {corporateServices.map((service, index) => (
                <div
                  key={index}
                  className={`${styles.serviceCard} ${activeService === index ? styles.serviceActive : ''}`}
                  onClick={() => setActiveService(index)}
                >
                  <div className={styles.serviceImage} style={{ backgroundImage: `url(${service.image})` }} />
                  <div className={styles.serviceOverlay} />
                  
                  <div className={styles.serviceContent}>
                    <div className={`${styles.serviceIconLarge} bg-gradient-to-br ${service.color}`}>
                      {service.icon}
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    
                    <div className={styles.serviceFeatures}>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className={styles.serviceFeature}>
                          <svg className={styles.serviceFeatureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.servicesNav}>
            {corporateServices.map((_, index) => (
              <button
                key={index}
                className={`${styles.servicesNavDot} ${activeService === index ? styles.active : ''}`}
                onClick={() => setActiveService(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Pricing */}
      <section className={styles.packagesSection} id="packages" data-animate>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nos Formules</span>
            <h2 className={styles.sectionTitle}>
              Choisissez Votre <span className={styles.titleGradient}>Excellence</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Des solutions adaptées à chaque ambition
            </p>
          </div>

          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`${styles.packageCard} ${pkg.popular ? styles.packagePopular : ''} ${
                  isVisible.packages ? styles.packageVisible : ''
                }`}
                style={{ '--index': index } as React.CSSProperties}
                onClick={() => setSelectedPackage(index)}
              >
                {pkg.popular && (
                  <div className={styles.packageBadge}>
                    <svg className={styles.packageBadgeIcon} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Populaire</span>
                  </div>
                )}

                <div className={`${styles.packageGradient} bg-gradient-to-br ${pkg.gradient}`} />

                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <div className={styles.packagePrice}>{pkg.price}</div>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                </div>

                <ul className={styles.packageFeatures}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={styles.packageFeature}>
                      <svg className={styles.packageFeatureIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                    className={styles.packageBtn}
                  >
                    Choisir cette formule
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className={styles.industriesSection} id="industries" data-animate>
        <div className="container-custom">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nos Clients</span>
            <h2 className={styles.sectionTitle}>
              Une Expertise <span className={styles.titleGradient}>Transversale</span>
            </h2>
          </div>

          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`${styles.industryCard} ${isVisible.industries ? styles.industryVisible : ''}`}
                style={{ '--index': index } as React.CSSProperties}
              >
                <div className={`${styles.industryIcon} bg-gradient-to-br ${industry.color}`}>
                  {industry.icon}
                </div>
                <div className={styles.industryName}>{industry.name}</div>
                <div className={styles.industryGlow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container-custom">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlowOrb} />
            
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Prêt à Élever Vos Événements Corporate ?
              </h2>
              <p className={styles.ctaDescription}>
                Discutons de votre prochain événement et créons ensemble 
                une expérience qui marquera durablement vos équipes et partenaires.
              </p>
              
              <div className={styles.ctaActions}>
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Demander un Devis Personnalisé
                  </Button>
                </Link>
                <a href="tel:+225XXXXXXXXX" className={styles.ctaContact}>
                  <div className={styles.ctaContactIcon}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.ctaContactLabel}>Appelez-nous</div>
                    <div className={styles.ctaContactNumber}>+225 XX XX XX XX XX</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}