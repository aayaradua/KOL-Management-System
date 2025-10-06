import mongoose from "mongoose";

const DB_URI = 'mongodb+srv://aayaradua:ululalbab2018@cluster-1.dharfjb.mongodb.net/KOL?retryWrites=true&w=majority&appName=Cluster-1';

const dropIndex = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to DB");

    // Drop the unique index on userId
    await mongoose.connection.collection("tokens").dropIndex("token_1");
    console.log("Unique index removed. Multiple tokens per user now allowed.");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

dropIndex();