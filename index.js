const express = require("./node_modules/express");
const mongoose = require("mongoose");
const MOONGODB_URL = require("./config/mongodb");
const cors = require("cors");
const app = express(); //Create express app

const actorsRoutes = require("./routes/actors"); // Import movies router
const moviesRoutes = require("./routes/movies"); // Import movies router

//Connect mongoose to MongoDB
mongoose
  .connect(MOONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }) //Give option to connect to avoid mongoose Deprecation warnings
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Error", err));

app.use(express.json()); // Accept json format for request body
app.use(cors()); // Use cors library to allow cros origin request (baska domainlerden de request gelebilmesi icin ancak bunu sinirlamak istersek cors un icine {origin: " domain"}  yaziyoruz)

app.use("/actors", actorsRoutes); //Set initial root of /movies for actors router
app.use("/movies", moviesRoutes); //Set initial root of /movies for movies router

const PORT = process.env.PORT || 3000; // Set PORT from enciroment variables. if not set default to 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`)); // Listen PORT
