// const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/Ntechzy");

// const express = require("express");
// const app = express();

// // for user routes
// const userRoute = require("./routes/userRoute");
// app.use("/", userRoute);

// app.listen(3000, function () {
//   console.log("Server is running.....");
// });

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import user_route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 7000;
const URL =
  "mongodb+srv://tejuschaturvedi0:Kunal100@cluster0.hm2tbut.mongodb.net/HRM?retryWrites=true&w=majority";

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", user_route);
