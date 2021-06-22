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
  ){
  error = {
    message: "Either content of note or a todo list (1 or more) is required",
    type: "uselessNoteError",
    code: 1,
  };
}

  if (error !== undefined){
    res.status(400).json(error);
    return error;
  }
  // The following validates all the schema validators
  error = note.validateSync();
  if (error !== undefined) {
    res.status(400).json(error);
    return error;
  }

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
  let error = checkErrorNote(res, newNote);
  if(error == undefined){
    newNote.save().then(createdNote => {
      res.status(200).json({
        error: 0,
        message: "Note saved successfully",
        value: {
          id: createdNote._id,
          dateCreated: createdNote.dateCreated,
          lastUpdated: createdNote.lastUpdated,
          color: createdNote.color,
          todos: createdNote.todos
        }
      })
    }).catch(e => {
      res.status(400).send(e);
    })
  }
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

app.delete("/api/note/:id",(req, res, next) => {
  Note.deleteOne({_id: req.params.id}).then(() => {
    res.status(200).json({
      id: req.params.id,
      message: "Note deleted"
    })
  }).catch(() => {
    res.status(400).json({
      id: -1,
      message: "Note Not found"
    })
  })
});
module.exports = app;
