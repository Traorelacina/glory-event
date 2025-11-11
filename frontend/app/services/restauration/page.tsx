'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import styles from './restauration.module.css';

export default function RestaurationPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer pour les animations au scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    // Observer tous les éléments avec animation
    const elements = document.querySelectorAll(
      `.${styles.cuisineRow}, .${styles.serviceCard}, .${styles.formatCard}, .${styles.processCard}`
    );

    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    // Animation de "vapeur" pour les icônes de nourriture
    const foodIcons = document.querySelectorAll(`.${styles.serviceIcon}`);
    foodIcons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.2}s`;
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const cuisines = [
    {
      type: 'Cuisine Africaine',
      icon: '🌍',
      description: "L'authenticité et les saveurs traditionnelles d'Afrique",
      image: '/images/services/cuisine-africaine.jpg',
      specialties: [
        'Attiéké Poisson Braisé',
        'Alloco Plantain',
        'Kedjenou de Poulet',
        'Riz Sauce Graine',
        'Poulet DG',
        'Fufu et Sauce Graine',
        'Mafé Traditionnel',
        'Thiéboudienne',
      ],
      features: [
        'Ingrédients frais et locaux',
        'Recettes authentiques',
        'Présentation élégante',
        'Options végétariennes',
      ],
    },
    {
      type: 'Cuisine Européenne',
      icon: '🇪🇺',
      description: "L'élégance et le raffinement de la gastronomie européenne",
      image: '/images/services/cuisine-europeenne.jpg',
      specialties: [
        'Bœuf Wellington',
        'Risotto aux Champignons',
        "Saumon à l'Oseille",
        'Coq au Vin',
        'Ratatouille Niçoise',
        'Osso Buco',
        'Paella Royale',
        'Bouillabaisse',
      ],
      features: [
        'Techniques culinaires françaises',
        'Produits importés premium',
        'Présentation gastronomique',
        'Service à la française',
      ],
    },
    {
      type: 'Cuisine Américaine',
      icon: '🇺🇸',
      description: 'Le dynamisme et la générosité de la cuisine américaine',
      image: '/images/services/cuisine-americaine.jpg',
      specialties: [
        'BBQ Ribs Caramélisées',
        'Burgers Gourmet',
        'Mac & Cheese Premium',
        'Buffalo Wings',
        'Pulled Pork Sandwich',
        'Steaks Grillés',
        'Cheesecake New York',
        'Brownies Maison',
      ],
      features: [
        'Grillades professionnelles',
        'Portions généreuses',
        'Street food revisitée',
        'Ambiance conviviale',
      ],
    },
  ];

  const services = [
    {
      icon: '🍽️',
      title: 'Menu Personnalisé',
      description: 'Création de menus sur-mesure selon vos préférences et contraintes',
    },
    {
      icon: '👨‍🍳',
      title: 'Chefs Professionnels',
      description: 'Équipe de chefs expérimentés et passionnés',
    },
    {
      icon: '🥂',
      title: 'Service Traiteur',
      description: 'Service complet incluant vaisselle, personnel et décoration de table',
    },
    {
      icon: '🌱',
      title: 'Options Alimentaires',
      description: 'Menus végétariens, vegan, sans gluten, halal disponibles',
    },
    {
      icon: '🍷',
      title: 'Boissons & Cocktails',
      description: 'Large sélection de boissons et cocktails signature',
    },
    {
      icon: '🎂',
      title: 'Pâtisserie',
      description: 'Desserts et gâteaux personnalisés pour vos événements',
    },
  ];

  const menuFormats = [
    {
      title: 'Cocktail Dînatoire',
      description: 'Assortiment de bouchées et canapés raffinés',
      ideal: 'Réceptions, networking, vernissages',
      portions: '12-15 pièces/personne',
    },
    {
      title: 'Buffet',
      description: 'Variété de plats chauds et froids en libre-service',
      ideal: "Mariages, anniversaires, événements d'entreprise",
      portions: '4-6 plats + desserts',
    },
    {
      title: 'Menu Assis',
      description: 'Service à table avec menu en plusieurs services',
      ideal: 'Galas, dîners officiels, cérémonies',
      portions: 'Entrée + Plat + Dessert',
    },
    {
      title: 'BBQ & Grillades',
      description: 'Viandes grillées et accompagnements généreux',
      ideal: 'Événements outdoor, team building, fêtes',
      portions: 'À volonté',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Échange sur vos préférences, budget et contraintes',
    },
    {
      step: '02',
      title: 'Proposition',
      description: 'Création de menus personnalisés et devis détaillé',
    },
    {
      step: '03',
      title: 'Dégustation',
      description: 'Session de dégustation pour validation des plats',
    },
    {
      step: '04',
      title: 'Préparation',
      description: 'Préparation soignée avec ingrédients frais',
    },
    {
      step: '05',
      title: 'Service',
      description: 'Livraison et service professionnel le jour J',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div
            className={styles.heroImage}
            style={{
              backgroundImage: 'url(/images/services/restauration-hero.jpg)',
            }}
          />
        </div>
        <div className={styles.heroOverlay} />

        <div className={styles.containerCustom}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>🍽️ Restauration</span>
            </div>
            <h1 className={styles.heroTitle}>
              Gastronomie d'Exception pour Vos Événements
            </h1>
            <p className={styles.heroDescription}>
              Savourez une expérience culinaire unique avec nos trois cuisines :
              Africaine authentique, Européenne raffinée et Américaine généreuse.
              Des saveurs qui marquent les esprits.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un menu
                </Button>
              </Link>
              <Link href="#cuisines">
                <Button variant="outline" size="lg">
                  Découvrir nos cuisines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section id="cuisines" className={styles.cuisinesSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Trois Cuisines</h2>
            <p className={styles.sectionSubtitle}>
              Une palette de saveurs pour satisfaire tous les palais
            </p>
          </div>

          <div className={styles.cuisinesWrapper}>
            {cuisines.map((cuisine, index) => (
              <div key={index} className={styles.cuisineRow}>
                {/* Image */}
                <div className={styles.cuisineImageWrapper}>
                  <div
                    className={styles.cuisineImage}
                    style={{
                      backgroundImage: `url(${cuisine.image})`,
                    }}
                  />
                  <div className={styles.cuisineGradient} />
                  <div className={styles.cuisineIcon}>{cuisine.icon}</div>
                </div>

                {/* Content */}
                <div className={styles.cuisineContent}>
                  <h3 className={styles.cuisineType}>{cuisine.type}</h3>
                  <p className={styles.cuisineDescription}>
                    {cuisine.description}
                  </p>

                  {/* Specialties */}
                  <h4 className={styles.specialtiesTitle}>Nos Spécialités</h4>
                  <div className={styles.specialtiesGrid}>
                    {cuisine.specialties.map((specialty, idx) => (
                      <div key={idx} className={styles.specialtyItem}>
                        <svg
                          className={styles.specialtyIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {specialty}
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className={styles.featuresDivider}>
                    <div className={styles.featuresGrid}>
                      {cuisine.features.map((feature, idx) => (
                        <div key={idx} className={styles.featureItem}>
                          <svg
                            className={styles.featureIcon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className={styles.featureText}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Services</h2>
            <p className={styles.sectionSubtitle}>
              Une prestation complète pour une expérience gastronomique réussie
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Formats Section */}
      <section className={styles.formatsSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Formats de Menu</h2>
            <p className={styles.sectionSubtitle}>
              Adaptez le service à votre type d'événement
            </p>
          </div>

          <div className={styles.formatsGrid}>
            {menuFormats.map((format, index) => (
              <div key={index} className={styles.formatCard}>
                <h3 className={styles.formatTitle}>{format.title}</h3>
                <p className={styles.formatDescription}>{format.description}</p>
                <div className={styles.formatDetails}>
                  <div className={styles.formatDetail}>
                    <span className={styles.formatLabel}>Idéal pour:</span>
                    <span className={styles.formatValue}>{format.ideal}</span>
                  </div>
                  <div className={styles.formatDetail}>
                    <span className={styles.formatLabel}>Portions:</span>
                    <span className={styles.formatValue}>{format.portions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Processus</h2>
            <p className={styles.sectionSubtitle}>
              De la commande à la dégustation, excellence à chaque étape
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processStep}>{item.step}</div>
                <h3 className={styles.processTitle}>{item.title}</h3>
                <p className={styles.processDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerCustom}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>
              Régalez Vos Invités avec Notre Gastronomie
            </h2>
            <p className={styles.ctaDescription}>
              Contactez-nous pour créer le menu parfait qui enchantera vos convives
              et fera de votre événement un moment culinaire inoubliable.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis
                </Button>
              </Link>
              <Link href="tel:+225XXXXXXXXX">
                <Button variant="outline" size="lg">
                  Appelez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}