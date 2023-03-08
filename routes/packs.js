const express = require('express');
const router = express.Router();
const Sample = require('../models/Sample');
const Pack = require('../models/Pack')
const getSample = require('../middleware/getSample') ;
const getPack = require('../middleware/getPack')
const isAuthenticated = require('../middleware/isAuthenticated')
const fileUploader = require('../config/cloudinary.config');

const User = require('../models/User')

//havent done anything here yet

router.post('/create-pack', isAuthenticated, async (req, res) => {
  console.log("this is req.body",req.body)
  const {
    samples,
    pack_name,
    instruments,
    genres,
    pack_image,
    number_of_reposts,
    number_of_downloads,
  } = req.body;

  try {
    console.log("user testing", req.user)
    const pack = await Pack.create({
      creator: req.user._id,
      samples,
      pack_name,
      instruments,
      genres,
      pack_image,
      number_of_reposts,
      number_of_downloads,
    });
    console.log("pack testing", pack)

    await User.findByIdAndUpdate(req.user._id, {$push: {packs: pack._id}}, {new: true, runValidators: true})
      .then((udpatedUser) => {
        console.log("populating")
        return udpatedUser.populate('packs')
      })
      .then((populated) => {
        res.json(populated)
      })
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post('/new-pack-image', fileUploader.single('packImage'), async (req, res, next) => {
  res.json({packImage: req.file.path})
    console.log("File", req.file)
})

router.get('/browse-packs', async (req, res) => {
  try {
    const packs = await Pack.find();
    res.json(packs);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/pack-details/:id', async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id).populate('creator').populate('samples');
    res.json(pack);
  } catch (err) {
    res.json({ message: err.message });
  }
});



// router.put('/edit-sample/:id', fileUploader.single('sample_image'), getSample, async (req, res) => {
//   const {
//     sample_file,
//     sample_name,
//     music_tags,
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
//       music_tags,
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
    const pack = await Pack.findById(req.params.id);
    if (String(req.user._id) === String(pack.creator)) {
      
      await Pack.deleteOne(pack);
      
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { packs: pack._id } },
        { new: true, runValidators: true }
      ).then((updatedUser) => {
        return updatedUser.populate('packs')
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