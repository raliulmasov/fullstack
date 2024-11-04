const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();

app.use(express.static('build'))

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => (req.method === "POST" ? JSON.stringify(req.body) : ""));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

const Person = require('./models/person');

// MongoDB connection
const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false);
mongoose.connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error:", error.message));

// Routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => res.status(500).json({ error: "Database error" }));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((error) => res.status(500).json({ error: "Database error" }));
});

app.get("/info", (req, res) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      res.send(`<div>
                  <p>Phonebook has info for ${count} people</p>
                  <p>${date}</p>
                </div>`);
    })
    .catch((error) => res.status(500).json({ error: "Database error" }));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name and number are required" });
  }

  const newPerson = new Person({ name, number });

  newPerson.save()
    .then((savedPerson) => res.status(201).json(savedPerson))
    .catch((error) => res.status(500).json({ error: "Database error" }));
});

app.put('/api/persons/:id', (req, res, next) => {

  const person = req.body

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end()
      }
      res.json(updatedPerson)
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})


// Unknown endpoint handler
app.use((req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
