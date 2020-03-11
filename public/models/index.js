// Exporting an object containing all of our models

module.exports = {
    Workout: require("./Workout.js"),
    //Does not use the exercise schema
    Exercise: require("./Exercise.js")
  };