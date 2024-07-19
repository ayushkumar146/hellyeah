const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express(); 

const connectDB =require("./config/db");   
const authRoutes = require("./routes/auth");
const prodroutes=require("./routes/prod");

require("dotenv").config();
connectDB();
 
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/manager", prodroutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`) 
);


