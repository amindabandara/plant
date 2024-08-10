const mongoose = require('mongoose');

const plantGuideSchema = new mongoose.Schema({
  title: String,
  description: String,
  plantType: String,
  difficulty: String,
  conditions: String,
  steps: [String],
});

module.exports = mongoose.model('PlantGuide', plantGuideSchema);
