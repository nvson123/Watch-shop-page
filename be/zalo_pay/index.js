const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("<p>Hello</p>");
});

app.listen(port, () => {
  console.log(`Payment service running on port ${port}`);
});
