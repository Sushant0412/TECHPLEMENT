import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Quote from "./Quote.js";
import cors from "cors"

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// MongoDB connection setup
mongoose
  .connect("mongodb://localhost:27017/Quotes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route to fetch quotes by author
app.post("/quotes/author", async (req, res) => {
  const { author } = req.body;
  try {
    const quotes = await Quote.find({ author });
    res.json(quotes);
  } catch (err) {
    console.error("Error fetching quotes by author:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
