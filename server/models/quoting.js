import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quotingSchema = new Schema({
  // could also be written as mongoose.Schema if mongoose wasnt destructured
  author: { type: String },
  quote: { type: String },
});

const quotingTestModel = model("quotingTest", quotingSchema); // "quoting" is the collection name in our DB

export default quotingTestModel;
