import mongoose from "mongoose";

const databaseSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  startingPrice: Number,
  condition: String,
  material: String,
  dimensions: String,
  capacity: String,
  color: String,
  location: String,
  shipping: String,
  sellerRating: Number,
  activeBids: Number,
  closesOn: Date,
});

export default mongoose.model("Schema", databaseSchema);
