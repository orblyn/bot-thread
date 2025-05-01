const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("I'm alive!");
});

app.listen(3000, () => {
  console.log("Server is online on port 3000");
});
