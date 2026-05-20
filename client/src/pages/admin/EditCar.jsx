import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import api from '../../services/api';
import './AddCar.css';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [form, setForm] = useState({
    name: '', brand: '', model: '', year: '', mileage: '',
    price: '', description: '', shortDescription: '', quantity: '1', status: 'available'
  });

  useEffect(() => { fetchCar(); }, [id]);

  const fetchCar = async () => {
    try {
      const res = await api.get(`/cars/${id}`);
      const car = res.data;
      setForm({
        name: car.name || '', brand: car.brand || '', model: car.model || '',
        year: car.year || '', mileage: car.mileage || '', price: car.price || '',
        description: car.description || '', shortDescription: car.shortDescription || '',
        quantity: car.quantity || 1, status: car.status || 'available'
      });
      setExistingImages(car.images || []);
    } catch (err) {
      setError('Voiture introuvable');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    setImagePreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('keepImages', imageFiles.length > 0 ? 'false' : 'true');
      imageFiles.forEach(f => formData.append('images', f));
      await api.put(`/cars/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="spinner" style={{ marginTop: '120px' }} />;

  return (
    <div className="add-car-page" id="edit-car-page">
      <div className="container">
        <Link to="/admin" className="car-details-back"><FiArrowLeft /> Retour au dashboard</Link>
        <div className="add-car-card">
          <h1 className="add-car-title">Modifier la voiture</h1>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="add-car-grid">
              <div className="form-group">
                <label className="form-label">Nom *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Marque *</label>
                <input type="text" name="brand" value={form.brand} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Modèle *</label>
                <input type="text" name="model" value={form.model} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Année *</label>
                <input type="number" name="year" value={form.year} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Kilométrage</label>
                <input type="number" name="mileage" value={form.mileage} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Prix (DH) *</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Quantité</label>
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="form-input" />
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
              <input type="text" name="shortDescription" value={form.shortDescription} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-textarea" rows="5"></textarea>
            </div>
            <div className="form-group">
              <label className="form-label">Images actuelles</label>
              {existingImages.length > 0 ? (
                <div className="add-car-previews">
                  {existingImages.map((src, i) => <img key={i} src={src} alt={`Current ${i}`} className="add-car-preview-img" />)}
                </div>
              ) : <p style={{fontSize:'0.9rem',color:'var(--text-muted)'}}>Aucune image</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Nouvelles images (remplacent les actuelles)</label>
              <div className="add-car-upload">
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="add-car-file-input" id="edit-car-images" />
                <label htmlFor="edit-car-images" className="add-car-upload-label">
                  <FiUpload size={24} /><span>Cliquez pour remplacer les photos</span>
                </label>
              </div>
              {imagePreviews.length > 0 && (
                <div className="add-car-previews">
                  {imagePreviews.map((src, i) => <img key={i} src={src} alt={`New ${i}`} className="add-car-preview-img" />)}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{width:'100%'}} disabled={saving}>
              {saving ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
