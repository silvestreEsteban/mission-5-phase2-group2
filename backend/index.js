#! /usr/bin/env node
import mongoose from "mongoose";
import { Command } from "commander";
import Schema from "./models/model.js";
import seedData from "./models/data.js";

const mongoUri = "mongodb://127.0.0.1:27017/group2trademeDb";
mongoose.Promse = global.Promise;
mongoose.connect(mongoUri, {});

const addSeedData = () => {
  Schema.insertMany(seedData).then(() => {
    console.log("Data seeded successfully");
    mongoose.connection.close();
  });
};

const updateListing = (title) => {
  Schema.findByIdAndUpdate({ title }).then(() => {
    console.log("Listing updated successfully");
    mongoose.connection.close();
  });
};

const findListing = (title) => {
  const search = new RegExp(title, "i");
  Schema.find({ $or: [{ title: search }] }).then((listing) => {
    console.log(listing);
    mongoose.connection.close();
  });
};

const addListing = (listing) => {
  Schema.create(listing).then((_listing) => {
    console.info("New listing added");
    mongoose.connection.close();
  });
};

export { addSeedData, updateListing, findListing, addListing };
