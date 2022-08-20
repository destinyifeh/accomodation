import mongoose from "mongoose";
import { DB_connection } from "../services/requesters";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB() {
  mongoose.Promise = global.Promise;

  try {
    mongoose.connect(DB_connection, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database up and running successfully");
  } catch (err) {
    console.log(err);
  }
}
