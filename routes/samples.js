const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');
const getSample = require('../middleware/getSample') ;
const isAuthenticated = require('../middleware/isAuthenticated')
const fileUploader = require('../config/cloudinary.config');



router.post('/create-sample', fileUploader.single('sample_image'),isAuthenticated, async (req, res) => {
  const {
    sample_file,
    sample_name,
    music_tags,
    instrument,
    genres,
    key,
    bpm,
    type,
    artist_name,
    sample_image,
    pack,
  } = req.body;

  try {
    const sample = await Sample.create({
      creator: req.user._id,
      sample_file,
      sample_name,
      music_tags,
      instrument,
      genres,
      key,
      bpm,
      type,
      artist_name,
      sample_image,
      pack,
    });

    res.json(sample);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post('/new-sample', fileUploader.single('sample'), async (req, res, next) => {
  res.json({sample: req.file.path})
    console.log("File", req.file)
// try {
//   // const { artist_name } = req.body;
//   // const { path } = req.file;
  
//   const result = await fileUploader.single(req.file.path, { folder: 'SampleWAV' });
//   // const updatedUser = await User.findByIdAndUpdate(
    
//   //   req.params.id,
//   //   {
//   //     artist_name,
//   //     profile_image: result.secure_url,
//   //   },
//   //   { new: true }
//   // );
//   // res.json({profile_image: result.secure_url});
// } catch (err) {
//   console.log(err);
// }
})

router.get('/browse-samples', async (req, res) => {
  try {
    const samples = await Sample.find();
    res.json(samples);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put('/edit-sample/:id', fileUploader.single('sample_image'), getSample, async (req, res) => {
  const {
    sample_file,
    sample_name,
    music_tags,
    instrument,
    genres,
    key,
    bpm,
    type,
    artist_name,
    sample_image,
    pack,
  } = req.body;

  try {
    const updatedSample = await res.sample.set({
      sample_file,
      sample_name,
      music_tags,
      instrument,
      genres,
      key,
      bpm,
      type,
      artist_name,
      sample_image,
      pack,
    }).save();
    
    res.json(updatedSample);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete('/sample/:id', getSample, async (req, res) => {
  try {
    await res.sample.remove();
    res.send();
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;