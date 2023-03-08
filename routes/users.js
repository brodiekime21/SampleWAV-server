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

router.post('/edit-profile/:id', isAuthenticated , fileUploader.single('profile_image'), async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        artist_name: req.body.artist_name,
        profile_image: req.body.profile_image,
        city: req.body.city,
        country: req.body.country,
        bio: req.body.bio,
        social_media_platform: req.body.social_media_platform,
        social_media_link: req.body.social_media_link,
        
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

router.post('/new-profile-photo', fileUploader.single('profileImage'), async (req, res, next) => {
    res.json({profileImage: req.file.path})
      console.log("File", req.file)
})

router.get('/users-samples', isAuthenticated, async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// router.post('/edit-profile/:id', isAuthenticated, fileUploader.single('profile_image'), async (req, res, next) => {
//   try {
//     const { artist_name } = req.body;
//     const { path } = req.file;

//     const result = await fileUploader.uploader.upload(path, { folder: 'SampleWAV' });
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         artist_name,
//         profile_image: result.secure_url,
//       },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     console.log(err);
//   }



module.exports = router;