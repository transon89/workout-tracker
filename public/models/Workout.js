const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = {toJSON: {virtuals: true}}; 

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
 exercises: []
}, opts);

WorkoutSchema.virtual('totalDuration').get(function(){
  let totalDuration =0; 
  for (const exercise of this.exercises){
    totalDuration += exercise.duration; 
  }
  return totalDuration; 
}); 

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;