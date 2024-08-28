import mongoose from "mongoose";

const connectToDB = async () => {
  const MONGODB_URI =
    "mongodb+srv://vineet091:Hello12345@cluster0.sifts7r.mongodb.net/blogdb";
  mongoose.connect(MONGODB_URI);
  mongoose.connection.on("connected", () => {
    console.log("Connected to Mongodb");
  });

  mongoose.connection.on("error", (error) => {
    console.log(`Failed to connect to Mongodb: ${error}`);
  });
};

export default connectToDB;
