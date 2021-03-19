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

app.use((req, res, next) => {
  res.status(200).json({
    message: "Node Backend works"
  })
});

module.exports = app;
