import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Schema from "./models/model.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const dbUri = "mongodb://127.0.0.1:27017/group2trademeDb";

mongoose.connect(dbUri, {}).then(() => {
  console.log("Connected to MongoDB database");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/search", async (req, res) => {
  const query = req.body.query;
  if (!query) {
    return res.status(400).send("Query is required");
  }

  try {
    const items = await Schema.find({ title: new RegExp(query, "i") })
      .limit(10)
      .select("title");
    const itemTitles = items.map((item) => item.title);
    res.json(itemTitles);
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/listings", async (req, res) => {
  try {
    const listings = await Schema.find();
    res.json(listings);
  } catch (error) {
    console.log("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});
