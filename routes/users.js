const express = require('express');
const router = express.Router();

const User = require('../models/User');
const fileUploader = require('../config/cloudinary.config');
const isAuthenticated = require('../middleware/isAuthenticated')


router.get('/profile/:id', async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id)
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

router.post('/edit-profile/:id', isAuthenticated ,fileUploader.single('profile_image'), async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        artist_name: req.body.artist_name,
        profile_image: req.body.profile_image,
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