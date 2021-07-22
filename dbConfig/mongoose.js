// #1 Import mongoose
import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    // connect
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB connected!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectMongo;