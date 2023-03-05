
var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/profile/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .populate('samples')
    .populate('packs')
    .populate('reposts')
    .populate('followers')
    .populate('following')
    .then((foundUser) => {
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
    })
});

router.put('/edit-profile/:userId', (req, res, next) => {
  User.findByIdAndUpdate(req.params.userId, 
    {
      artist_name: req.body.artist_name,
      // profile_image: req.body.profile_image,
      // location: req.body.location,
      // age: req.body.age,
      // bio: req.body.bio,
      // social_links: req.body.social_links
    },
    {new: true}
    )
    .then((updatedUser) => {
      res.json(updatedUser)
    })
    .catch((err) => {
      console.log(err)
    })
});

module.exports = router;