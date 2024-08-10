const mongoose = require('mongoose');

const videoTutorialSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  tags: [String],
});

module.exports = mongoose.model('VideoTutorial', videoTutorialSchema);
