import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiCalendar, FiNavigation } from 'react-icons/fi';
import './CarCard.css';

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);
  const isSold = car.status === 'sold';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA').format(price);
  };

  const imageUrl = car.images && car.images.length > 0
    ? car.images[0]
    : 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80';

  return (
    <div className={`car-card ${isSold ? 'car-card--sold' : ''}`} id={`car-card-${car._id}`}>
      {isSold && (
        <div className="car-card-sold-badge">VENDU</div>
      )}

      <div className="car-card-image-wrapper">
        <img src={imageUrl} alt={car.name} className="car-card-image" loading="lazy" />
        <button
          className={`car-card-heart ${liked ? 'liked' : ''}`}
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          aria-label="Ajouter aux favoris"
        >
          <FiHeart />
        </button>
      </div>

      <div className="car-card-body">
        <h3 className="car-card-name">{car.name}</h3>
        
        {car.shortDescription && (
          <p className="car-card-desc">{car.shortDescription}</p>
        )}

        <div className="car-card-meta">
          <span className="car-card-meta-item">
            <FiCalendar />
            {car.year}
          </span>
          <span className="car-card-meta-item">
            <FiNavigation />
            {car.mileage ? `${new Intl.NumberFormat('fr-MA').format(car.mileage)} km` : 'N/A'}
          </span>
        </div>

        <div className="car-card-footer">
          <div className="car-card-price">
            {formatPrice(car.price)} <span className="car-card-currency">DH</span>
          </div>
          <Link to={`/voitures/${car._id}`} className="btn btn-primary btn-sm car-card-btn">
            Voir détails
          </Link>
        </div>

        {car.quantity !== undefined && (
          <div className="car-card-qty">
            <span className={`badge ${isSold ? 'badge-sold' : 'badge-available'}`}>
              {isSold ? 'Vendu' : `${car.quantity} dispo.`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
