const path = require("path");

module.exports = htmlRouter => {

    htmlRouter.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    htmlRouter.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    htmlRouter.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
};