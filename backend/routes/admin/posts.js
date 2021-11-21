const express = require("express");
const router = express.Router();
const { authAdmin } = require("../../middleware/index");
const Post = require("../../models/Post");

router.post("/", authAdmin, async (req, res, next) => {
  try {
    const newPost = new Post({ ...req.body, user: req.user._id });
    await newPost.save();
    res.status(200).end();
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
