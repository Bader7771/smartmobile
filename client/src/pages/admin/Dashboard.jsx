import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiPackage } from 'react-icons/fi';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await api.get('/cars');
      setCars(res.data);
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) return;
    try {
      await api.delete(`/cars/${id}`);
      setCars(cars.filter(car => car._id !== id));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/cars/${id}/status`);
      setCars(cars.map(car => car._id === id ? res.data : car));
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('fr-MA').format(price);

  return (
    <div className="dashboard" id="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard Admin</h1>
            <p className="dashboard-subtitle">Gérez vos voitures et annonces</p>
          </div>
          <Link to="/admin/add" className="btn btn-primary" id="add-car-btn">
            <FiPlus /> Ajouter une voiture
          </Link>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <FiPackage className="dashboard-stat-icon" />
            <div>
              <span className="dashboard-stat-value">{cars.length}</span>
              <span className="dashboard-stat-label">Total voitures</span>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <FiToggleRight className="dashboard-stat-icon success" />
            <div>
              <span className="dashboard-stat-value">{cars.filter(c => c.status === 'available').length}</span>
              <span className="dashboard-stat-label">Disponibles</span>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <FiToggleLeft className="dashboard-stat-icon danger" />
            <div>
              <span className="dashboard-stat-value">{cars.filter(c => c.status === 'sold').length}</span>
              <span className="dashboard-stat-label">Vendues</span>
            </div>
          </div>
        </div>

        {/* Cars Table */}
        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Marque</th>
                  <th>Année</th>
                  <th>Prix (DH)</th>
                  <th>Qté</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <img
                        src={car.images?.[0] || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&q=60'}
                        alt={car.name}
                        className="dashboard-car-thumb"
                      />
                    </td>
                    <td className="dashboard-car-name">{car.name}</td>
                    <td>{car.brand}</td>
                    <td>{car.year}</td>
                    <td className="dashboard-car-price">{formatPrice(car.price)}</td>
                    <td>{car.quantity}</td>
                    <td>
                      <span className={`badge ${car.status === 'sold' ? 'badge-sold' : 'badge-available'}`}>
                        {car.status === 'sold' ? 'Vendu' : 'Dispo'}
                      </span>
                    </td>
                    <td>
                      <div className="dashboard-actions">
                        <button
                          className="dashboard-action-btn toggle"
                          onClick={() => handleToggleStatus(car._id)}
                          title={car.status === 'available' ? 'Marquer vendu' : 'Marquer disponible'}
                        >
                          {car.status === 'available' ? <FiToggleRight /> : <FiToggleLeft />}
                        </button>
                        <Link
                          to={`/admin/edit/${car._id}`}
                          className="dashboard-action-btn edit"
                          title="Modifier"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          className="dashboard-action-btn delete"
                          onClick={() => handleDelete(car._id, car.name)}
                          title="Supprimer"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td colSpan="8" className="dashboard-empty">
                      Aucune voiture. <Link to="/admin/add">Ajoutez votre première voiture →</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
