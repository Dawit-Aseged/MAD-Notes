const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  content: {
    // Content is required if the number of Todo's is zero
    type: String, required: function() {
      return this.todos.length == 0
    }
  },
  todos: [{
    // Todo's are required if the content is an empty string or is undefined
    type: mongoose.Schema.Types.ObjectId,
    required: function() {
      return (this.content === "" || this.content === undefined)
    },
    content: String,
    checked: {type: Boolean, default: false}
  }],
  dateCreated: {type: Date, default: Date.now()},
  lastUpdated: {type: Date, default: Date.now()},
  color: {
    r: Number,
    g: Number,
    b: Number,
    a: Number,

  },
  pinned: {type: Boolean, default: false}
})

module.exports = mongoose.model("Note", noteSchema);
