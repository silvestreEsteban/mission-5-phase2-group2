#! /usr/bin/env node

import mongoose from "mongoose";
import { Command } from "commander";
import Schema from "../models/model.js";
import seedData from "../models/data.js";
import {
  addSeedData,
  findListing,
  updateListing,
  addListing,
} from "../index.js";
import inquirer from "inquirer";

const prompt = inquirer.createPromptModule();
const questionsForAdding = [
  {
    type: "input",
    name: "imageUrl",
    message: "Enter the image URL:",
  },
  {
    type: "input",
    name: "title",
    message: "Enter the title:",
  },
  {
    type: "input",
    name: "startingPrice",
    message: "Enter the starting price:",
  },
  {
    type: "input",
    name: "condition",
    message: "Enter the condition:",
  },
  {
    type: "input",
    name: "material",
    message: "Enter the material:",
  },
  {
    type: "input",
    name: "dimensions",
    message: "Enter the dimensions:",
  },
  {
    type: "input",
    name: "capacity",
    message: "Enter the capacity:",
  },
  {
    type: "input",
    name: "color",
    message: "Enter the color:",
  },
  {
    type: "input",
    name: "location",
    message: "Enter the location:",
  },
  {
    type: "input",
    name: "shipping",
    message: "Enter the shipping:",
  },
  {
    type: "input",
    name: "sellerRating",
    message: "Enter the seller rating:",
  },
  {
    type: "input",
    name: "activeBids",
    message: "Enter the active bids:",
  },
  {
    type: "input",
    name: "closesOn",
    message: "Enter the closing date:",
  },
];

const program = new Command();

program.version("1.0.0").description("A CLI for seeding data into MongoDB");

program
  .command("seed")
  .alias("s")
  .description("Seed data into MongoDB")
  .action(addSeedData);

program
  .command("add")
  .alias("a")
  .description("Add a listing")
  .action(() => {
    prompt(questionsForAdding).then((answers) => {
      addListing(answers);
    });
  });

program
  .command("find <title>")
  .alias("f")
  .description("Find a listing")
  .action(findListing);

program
  .command("update <title>")
  .alias("u")
  .description("Update a listing")
  .action(updateListing);

program.parse(process.argv);
