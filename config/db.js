const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;


const connectDB = async () => {
    console.log('Connection string:', connectionString);

  try {    
    if (!connectionString) {
      throw new Error('MongoDB connection string is not defined in .env file');
    }

    await mongoose.connect(connectionString);

    console.log('MongoDB connected successfully');
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports= connectDB;