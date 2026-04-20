import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing admins
    await Admin.deleteMany({});
    console.log('Cleaned existing admins.');

    // Create new admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin@123'
    });

    await admin.save();
    console.log('Admin user seeded successfully!');
    console.log('Username: admin');
    console.log('Password: admin@123');

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
