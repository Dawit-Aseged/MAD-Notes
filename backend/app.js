const express = require('express');

const app = express();

/*
 The following middleware is used to remove the restrictions
 of Cross Origin Resource Sharing. This is set because our api will be
 open to the public and set up on a separate server than our client software
*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.get("/api/notes",(req, res, next) => {
  // Dummy Data
  notes = [
    {
      id: 1,
      title: "First title",
      todos: [
        {id: 1, content: "Todo 1", checked: false},
        {id: 2, content: "Todo 2", checked: true},
        {id: 3, content: "Todo 3", checked: false},
      ]
    },
    {
      id: 1,
      title: "Second title",
      todos: [
        {id: 1, content: "Todo 4 safsadf dsafsadf sadfsdfsdfd sfasdfa sdfasdfasdfdsaf", checked: false},
        {id: 2, content: "Todo 5", checked: true},
        {id: 3, content: "Todo 6", checked: false},
        {id: 1, content: "Todo 4", checked: false},
        {id: 2, content: "Todo 5", checked: true},
        {id: 3, content: "Todo 6", checked: false},
        {id: 1, content: "Todo 4", checked: false},
        {id: 2, content: "Todo 5", checked: true},
        {id: 3, content: "Todo 6", checked: false},
      ]
    },
    {
      id: 1,
      title: "First title",
      content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam dolorum odio doloremque error et, sequi consequatur repellendus numquam. Tempora fugiat maiores beatae quo soluta aliquam doloremque repellat ipsam id! Magni."
    },
    {
      id: 1,
      title: "Second title",
      todos: [
        {id: 1, content: "Todo 4", checked: false},
        {id: 2, content: "Todo 5", checked: true},
        {id: 3, content: "Todo 6", checked: false},
      ]
    },
    {
      id: 1,
      title: "First title",
      content: "This is the content inside the note"
    }
  ]
  res.status(200).json(notes);
})
module.exports = app;
