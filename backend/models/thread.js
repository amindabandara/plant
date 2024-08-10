const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the message schema
const messageSchema = new Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
  user: String // Optional: track the user who posted the message
});

// Define the thread schema
const threadSchema = new Schema({
  title: String,
  description: String,
  messages: [messageSchema] // Embed message schema within the thread schema
});

// Create the Thread model
const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
