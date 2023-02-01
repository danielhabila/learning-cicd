import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import quotingTestModel from "./models/quoting.js";
import cors from "cors";
import { dirname, join } from "path";
// import bodyParser from "body-parser";

const app = express();
const currentFile = import.meta.url;
const currentDir = dirname(currentFile);

// app.use(bodyParser.json());
app.use(express.static(join(currentDir, "/client/build")));

app.use(express.json());

app.use(cors());
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`);

app.get("/api/readAllQuotes", (request, response) => {
  quotingTestModel.find({}, (err, result) => {
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});

app.get("/api/getRandom", (request, response) => {
  quotingTestModel.aggregate([{ $sample: { size: 1 } }], (err, result) => {
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});

app.post("/api/add", async (request, response) => {
  const user = request.body;
  const quote1 = new quotingTestModel(user);
  await quote1.save();

  response.send(user); // this returns the info from the backend to the frontend
});

app.put("/api/update", async (request, response) => {
  const id = request.body.id;
  const updateQuote = request.body.updateQuote;
  const updateAuthor = request.body.updateAuthor;

  try {
    await quotingTestModel.findById(id, (err, QuoteToUpdate) => {
      QuoteToUpdate.quote = updateQuote;
      QuoteToUpdate.author = updateAuthor;

      QuoteToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  response.send("updated");
});

app.delete("/api/delete/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await quotingTestModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
  }
  response.send("item deleted");
});

app.get("*", () => {
  // send index.html from built folder
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
