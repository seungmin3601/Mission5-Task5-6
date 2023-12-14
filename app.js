const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://mongo:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema
const messageSchema = new mongoose.Schema({
  message: String,
});

// Create a model based on the schema
const Message = mongoose.model("Message", messageSchema);

app.get("/", async (req, res) => {
  // Insert a document into MongoDB
  const newMessage = new Message({ message: "hello world" });
  await newMessage.save();

  // Retrieve the message from MongoDB
  const result = await Message.findOne();
  const messageToShow = result ? result.message : "No message found";

  res.send(`Message from MongoDB: ${messageToShow}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
