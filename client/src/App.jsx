import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import SellCar from './pages/SellCar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AddCar from './pages/admin/AddCar';
import EditCar from './pages/admin/EditCar';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voitures" element={<Cars />} />
          <Route path="/voitures/:id" element={<CarDetails />} />
          <Route path="/vendre" element={<SellCar />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/add" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
          <Route path="/admin/edit/:id" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
