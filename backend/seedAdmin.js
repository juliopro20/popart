const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = process.env.ADMIN_EMAIL || 'admin@popart.com';
    const rawPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`Admin with email "${email}" already exists!`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    await Admin.create({
      email,
      password: hashedPassword
    });

    console.log(`Admin seeded successfully! Email: ${email}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seed();