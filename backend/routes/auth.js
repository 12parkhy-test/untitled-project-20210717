const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth } = require("../middleware/index");

router.post("/register", async (req, res, next) => {
  const { email, uid } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) throw Error("A user with this email already exists");

    const newUser = new User({
      uid,
      email,
    });
    const savedUser = await newUser.save();
    if (!savedUser) throw Error("There is a problem with saving a user");

    jwt.sign({ uid }, process.env["JWT_SECRET"], (err, token) => {
      if (err) throw Error(err);
      res.status(200).json({
        user: savedUser,
        token,
      });
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, uid } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) throw Error("There is no user with this email");

    jwt.sign({ uid }, process.env["JWT_SECRET"], (err, token) => {
      if (err) throw Error(err);
      res.status(200).json({
        user,
        token,
      });
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });

    if (!user) throw Error("A user does not exist");
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
