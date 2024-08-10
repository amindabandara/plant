const express = require('express');
const router = express.Router();
const Thread = require('../models/thread'); // Ensure correct model path

// Get all threads
router.get('/', async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discussions' });
  }
});

// Get a specific thread by ID
router.get('/:id', async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
});

// Create a new thread
router.post('/', async (req, res) => { // Changed endpoint to '/'
  try {
    const newThread = new Thread(req.body);
    const savedThread = await newThread.save();
    res.status(201).json(savedThread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

// Add a message to a thread
router.post('/:id/messages', async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ error: 'Thread not found' });
    }

    // Create a new message
    const newMessage = {
      content: req.body.content,
      user: req.body.user || 'Anonymous' // Optional user tracking
    };

    // Add the new message to the thread
    thread.messages.push(newMessage);
    const updatedThread = await thread.save();

    res.status(201).json(updatedThread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post message' });
  }
});

module.exports = router;
