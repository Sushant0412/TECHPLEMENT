import mongoose from "mongoose";
import Quote from "./Quote.js";

const connectAndSeedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Quotes", {});
    console.log("Connected to MongoDB");
    await seedDB();
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error connecting and seeding:", error);
  }
};

const seedDB = async () => {
  try {
    //await Quote.deleteMany({});

    for (let i = 0; i < 100; i++) {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "UA31UHAU/g08pyyIr/RkKA==MtQNgUEwQ07Qhdjn" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      const q = new Quote({
        quote: data[0].quote,
        author: data[0].author,
        category: data[0].category,
      });

      await q.save();
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

connectAndSeedDB();
