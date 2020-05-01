const goose = require("mongoose");

const Schema = goose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    trim: true
  },
  distance: {
    type: Number,
    trim: true
  },
  weight: {
    type: Number,
    trim: true
  },
  reps: {
    type: Number,
    trim: true
  },
  sets: {
    type: Number,
    trim: true
  }
});

const Exercises = goose.model("exercise", ExerciseSchema);
module.exports = Exercises;