const express = require('express');
const router = require('express').Router();
const app = express();
const path = require('path');

router.get("/", ({ body }, res) => {
  try{res.sendFile(path.join(__dirname + "/../public/index.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});

router.get("/exercise", (req, res) => {
  try{res.sendFile(path.join(__dirname + "/../public/exercise.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});

router.get("/exercise?", (req, res) => {
  try{
    console.log(req);
  }
    catch(err) {
      res.status(400).json(err);
    };
});
router.get("/api/workouts/", (req, res) => {
  try{db.workout.find()}
    catch(err) {
      res.status(400).json(err);
    };
});
router.put("/api/workouts/:id", (req, res) => {
  try{db.workout.find(req.params.id)}
    catch(err) {
      res.status(400).json(err);
    };
});
app.post("/api/workouts", ({ body }, res) => {
  db.workouts.create(body)
    .then(({ _id }) => db.workouts.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  try{db.workout.find();}
    catch(err) {
      res.status(400).json(err);
    };
});

router.get("/stats", (req, res) => {
  try{res.sendFile(path.join(__dirname + "/../public/stats.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});

module.exports = router;