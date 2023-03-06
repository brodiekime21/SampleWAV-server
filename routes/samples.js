const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');

const fileUploader = require('../config/cloudinary.config')


router.post('/samples', async (req, res) => {
  try {
    const sample = new Sample(req.body);
    const savedSample = await sample.save();
    res.status(201).json(savedSample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/samples', async (req, res) => {
  try {
    const samples = await Sample.find();
    res.status(200).json(samples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/samples/:id', getSample, (req, res) => {
  res.status(200).json(res.sample);
});

router.put('/samples/:id', getSample, async (req, res) => {
  try {
    const updatedSample = await res.sample.set(req.body).save();
    res.status(200).json(updatedSample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/samples/:id', getSample, async (req, res) => {
  try {
    await res.sample.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a Sample by ID
async function getSample(req, res, next) {
  try {
    const sample = await Sample.findById(req.params.id);
    if (sample == null) {
      return res.status(404).json({ message: 'Cannot find Sample' });
    }
    res.sample = sample;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;