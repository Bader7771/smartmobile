import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page" id="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-hero-title">Contactez-nous</h1>
          <p className="contact-hero-subtitle">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          <div className="contact-form-card">
            <h2>Envoyez-nous un message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="contact-form-row">
                <div className="form-group">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-input" placeholder="Votre nom" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Sujet</label>
                <input type="text" className="form-input" placeholder="Sujet de votre message" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="Votre message..." rows="5"></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-info-icon"><FiMapPin /></div>
              <div>
                <h3>Adresse</h3>
                <p>Casablanca, Maroc</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FiPhone /></div>
              <div>
                <h3>Téléphone</h3>
                <p>+212 XXX XXX XXX</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FiMail /></div>
              <div>
                <h3>Email</h3>
                <p>contact@autosmart.ma</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FiClock /></div>
              <div>
                <h3>Horaires</h3>
                <p>Lun - Sam: 9h - 19h</p>
                <p>Dim: 10h - 16h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
