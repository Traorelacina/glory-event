import React from 'react';


const AboutPage = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-content">
          <h1>À propos de nous</h1>
          <p className="hero-subtitle">
            Votre partenaire pour des événements exceptionnels et des parfums d'exception
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="content-grid">
          <div className="text-content">
            <h2>Notre Histoire</h2>
            <p>
              Forts de plusieurs années d'expérience dans l'organisation d'événements et 
              la distribution de parfums de qualité, nous nous engageons à offrir 
              des services sur mesure qui répondent aux attentes les plus exigeantes.
            </p>
            
            <h2>Notre Mission</h2>
            <p>
              Accompagner les professionnels dans la réalisation de leurs événements 
              tout en proposant une sélection raffinée de parfums qui subliment 
              chaque occasion spéciale.
            </p>

            <h2>Domaines d'expertise</h2>
            <ul className="expertise-list">
              <li>Organisation d'événements professionnels</li>
              <li>Événements matrimoniaux</li>
              <li>Relations professionnelles</li>
              <li>Distribution de parfums sélectifs</li>
              <li>Conseil et accompagnement personnalisé</li>
            </ul>
          </div>

          <div className="image-content">
            <div className="placeholder-image">
              <span>Image représentative</span>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Nos Valeurs</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Excellence</h3>
            <p>Nous visons l'excellence dans chaque détail de nos services</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Nous innovons constamment pour répondre aux nouvelles tendances</p>
          </div>
          <div className="value-card">
            <h3>Engagement</h3>
            <p>Nous nous engageons pleinement dans la réussite de vos projets</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;