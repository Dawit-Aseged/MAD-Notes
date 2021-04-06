const express = require("express");

const app = express();
const Note = require("./models/note");
const mongoose = require("mongoose");

function checkErrorNote(res, note) {
  // The following block of code returns true if both Note.content and Note.todos are not set
  error = undefined;
  if (
    (note.content === undefined || note.content === "") &&
    (note.todos === undefined || note.todos.length == 0)
  )
    error = {
      message: "Either content of note or a todo list (1 or more) is required",
      type: "uselessNoteError",
      code: 1,
    };

  if (error !== undefined) res.status(400).json(error);
  // The following validates all the schema validators
  error = note.validateSync();
  if (error !== undefined) res.status(400).json(error);
}
mongoose.connect("mongodb://127.0.0.1:27017/mad-notes", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connection to database :- Success ")
  })
  .catch(() => {
    console.log("Connection to database :- Failure ")
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
 The following middleware is used to remove the restrictions
 of Cross Origin Resource Sharing. This is set because our api will be
 open to the public and set up on a separate server than our client software
*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/note", (req, res, next) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    todos: req.body.todos,
    color: req.body.color,
  });

  // This checks for errors and sends a 400 response if any error is found
  checkErrorNote(res, newNote);
  newNote.save().then(createdNote => {
    res.status(200).json({
      message: "Note saved successfully",
      noteId: createdNote._id
    })
  }).catch(e => {
    res.status(400).send(e);
  })
});

// This is created to test if the mongoose schema works correctly
app.get("/api/test", (req, res, next) => {
  const newNote = new Note({
    id: 1,
    title: "First title",
    todos: [{ content: "Todo one" }, { content: "Todo two" }],
    color: {
      r: 63,
      g: 63,
      b: 63,
      a: 1,
    },
  });

  res.status(200).json(newNote);
});

app.get("/api/notes", (req, res, next) => {

  Note.find().then(documents => {
    res.status(200).json({
      message: 'Notes Sent',
      notes: documents
    });
  }).catch(() => {
    res.status(200).json({
      message: 'No Notes',
      notes: null
    });
  });

});

function fetchFromDB() {
  const data = [];

  data.push({
    title: "News 1",
    content: "News Content 1"
  });
  data.push({
    title: "News 2",
    content: "News Content 2"
  });
  data.push({
    title: "News 3",
    content: "News Content 3"
  });
  return data;
}

app.get("/api/newslatest", (req, res, next) => {
  res.status(200).json(fetchFromDB());
});

module.exports = app;
