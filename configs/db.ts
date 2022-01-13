import mongoose from "mongoose";

class mongoDB {
  constructor() {}
  public static connect = async () => {
    try {
      const dbName: string = "FinalProject";
      const dbPathUri = `mongodb://final123:final123@finalproject-shard-00-00.cijwl.mongodb.net:27017,finalproject-shard-00-01.cijwl.mongodb.net:27017,finalproject-shard-00-02.cijwl.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-9yfwen-shard-0&authSource=admin&retryWrites=true&w=majority`;
      await mongoose.connect(`${dbPathUri}`);
      console.log("DB connection established");
    } catch (err) {
      console.log(err);
    }
  };
}

export default mongoDB;
