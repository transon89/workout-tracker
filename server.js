const express = require("express");
const logger = require("morgan"); 
const mongoose = require("mongoose"); 

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(logger("dev")); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Requiring our routes
require("./public/routes/html-routes")(app);
require("./public/routes/api-routes")(app); 

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Syncing our database and logging a message to the user upon success
app.listen(PORT, function() {
console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});