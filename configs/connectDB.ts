import mongoose from "mongoose";

class connectDB {
  constructor() {}
  public static connect = async () => {
    const dbPathUrl = "mongodb://localhost:27017/";
    const dbPathhName = "Final_Assignment";
    const statusConnect = "Database Mongo Atlas Connected";
    const statusFailed = "Coonecting To Database Mongo Atlas Failed";
    try {
      await mongoose.connect(`${dbPathUrl}${dbPathhName}`);
      console.log(`${statusConnect}`);
    } catch (error) {
      console.log(`${statusFailed}`);
    }
  };
}

export default connectDB;
