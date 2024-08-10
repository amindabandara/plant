const express = require('express');
const PlantGuide = require('../models/plantGuide');

const router = express.Router();

// Get all plant guides
router.get('/', async (req, res) => {
  try {
    const guides = await PlantGuide.find();
    res.json(guides);
  } catch (err) {
    console.error('Error fetching plant guides:', err);
    res.status(500).json({ error: 'Error fetching plant guides' });
  }
});

// Get a specific plant guide by ID
router.get('/:id', async (req, res) => {
  try {
    const guide = await PlantGuide.findById(req.params.id);
    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ error: 'Plant guide not found' });
    }
  } catch (err) {
    console.error('Error fetching plant guide:', err);
    res.status(500).json({ error: 'Error fetching plant guide' });
  }
});

// Add a new plant guide
router.post('/', async (req, res) => {
  try {
    const guide = new PlantGuide(req.body);
    await guide.save();
    res.status(201).json(guide);
  } catch (err) {
    console.error('Error adding plant guide:', err);
    res.status(500).json({ error: 'Error adding plant guide' });
  }
});

// Update a plant guide by ID
router.put('/:id', async (req, res) => {
  try {
    const guide = await PlantGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (guide) {
      res.json(guide);
    } else {
      res.status(404).json({ error: 'Plant guide not found' });
    }
  } catch (err) {
    console.error('Error updating plant guide:', err);
    res.status(500).json({ error: 'Error updating plant guide' });
  }
});

// Delete a plant guide by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await PlantGuide.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Plant guide deleted' });
    } else {
      res.status(404).json({ error: 'Plant guide not found' });
    }
  } catch (err) {
    console.error('Error deleting plant guide:', err);
    res.status(500).json({ error: 'Error deleting plant guide' });
  }
});

module.exports = router;
