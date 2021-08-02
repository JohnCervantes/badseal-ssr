import mongoose from 'mongoose';

const connection = {};

const connectMongo = async () => {
  try {
    if (connection.isConnected){
      return;
    }
    const dbConnection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    connection.isConnected = dbConnection.connections[0].readyState;

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectMongo;