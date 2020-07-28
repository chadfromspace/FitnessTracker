const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models/");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/", ({ body }, res) => {
  try{res.sendFile(path.join(__dirname + "/public/index.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});
app.get("/?", (req, res) => {
  db.workouts.find({id: req.query})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
});
app.get("/exercise", (req, res) => {
  try{res.sendFile(path.join(__dirname + "/public/exercise.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});
app.get("/exercise?", (req, res) => {
  db.workouts.find({id: req.query})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
});
app.get("/api/workouts/", (req, res) => {
  db.workouts.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
});
app.get("/stats", (req, res) => {
  try{res.sendFile(path.join(__dirname + "/public/stats.html"))}
    catch(err) {
      res.status(400).json(err);
    };
});
app.put("/api/workouts/:id", (req, res) => {
  db.workouts.findByIdAndUpdate(req.params.id, {$push:{exercises:req.body}})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
});
app.post("/api/workouts", (req, res) => {
  db.workouts.create({})
        .then(dbWorkouts => {
          res.json(dbWorkouts);
        })
        .catch(err => {
          res.json(err);
        });
});
app.get("/api/workouts/range", (req, res) => {
  db.workouts.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});