const express = require('express');
const router = express.Router();

const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');

router.get('/profile/:userId', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.userId)
      .populate('samples')
      .populate('packs')
      .populate('reposts')
      .populate('followers')
      .populate('following');
    res.json(foundUser);
  } catch (err) {
    console.log(err);
  }
});

router.put('/edit-profile/:userId', async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        artist_name: req.body.artist_name,
        // profile_image: req.body.profile_image,
        // location: req.body.location,
        // age: req.body.age,
        // bio: req.body.bio,
        // social_links: req.body.social_links
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;