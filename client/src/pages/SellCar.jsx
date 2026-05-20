import { FiCamera, FiCheckCircle } from 'react-icons/fi';
import './SellCar.css';

const SellCar = () => {
  return (
    <div className="sell-page" id="sell-page">
      <div className="sell-hero">
        <div className="container">
          <h1 className="sell-hero-title">Vendre ma voiture</h1>
          <p className="sell-hero-subtitle">Publiez votre annonce gratuitement et vendez rapidement</p>
        </div>
      </div>

      <div className="container sell-content">
        <div className="sell-steps">
          <div className="sell-step">
            <div className="sell-step-number">1</div>
            <h3>Contactez-nous</h3>
            <p>Envoyez-nous les détails de votre voiture via WhatsApp ou email</p>
          </div>
          <div className="sell-step">
            <div className="sell-step-number">2</div>
            <h3>Évaluation gratuite</h3>
            <p>Nos experts évaluent votre véhicule et proposent un prix juste</p>
          </div>
          <div className="sell-step">
            <div className="sell-step-number">3</div>
            <h3>Vente rapide</h3>
            <p>Votre voiture est publiée et vendue en un temps record</p>
          </div>
        </div>

        <div className="sell-form-section">
          <div className="sell-form-card">
            <h2 className="sell-form-title">
              <FiCamera /> Soumettez votre voiture
            </h2>
            <p className="sell-form-desc">
              Remplissez les informations ci-dessous et nous vous contacterons dans les 24h.
            </p>

            <form className="sell-form" onSubmit={(e) => e.preventDefault()}>
              <div className="sell-form-grid">
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input type="text" className="form-input" placeholder="Votre nom" />
                </div>
                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input type="tel" className="form-input" placeholder="+212 XXX XXX XXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Marque</label>
                  <input type="text" className="form-input" placeholder="Ex: BMW, Mercedes..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Modèle</label>
                  <input type="text" className="form-input" placeholder="Ex: M5, C63..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Année</label>
                  <input type="number" className="form-input" placeholder="Ex: 2021" />
                </div>
                <div className="form-group">
                  <label className="form-label">Prix souhaité (DH)</label>
                  <input type="number" className="form-input" placeholder="Ex: 500000" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" placeholder="Décrivez votre voiture (kilométrage, état, options...)" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Envoyer ma demande
              </button>
            </form>
          </div>

          <div className="sell-benefits">
            <h3>Pourquoi vendre avec AutoSmart ?</h3>
            <ul>
              <li><FiCheckCircle className="benefit-icon" /> Publication gratuite</li>
              <li><FiCheckCircle className="benefit-icon" /> Visibilité maximale</li>
              <li><FiCheckCircle className="benefit-icon" /> Évaluation professionnelle</li>
              <li><FiCheckCircle className="benefit-icon" /> Accompagnement personnalisé</li>
              <li><FiCheckCircle className="benefit-icon" /> Transaction sécurisée</li>
              <li><FiCheckCircle className="benefit-icon" /> Vente rapide garantie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCar;
