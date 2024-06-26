import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: String,
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
