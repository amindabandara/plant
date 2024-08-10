const express = require('express');
const VideoTutorial = require('../models/videotutorial');

const router = express.Router();

// Get all video tutorials
router.get('/', async (req, res) => {
  try {
    const videos = await VideoTutorial.find();
    res.json(videos);
  } catch (err) {
    console.error('Error fetching video tutorials:', err);
    res.status(500).json({ error: 'Error fetching video tutorials' });
  }
});

// Get a specific video tutorial by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await VideoTutorial.findById(req.params.id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ error: 'Video tutorial not found' });
    }
  } catch (err) {
    console.error('Error fetching video tutorial:', err);
    res.status(500).json({ error: 'Error fetching video tutorial' });
  }
});

// Add a new video tutorial
router.post('/', async (req, res) => {
  try {
    const video = new VideoTutorial(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    console.error('Error adding video tutorial:', err);
    res.status(500).json({ error: 'Error adding video tutorial' });
  }
});

// Update a video tutorial by ID
router.put('/:id', async (req, res) => {
  try {
    const video = await VideoTutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ error: 'Video tutorial not found' });
    }
  } catch (err) {
    console.error('Error updating video tutorial:', err);
    res.status(500).json({ error: 'Error updating video tutorial' });
  }
});

// Delete a video tutorial by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await VideoTutorial.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Video tutorial deleted' });
    } else {
      res.status(404).json({ error: 'Video tutorial not found' });
    }
  } catch (err) {
    console.error('Error deleting video tutorial:', err);
    res.status(500).json({ error: 'Error deleting video tutorial' });
  }
});

module.exports = router;
