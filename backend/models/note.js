const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  content: String,
  checked: {type: Boolean, default: false}
})
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    // The following validator returns an error if the title length is more than 1000 characters.
    validate: {
      validator:
        function (inputString) {
          return inputString.length < 1000;
        },
      message: "Title too long"
    }
  },
  content: {
    type: String,
    // The following validator returns an error if the content length is more than 20000 characters.
    validate: {
      validator:
        function (inputString) {
          return inputString.length < 20000;
        },
      message: "Content too long"
    }
  },
  todos: [todoSchema], // List of Todos - from the above schema
  dateCreated: {type: Date, default: Date.now()}, // The date it was created
  lastUpdated: {type: Date, default: Date.now()}, // The date it was updated (will be changed regularly)

  // The following is the color in rgba() form
  color: {
    r: Number,
    g: Number,
    b: Number,
    a: Number
  },

  // This is to check if the note is to be pinned or not
  pinned: {type: Boolean, default: false}
})

module.exports = mongoose.model("Note", noteSchema);
