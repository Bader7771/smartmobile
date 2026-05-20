const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Car = require('./models/Car');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    /* Create admin user if not exists */
    const existingAdmin = await User.findOne({ email: 'admin@autosmart.ma' });
    if (!existingAdmin) {
      await User.create({
        email: 'admin@autosmart.ma',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created: admin@autosmart.ma / admin123');
    } else {
      console.log('Admin user already exists');
    }

    /* Create sample cars if collection is empty */
    const carCount = await Car.countDocuments();
    if (carCount === 0) {
      const sampleCars = [
        {
          name: 'BMW M5 Competition',
          brand: 'BMW',
          model: 'M5',
          year: 2021,
          mileage: 16000,
          price: 1280000,
          description: 'La BMW M5 Competition est une berline hautes performances dotée d\'un moteur V8 biturbo de 4,4 litres développant 625 ch. Intérieur luxueux avec sièges en cuir Merino, système de navigation professionnel et système audio Harman Kardon. Condition impeccable avec historique d\'entretien complet.',
          shortDescription: 'Berline V8 biturbo 625ch, intérieur luxe complet',
          images: [],
          quantity: 1,
          status: 'available'
        },
        {
          name: 'Mercedes-Benz C63s AMG',
          brand: 'Mercedes-Benz',
          model: 'C63s',
          year: 2020,
          mileage: 22000,
          price: 920000,
          description: 'Mercedes-Benz C63s AMG avec moteur V8 biturbo de 4,0 litres produisant 510 ch. Équipée du pack AMG Performance, freins céramique, toit panoramique et système COMAND Online. Véhicule en excellent état.',
          shortDescription: 'V8 biturbo 510ch, pack AMG Performance',
          images: [],
          quantity: 1,
          status: 'available'
        },
        {
          name: 'Audi RS6 Avant',
          brand: 'Audi',
          model: 'RS6',
          year: 2021,
          mileage: 18000,
          price: 1150000,
          description: 'Audi RS6 Avant avec son V8 biturbo de 4,0 litres développant 600 ch et transmission intégrale quattro. Break sportif ultime avec Bang & Olufsen, suspension pneumatique adaptative et Virtual Cockpit Plus.',
          shortDescription: 'Break sportif V8 600ch quattro, full options',
          images: [],
          quantity: 1,
          status: 'available'
        },
        {
          name: 'Range Rover Sport HSE',
          brand: 'Land Rover',
          model: 'Range Rover Sport',
          year: 2019,
          mileage: 35000,
          price: 980000,
          description: 'Range Rover Sport HSE avec moteur V6 3.0L Supercharged de 340 ch. SUV de luxe avec intérieur en cuir Windsor, système Meridian, toit panoramique, caméra 360° et suspension pneumatique.',
          shortDescription: 'SUV luxe V6 340ch, cuir Windsor, full options',
          images: [],
          quantity: 1,
          status: 'available'
        },
        {
          name: 'Porsche 911 Carrera S',
          brand: 'Porsche',
          model: '911',
          year: 2022,
          mileage: 8000,
          price: 1650000,
          description: 'Porsche 911 Carrera S (992) avec moteur flat-6 biturbo de 3,0 litres et 450 ch. Boîte PDK 8 rapports, PASM, chrono pack, intérieur cuir, Porsche Communication Management.',
          shortDescription: 'Flat-6 biturbo 450ch, PDK, chrono pack',
          images: [],
          quantity: 1,
          status: 'available'
        },
        {
          name: 'Mercedes-Benz GLE 450 AMG',
          brand: 'Mercedes-Benz',
          model: 'GLE 450',
          year: 2023,
          mileage: 5000,
          price: 1100000,
          description: 'Mercedes-Benz GLE 450 avec EQ Boost, 6 cylindres en ligne turbo de 367 ch. SUV premium avec MBUX, suspension AIRMATIC, pack AMG Line, sièges ventilés et système audio Burmester.',
          shortDescription: 'SUV premium 367ch, MBUX, pack AMG Line',
          images: [],
          quantity: 2,
          status: 'available'
        }
      ];

      await Car.insertMany(sampleCars);
      console.log(`${sampleCars.length} sample cars created`);
    } else {
      console.log(`${carCount} cars already exist`);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
