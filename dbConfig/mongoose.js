import mongoose from 'mongoose';

const connection = {};

const connectMongo = async () => {
  try {
    if (connection.isConnected){
      return;
    }
    const dbConnection = await mongoose.connect(process.env.DB_URI);
    connection.isConnected = dbConnection.connections[0].readyState;
    
    console.log('MongoDB database connection established successfully');


  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectMongo;