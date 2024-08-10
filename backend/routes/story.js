const express = require('express');
const router = express.Router();
const Story = require('../models/sucessstory');

// Add a new story
router.post("/addstory", async (req, res) => {
  const { username, story } = req.body;

  const newStory = new Story({
    username,
    story
  });

  try {
    await newStory.save();
    res.json({ status: 'Story Added', story: newStory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 'error with adding Story', error: err.message });
  }
});

// Get all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error", error: err.message });
  }
});

// Get a specific story by ID
router.get("/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ status: "error", error: "Story not found" });
    }
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error", error: err.message });
  }
});

// Update a specific story by ID
router.put("/:id", async (req, res) => {
  const { username, story } = req.body;

  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { username, story },
      { new: true, runValidators: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ status: "error", error: "Story not found" });
    }

    res.json({ status: 'Story Updated', story: updatedStory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 'error with updating Story', error: err.message });
  }
});

// Delete a specific story by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);

    if (!deletedStory) {
      return res.status(404).json({ status: "error", error: "Story not found" });
    }

    res.json({ status: 'Story Deleted', story: deletedStory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 'error with deleting Story', error: err.message });
  }
});

module.exports = router;
