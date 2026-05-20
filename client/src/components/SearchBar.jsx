import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const brands = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Land Rover', 'Volkswagen', 'Toyota', 'Honda'];
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const SearchBar = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    maxPrice: '',
    minYear: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/voitures?${params.toString()}`);
  };

  return (
    <div className="search-bar-wrapper" id="search-bar">
      <form className="search-bar container" onSubmit={handleSearch}>
        <div className="search-field">
          <label className="search-label">Marque</label>
          <select name="brand" value={filters.brand} onChange={handleChange} className="search-select">
            <option value="">Toutes les marques</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="search-divider" />

        <div className="search-field">
          <label className="search-label">Modèle</label>
          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleChange}
            placeholder="Tous les modèles"
            className="search-input"
          />
        </div>

        <div className="search-divider" />

        <div className="search-field">
          <label className="search-label">Prix max</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Prix maximum"
            className="search-input"
          />
        </div>

        <div className="search-divider" />

        <div className="search-field">
          <label className="search-label">Année min</label>
          <select name="minYear" value={filters.minYear} onChange={handleChange} className="search-select">
            <option value="">Année minimum</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary search-btn" id="search-btn">
          <FiSearch size={18} />
          <span>Rechercher</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
