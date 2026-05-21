import { FiShield, FiStar, FiUsers, FiAward } from 'react-icons/fi';
import './About.css';

const About = () => {
  return (
    <div className="about-page" id="about-page">
      <div className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">À propos d'AutoSmart Maroc</h1>
          <p className="about-hero-subtitle">
            La plateforme de référence pour l'achat et la vente de voitures au Maroc
          </p>
        </div>
      </div>

      <div className="container about-content">
        <div className="about-story">
          <div className="about-story-text">
            <h2>Notre Histoire</h2>
            <p>
              AutoSmart Maroc est née de la passion pour l'automobile et du désir de simplifier 
              l'expérience d'achat et de vente de voitures au Maroc. Notre mission est de connecter 
              les acheteurs et les vendeurs dans un environnement de confiance, transparent et 
              professionnel.
            </p>
            <p>
              Depuis notre création, nous avons aidé des milliers de clients à trouver la voiture 
              de leurs rêves. Chaque véhicule sur notre plateforme est vérifié et certifié par nos 
              experts automobiles.
            </p>
          </div>
          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"
              alt="Voiture de luxe - AutoSmart Maroc"
            />
          </div>
        </div>

        <div className="about-values">
          <h2 className="about-values-title">Nos Valeurs</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon"><FiShield /></div>
              <h3>Confiance</h3>
              <p>Chaque véhicule est vérifié et certifié pour votre tranquillité d'esprit</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FiStar /></div>
              <h3>Excellence</h3>
              <p>Nous sélectionnons uniquement les meilleures voitures du marché</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FiUsers /></div>
              <h3>Service Client</h3>
              <p>Notre équipe est disponible 7/7 pour vous accompagner</p>
            </div>
            <div className="about-value-card">
              <div className="about-value-icon"><FiAward /></div>
              <h3>Transparence</h3>
              <p>Des prix justes et des informations complètes sur chaque véhicule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
