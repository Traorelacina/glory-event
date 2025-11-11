'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function DecorationPage() {
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observer tous les éléments avec animation
    const elements = document.querySelectorAll(
      `.${styles.styleCard}, .${styles.serviceCard}, .${styles.processCard}, .${styles.packageCard}, .${styles.whyChooseCard}`
    );

    elements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const decorationStyles = [
    {
      title: 'Élégance Classique',
      icon: '👑',
      description: 'Sophistication intemporelle avec des matériaux nobles',
      features: [
        'Nappes et chemins de table premium',
        'Vaisselle porcelaine fine',
        'Argenterie raffinée',
        'Cristallerie d\'exception',
      ],
      image: '/images/services/deco-classique.jpg',
    },
    {
      title: 'Moderne & Minimaliste',
      icon: '✨',
      description: 'Design épuré et contemporain pour un impact maximal',
      features: [
        'Lignes épurées',
        'Couleurs neutres sophistiquées',
        'Éclairage d\'ambiance LED',
        'Mobilier design',
      ],
      image: '/images/services/deco-moderne.jpg',
    },
    {
      title: 'Romantique & Floral',
      icon: '🌸',
      description: 'Compositions florales somptueuses et ambiances féeriques',
      features: [
        'Arches florales majestueuses',
        'Centres de table luxuriants',
        'Guirlandes naturelles',
        'Parfums subtils',
      ],
      image: '/images/services/deco-romantique.jpg',
    },
    {
      title: 'Africain Contemporain',
      icon: '🌍',
      description: 'Fusion entre traditions africaines et modernité',
      features: [
        'Tissus wax premium',
        'Sculptures artisanales',
        'Motifs ethniques chic',
        'Couleurs vibrantes',
      ],
      image: '/images/services/deco-africaine.jpg',
    },
    {
      title: 'Luxe & Glamour',
      icon: '💎',
      description: 'Opulence et magnificence pour événements d\'exception',
      features: [
        'Or et paillettes',
        'Cristaux Swarovski',
        'Velours et soie',
        'Candélabres majestueux',
      ],
      image: '/images/services/deco-luxe.jpg',
    },
    {
      title: 'Champêtre & Bohème',
      icon: '🌾',
      description: 'Naturel et authentique avec une touche de poésie',
      features: [
        'Bois brut et dentelle',
        'Fleurs sauvages',
        'Éclairage guirlande',
        'Ambiance cosy',
      ],
      image: '/images/services/deco-champetre.jpg',
    },
  ];

  const services = [
    {
      icon: '🎨',
      title: 'Conception Sur-Mesure',
      description: 'Design personnalisé selon vos goûts, thème et budget',
    },
    {
      icon: '💐',
      title: 'Art Floral',
      description: 'Compositions florales élaborées par nos artistes floraux',
    },
    {
      icon: '💡',
      title: 'Éclairage d\'Ambiance',
      description: 'Jeux de lumière pour sublimer votre décoration',
    },
    {
      icon: '🪑',
      title: 'Mobilier Premium',
      description: 'Location de mobilier design et confortable',
    },
    {
      icon: '🎭',
      title: 'Accessoires Déco',
      description: 'Large gamme d\'accessoires pour personnaliser votre espace',
    },
    {
      icon: '🖼️',
      title: 'Scénographie',
      description: 'Création d\'espaces thématiques immersifs',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Rencontre pour comprendre votre vision et vos inspirations',
      icon: '💬',
    },
    {
      step: '02',
      title: 'Concept Design',
      description: 'Création de planches d\'ambiance et moodboards',
      icon: '🎨',
    },
    {
      step: '03',
      title: 'Sélection',
      description: 'Choix des matériaux, couleurs et éléments décoratifs',
      icon: '✨',
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Mise en place professionnelle le jour J',
      icon: '🛠️',
    },
  ];

  const packages = [
    {
      name: 'Déco Essentielle',
      price: 'À partir de 500 000 FCFA',
      features: [
        'Consultation initiale',
        'Plan de décoration basique',
        'Centres de table simples',
        'Nappage et housses de chaises',
        'Installation et retrait',
      ],
      popular: false,
    },
    {
      name: 'Déco Premium',
      price: 'À partir de 1 500 000 FCFA',
      features: [
        'Tout Essentiel +',
        'Design personnalisé complet',
        'Art floral premium',
        'Éclairage d\'ambiance',
        'Mobilier design',
        'Accessoires exclusifs',
        'Coordinateur dédié',
      ],
      popular: true,
    },
    {
      name: 'Déco Prestige',
      price: 'Sur devis personnalisé',
      features: [
        'Tout Premium +',
        'Conception sur-mesure unique',
        'Fleurs d\'importation',
        'Scénographie complète',
        'Éléments sur-mesure',
        'Installation VIP',
        'Service 24/7',
      ],
      popular: false,
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
              backgroundImage: 'url(/images/services/decoration-hero.jpg)',
            }}
          />
        </div>
        <div className={styles.heroOverlay} />

        <div className={styles.containerCustom}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>🎨 Décoration</span>
            </div>
            <h1 className={styles.heroTitle}>
              Transformons Vos Espaces en Œuvres d'Art
            </h1>
            <p className={styles.heroDescription}>
              De l'élégance classique au design contemporain, nous créons des décors
              exceptionnels qui subliment vos événements et marquent les esprits.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis déco
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir nos créations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decoration Styles Section */}
      <section className={styles.stylesSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Styles de Décoration</h2>
            <p className={styles.sectionSubtitle}>
              Une palette variée pour correspondre à tous les goûts et toutes les ambiances
            </p>
          </div>

          <div className={styles.stylesGrid}>
            {decorationStyles.map((style, index) => (
              <div key={index} className={styles.styleCard}>
                <div className={styles.styleImageWrapper}>
                  <div
                    className={styles.styleImage}
                    style={{
                      backgroundImage: `url(${style.image})`,
                    }}
                  />
                  <div className={styles.styleGradient} />
                  <div className={styles.styleIcon}>{style.icon}</div>
                </div>

                <div className={styles.styleContent}>
                  <h3 className={styles.styleTitle}>{style.title}</h3>
                  <p className={styles.styleDescription}>{style.description}</p>

                  <ul className={styles.styleFeatures}>
                    {style.features.map((feature, idx) => (
                      <li key={idx} className={styles.styleFeature}>
                        <svg
                          className={styles.checkIcon}
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
                        {feature}
                      </li>
                    ))}
                  </ul>
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
            <h2 className={styles.sectionTitle}>Nos Services de Décoration</h2>
            <p className={styles.sectionSubtitle}>
              Une gamme complète pour sublimer chaque détail de votre événement
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.processSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Notre Processus Créatif</h2>
            <p className={styles.sectionSubtitle}>
              De l'idée à la réalisation, un accompagnement sur-mesure
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item, index) => (
              <div key={index} className={styles.processItem}>
                <div className={styles.processCard}>
                  <div className={styles.processEmoji}>{item.icon}</div>
                  <div className={styles.processStep}>{item.step}</div>
                  <h3 className={styles.processTitle}>{item.title}</h3>
                  <p className={styles.processDescription}>{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className={styles.processConnector} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className={styles.packagesSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nos Formules Décoration</h2>
            <p className={styles.sectionSubtitle}>
              Des forfaits adaptés à tous les budgets et toutes les envies
            </p>
          </div>

          <div className={styles.packagesGrid}>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`${styles.packageCard} ${
                  pkg.popular ? styles.popular : ''
                }`}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>⭐ POPULAIRE</div>
                )}

                <div className={styles.packageHeader}>
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <p className={styles.packagePrice}>{pkg.price}</p>
                </div>

                <ul className={styles.packageFeatures}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={styles.packageFeature}>
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact">
                  <Button
                    variant={pkg.popular ? 'primary' : 'outline'}
                    fullWidth
                    size="lg"
                  >
                    Choisir cette formule
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseSection}>
        <div className={styles.containerCustom}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pourquoi Choisir Notre Service Déco ?</h2>
          </div>

          <div className={styles.whyChooseGrid}>
            {[
              {
                icon: '🎨',
                title: 'Équipe Créative',
                description: 'Designers et décorateurs passionnés et expérimentés',
              },
              {
                icon: '💎',
                title: 'Matériaux Premium',
                description: 'Sélection rigoureuse des meilleurs fournisseurs',
              },
              {
                icon: '✨',
                title: 'Sur-Mesure',
                description: 'Chaque décoration est unique et personnalisée',
              },
              {
                icon: '⚡',
                title: 'Installation Pro',
                description: 'Mise en place soignée et dans les délais',
              },
            ].map((item, index) => (
              <div key={index} className={styles.whyChooseCard}>
                <div className={styles.whyChooseIcon}>{item.icon}</div>
                <h3 className={styles.whyChooseTitle}>{item.title}</h3>
                <p className={styles.whyChooseDescription}>{item.description}</p>
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
              Créons Ensemble Votre Décor de Rêve
            </h2>
            <p className={styles.ctaDescription}>
              Partagez-nous votre vision et laissez notre équipe créative
              transformer votre espace en un lieu magique et inoubliable.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Demander un devis décoration
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg">
                  Voir notre portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}