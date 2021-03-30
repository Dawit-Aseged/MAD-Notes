const express = require("express");

const app = express();
const Note = require("./models/note");

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

  error = note.validateSync();
  if (error !== undefined) res.status(400).json(error);
}

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

  checkErrorNote(res, newNote);
  res.status(200).json(newNote);
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
  // Dummy Data
  notes = [
    {
      id: 1,
      title: "First title",
      todos: [
        { id: 1, content: "Todo 1", checked: false },
        { id: 2, content: "Todo 2", checked: true },
        { id: 3, content: "Todo 3", checked: false },
      ],
    },
    {
      id: 1,
      title: "Second title",
      todos: [
        {
          id: 1,
          content:
            "Todo 4 safsadf dsafsadf sadfsdfsdfd sfasdfa sdfasdfasdfdsaf",
          checked: false,
        },
        { id: 2, content: "Todo 5", checked: true },
        { id: 3, content: "Todo 6", checked: false },
        { id: 1, content: "Todo 4", checked: false },
        { id: 2, content: "Todo 5", checked: true },
        { id: 3, content: "Todo 6", checked: false },
        { id: 1, content: "Todo 4", checked: false },
        { id: 2, content: "Todo 5", checked: true },
        { id: 3, content: "Todo 6", checked: false },
      ],
    },
    {
      id: 1,
      title: "First title",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam dolorum odio doloremque error et, sequi consequatur repellendus numquam. Tempora fugiat maiores beatae quo soluta aliquam doloremque repellat ipsam id! Magni.",
    },
    {
      id: 1,
      title: "Second title",
      todos: [
        { id: 1, content: "Todo 4", checked: false },
        { id: 2, content: "Todo 5", checked: true },
        { id: 3, content: "Todo 6", checked: false },
      ],
    },
    {
      id: 1,
      title: "First title",
      content: "This is the content inside the note",
    },
  ];
  res.status(200).json(notes);
});

module.exports = app;
