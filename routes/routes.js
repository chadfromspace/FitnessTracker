const express = require('express');
const router = require('express').Router();
const app = express();
const path = require('path');
const db = require('../seeders/seed.js')

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
    const database = db.workout.Find();
    console.log(database);
  }
    catch(err) {
      res.status(400).json(err);
    };
});
router.get("api/workout", (req, res) => {
  try{db.Workout.find()}
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