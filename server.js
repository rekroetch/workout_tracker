const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models/Workout");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// Api Routes
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});



app.put("/api/workouts/:id", ({ body }, res) => {
    db.Workout.update(
        console.log(body),
        { _id: body.id },
        { $set: { exercises: 
            {
                type: body.type,
                name: body.name,
                duration: body.duration,
                weight: body.weight,
                reps: body.reps,
                sets: body.sets,
                distance: body.distance
            } } },

        (error, edited) => {
            if (error) {
            console.log(error);
            res.send(error);
            } else {
            console.log(edited);
            res.send(edited);
            }
        }
    );
    // .then(dbWorkout => {
    //   res.json(dbWorkout);
    // })
    // .catch(err => {
    //   res.json(err);
    // });
});

// app.post("/api/workouts", ({ body }, res) => {
//   db.Workout.create(body)
//     .then(() => db.Workout.findOneAndUpdate({}, { $set: { exercises: req.body } }))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(
        {
            type: body.type,
            name: body.name,
            duration: body.duration,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets,
            distance: body.distance
        })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
