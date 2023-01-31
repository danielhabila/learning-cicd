import express from "express";
import dotenv from "dotenv";
const app = express();
import mongoose from "mongoose";
// import { ObjectId } from "mongoose";
import quotingTestModel from "./models/quoting.js";
import cors from "cors";

app.use(express.json()); //express.json() is a method built in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`);

app.get("/readAllQuotes", (request, response) => {
  quotingTestModel.find({}, (err, result) => {
    //the curly braces within the find method means return everything from quotingTestModel
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});

app.get("/getRandom", (request, response) => {
  quotingTestModel.aggregate([{ $sample: { size: 1 } }], (err, result) => {
    if (err) {
      response.json(err);
    } else {
      response.json(result);
    }
  });
});

app.post("/add", async (request, response) => {
  // We are using both request and response in the .post method. We use the REQUEST here cos we can pass info from the frontend to the backend by tapping into the .body object found in the REQUEST
  const user = request.body;
  const quote1 = new quotingTestModel(user);
  await quote1.save();

  response.send(user); // this returns the info from the backend to the frontend
});

app.put("/update", async (request, response) => {
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

app.delete("/delete/:id", async (request, response) => {
  try {
    const id = request.params.id;
    await quotingTestModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err);
  }
  response.send("item deleted");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

// const id = request.params.id;
// const convertedId = ObjectId(id);
// await quotingTestModel.findByIdAndRemove(convertedId).exec();
