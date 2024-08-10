const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SuccessSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: true
  }
});

const Story = mongoose.model('Story', SuccessSchema);
module.exports = Story;
