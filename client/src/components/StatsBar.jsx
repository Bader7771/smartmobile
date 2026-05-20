import { FiTruck, FiShield, FiDollarSign, FiHeadphones } from 'react-icons/fi';
import './StatsBar.css';

const stats = [
  { icon: <FiTruck />, value: '+500', label: 'Voitures disponibles' },
  { icon: <FiShield />, value: 'Garantie', label: 'Voitures vérifiées' },
  { icon: <FiDollarSign />, value: 'Meilleurs prix', label: 'Prix compétitifs' },
  { icon: <FiHeadphones />, value: 'Support 7/7', label: 'À votre écoute' }
];

const StatsBar = () => {
  return (
    <div className="stats-bar" id="stats-bar">
      <div className="container stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-item" key={idx}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-text">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
