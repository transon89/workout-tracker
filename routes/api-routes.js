let db = require("../models");

module.exports = app => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate(req.params.id, {
            $push: { exercises: req.body }
        })
            .then(data => {
                // console.log(data);
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .populate("Workout")
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    });
};