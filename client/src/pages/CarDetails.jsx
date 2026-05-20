import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCalendar, FiNavigation, FiTag, FiPackage, FiArrowLeft } from 'react-icons/fi';
import WhatsAppButton from '../components/WhatsAppButton';
import api from '../services/api';
import './CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      console.error('Error fetching car:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: '120px' }} />;
  if (!car) return (
    <div className="car-details-empty">
      <h2>Voiture introuvable</h2>
      <Link to="/voitures" className="btn btn-primary">Retour aux voitures</Link>
    </div>
  );

  const isSold = car.status === 'sold';
  const formatPrice = (price) => new Intl.NumberFormat('fr-MA').format(price);
  
  const images = car.images && car.images.length > 0
    ? car.images
    : ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80'];

  return (
    <div className="car-details" id="car-details-page">
      <div className="container">
        <Link to="/voitures" className="car-details-back">
          <FiArrowLeft /> Retour aux voitures
        </Link>

        <div className="car-details-layout">
          {/* Gallery */}
          <div className="car-details-gallery">
            {isSold && <div className="car-details-sold-badge">VENDU</div>}
            <div className="car-details-main-image">
              <img src={images[selectedImage]} alt={car.name} />
            </div>
            {images.length > 1 && (
              <div className="car-details-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`car-details-thumb ${idx === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${car.name} - ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="car-details-info">
            <div className="car-details-header">
              <h1 className="car-details-name">{car.name}</h1>
              <span className={`badge ${isSold ? 'badge-sold' : 'badge-available'}`}>
                {isSold ? 'Vendu' : 'Disponible'}
              </span>
            </div>

            <div className="car-details-price">
              {formatPrice(car.price)} <span>DH</span>
            </div>

            <div className="car-details-specs">
              <div className="spec-item">
                <FiCalendar className="spec-icon" />
                <div>
                  <span className="spec-label">Année</span>
                  <span className="spec-value">{car.year}</span>
                </div>
              </div>
              <div className="spec-item">
                <FiNavigation className="spec-icon" />
                <div>
                  <span className="spec-label">Kilométrage</span>
                  <span className="spec-value">{car.mileage ? `${formatPrice(car.mileage)} km` : 'N/A'}</span>
                </div>
              </div>
              <div className="spec-item">
                <FiTag className="spec-icon" />
                <div>
                  <span className="spec-label">Marque</span>
                  <span className="spec-value">{car.brand}</span>
                </div>
              </div>
              <div className="spec-item">
                <FiPackage className="spec-icon" />
                <div>
                  <span className="spec-label">Quantité</span>
                  <span className="spec-value">{car.quantity}</span>
                </div>
              </div>
            </div>

            <div className="car-details-description">
              <h3>Description</h3>
              <p>{car.description || car.shortDescription || 'Aucune description disponible.'}</p>
            </div>

            <div className="car-details-actions">
              <WhatsAppButton
                carName={car.name}
                price={car.price}
                disabled={isSold}
                className="btn-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
