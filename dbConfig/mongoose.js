import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectMongo;