import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import api from '../../services/api';
import './AddCar.css';

const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    shortDescription: '',
    quantity: '1',
    status: 'available'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      await api.post('/cars', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car-page" id="add-car-page">
      <div className="container">
        <Link to="/admin" className="car-details-back">
          <FiArrowLeft /> Retour au dashboard
        </Link>

        <div className="add-car-card">
          <h1 className="add-car-title">Ajouter une voiture</h1>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="add-car-grid">
              <div className="form-group">
                <label className="form-label">Nom complet *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Ex: BMW M5 Competition" required />
              </div>
              <div className="form-group">
                <label className="form-label">Marque *</label>
                <input type="text" name="brand" value={form.brand} onChange={handleChange} className="form-input" placeholder="Ex: BMW" required />
              </div>
              <div className="form-group">
                <label className="form-label">Modèle *</label>
                <input type="text" name="model" value={form.model} onChange={handleChange} className="form-input" placeholder="Ex: M5" required />
              </div>
              <div className="form-group">
                <label className="form-label">Année *</label>
                <input type="number" name="year" value={form.year} onChange={handleChange} className="form-input" placeholder="Ex: 2021" required />
              </div>
              <div className="form-group">
                <label className="form-label">Kilométrage</label>
                <input type="number" name="mileage" value={form.mileage} onChange={handleChange} className="form-input" placeholder="Ex: 16000" />
              </div>
              <div className="form-group">
                <label className="form-label">Prix (DH) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="form-input" placeholder="Ex: 1280000" required />
              </div>
              <div className="form-group">
                <label className="form-label">Quantité</label>
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="form-input" placeholder="Ex: 1" />
              </div>
              <div className="form-group">
                <label className="form-label">Statut</label>
                <select name="status" value={form.status} onChange={handleChange} className="form-select">
                  <option value="available">Disponible</option>
                  <option value="sold">Vendu</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description courte</label>
              <input type="text" name="shortDescription" value={form.shortDescription} onChange={handleChange} className="form-input" placeholder="Résumé court (visible sur les cartes)" />
            </div>

            <div className="form-group">
              <label className="form-label">Description complète</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-textarea" placeholder="Description détaillée du véhicule..." rows="5"></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Images (max 5)</label>
              <div className="add-car-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="add-car-file-input"
                  id="car-images-input"
                />
                <label htmlFor="car-images-input" className="add-car-upload-label">
                  <FiUpload size={24} />
                  <span>Cliquez pour ajouter des photos</span>
                  <span className="add-car-upload-hint">JPG, PNG, WebP jusqu'à 5MB</span>
                </label>
              </div>
              {imagePreviews.length > 0 && (
                <div className="add-car-previews">
                  {imagePreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`Preview ${idx + 1}`} className="add-car-preview-img" />
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Création en cours...' : 'Créer la voiture'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
