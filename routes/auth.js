var express = require("express");
var router = express.Router();

const User = require('../models/User')

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const isAuthenticated = require('../middleware/isAuthenticated')


router.post("/signup", (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.artist_name) {
    return res.status(400).json({ message: "please fill out all fields" });
  }

  User.findOne({ email: req.body.email  })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "You've already registered. Please sign in." });
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        User.create({
          password: hashedPass,
          email: req.body.email,
          artist_name: req.body.artist_name
        })
          .then((createdUser) => {
            const payload = { _id: createdUser._id, email: createdUser.email, artist_name: createdUser.artist_name };

            const token = jwt.sign(payload, process.env.SECRET, {
              algorithm: "HS256",
              expiresIn: "168hr",
            });
            res.json({ token: token, _id: createdUser._id, message: `Welcome ${createdUser.artist_name}`  });
          })
          .catch((err) => {
            res.status(400).json(err.message);
          });
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "please fill out both fields" });
  }

  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "Email or Password is incorrect!!!" });
      }

      const doesMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (doesMatch) {
        const payload = { _id: foundUser._id, email: foundUser.email, artist_name: foundUser.artist_name, profile_image: foundUser.profile_image, location: foundUser.location, samples: foundUser.samples };

        const token = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "24hr",
        });
        res.json({ token: token, _id: foundUser._id, message: `Welcome ${foundUser.artist_name}` });
      } else {
        return res.status(402).json({ message: "Email or password is incorrect. Please try again." });
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});





router.get("/verify", isAuthenticated, (req, res) => {
  return res.status(200).json(req.user);
});


module.exports = router;