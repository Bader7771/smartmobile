import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '212XXXXXXXXX'; // Replace with your WhatsApp number

const WhatsAppButton = ({ carName, price, disabled = false, className = '' }) => {
  const handleClick = () => {
    if (disabled) return;
    const message = encodeURIComponent(
      `Hello, I am interested in this car: ${carName}, Price: ${new Intl.NumberFormat('fr-MA').format(price)} DH`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <button
      className={`btn btn-whatsapp ${className}`}
      onClick={handleClick}
      disabled={disabled}
      id="whatsapp-buy-btn"
    >
      <FaWhatsapp size={20} />
      {disabled ? 'Vendu' : 'Acheter via WhatsApp'}
    </button>
  );
};

export default WhatsAppButton;
