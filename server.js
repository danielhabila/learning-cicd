import express from "express";
const app = express();
import path from "path";

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
