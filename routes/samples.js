const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');
const getSample = require('../middleware/getSample') ;
const isAuthenticated = require('../middleware/isAuthenticated')
const fileUploader = require('../config/cloudinary.config');

const User = require('../models/User')



router.post('/create-sample', isAuthenticated, async (req, res) => {

  const {
    sample_file,
    sample_name,
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
    console.log("user testing", req.user)
    const sample = await Sample.create({
      creator: req.user._id,
      sample_file,
      sample_name,
      instrument,
      genres,
      key,
      bpm,
      type,
      artist_name,
      sample_image,
      pack,

    });
    console.log("sample testing", sample)

    await User.findByIdAndUpdate(req.user._id, {$push: {samples: sample._id}}, {new: true, runValidators: true})
      .then((udpatedUser) => {
        console.log("populating")
        return udpatedUser.populate('samples')
      })
      .then((populated) => {
        res.json(populated)
      })
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post('/new-sample-file', fileUploader.single('sampleFile'), async (req, res, next) => {
  res.json({sampleFile: req.file.path})
    console.log("File", req.file)
})

router.post('/new-sample-image', fileUploader.single('sampleImage'), async (req, res, next) => {
  res.json({sampleImage: req.file.path})
    console.log("File", req.file)
})

router.get('/browse-samples', async (req, res) => {
  try {
    const samples = await Sample.find().populate('samples');
    res.json(samples);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const sample = await Sample.findById(req.params.id);
  const fileStream = fileUploader.uploader.download(sample.sample_file);
  res.set({
    'Content-Disposition': `attachment; filename="${sample.sample_name}.wav"`,
    'Content-Type': 'audio/mpeg'
  });
  fileStream.pipe(res);
});

// router.put('/edit-sample/:id', fileUploader.single('sample_image'), getSample, async (req, res) => {
//   const {
//     sample_file,
//     sample_name,
//    
//     instrument,
//     genres,
//     key,
//     bpm,
//     type,
//     artist_name,
//     sample_image,
//     pack,
//   } = req.body;

//   try {
//     const updatedSample = await res.sample.set({
//       sample_file,
//       sample_name,
//  
//       instrument,
//       genres,
//       key,
//       bpm,
//       type,
//       artist_name,
//       sample_image,
//       pack,
//     }).save();
    
//     res.json(updatedSample);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });



router.get('/delete/:id', isAuthenticated, async (req, res) => {
  console.log(req.user._id)
  try {
    const sample = await Sample.findById(req.params.id);
    if (String(req.user._id) === String(sample.creator)) {
      
      await Sample.deleteOne(sample);
      
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { samples: sample._id } },
        { new: true, runValidators: true }
      ).then((updatedUser) => {
        return updatedUser.populate('samples')
      })
      .then((populated) => {
        res.json(populated)
      });
      // return res.status(200).json({ msg: "deleted successfully! :)" });
    } else {
      return res.status(401).json({ msg: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});



module.exports = router;