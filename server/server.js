const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const dotenv = require("dotenv");

const recipeRoutes = require("./routes/recipeRoutes");

const authRoutes = require("./routes/authRoutes");


dotenv.config();


const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/recipes", recipeRoutes);

app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {

  res.send("API is running");

});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

  app.listen(5000, () => {

    console.log("Server running on port 5000");

  });

})
.catch((error) => {

  console.log(error);

});