import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-bg">
        <div className="hero-bg-gradient" />
        <div className="hero-bg-glow hero-bg-glow--left" />
        <div className="hero-bg-glow hero-bg-glow--right" />
      </div>

      <div className="hero-blur-wave" aria-hidden="true" />
      <div className="hero-glass-panel" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Trouvez la voiture
            <span className="hero-title-accent"> de vos rêves</span>
          </h1>
          <p className="hero-subtitle">
            Des voitures de qualité au meilleur prix au Maroc
          </p>
          <div className="hero-actions">
            <Link to="/voitures" className="btn btn-primary btn-lg" id="hero-btn-cars">
              Voir les voitures
            </Link>
            <Link to="/vendre" className="btn btn-white btn-lg" id="hero-btn-sell">
              Vendre ma voiture
            </Link>
          </div>
        </div>

        <div className="hero-image-wrap">
          <div className="hero-image-blend" aria-hidden="true" />
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80"
              alt="BMW M5 Competition - Voiture de luxe"
              className="hero-car-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
