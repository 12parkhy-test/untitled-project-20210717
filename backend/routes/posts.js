const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/index");
const Post = require("../models/Post");

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/:postId", auth, async (req, res, next) => {
  try {
    const post = await Post.findById({ _id: req.params.postId }).populate({
      path: "comments",
      populate: { path: "user" },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
