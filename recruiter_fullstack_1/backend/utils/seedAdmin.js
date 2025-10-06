require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

(async ()=>{
  try{
    await connectDB();
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const pwd = process.env.ADMIN_PASSWORD || 'AdminPass123';
    let admin = await User.findOne({ email });
    if (admin) { console.log('Admin already exists'); process.exit(0); }
    const hashed = await bcrypt.hash(pwd, 10);
    admin = await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
    console.log('Admin created:', admin.email);
    process.exit(0);
  }catch(err){ console.error(err); process.exit(1); }
})();
