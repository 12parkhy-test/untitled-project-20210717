const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/index");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const PostComment = require("../models/PostComment");

router.get("/maintopslideposts", async (req, res, next) => {
  try {
    const posts = await Post.find({ mainTopSlide: true });

    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/latestposts", async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(4);

    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post(
  "/addpostcomment/posts/:postId/comments",
  auth,
  async (req, res, next) => {
    const { postId } = req.params;
    const { content } = req.body;
    try {
      let newPostComment = new PostComment({
        postId,
        content,
        user: req.user._id,
      });
      let savedPostComment = await newPostComment.save();
      await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: savedPostComment._id,
          },
        },
        { new: true }
      );

      let final = await savedPostComment
        .populate({ path: "user" })
        .execPopulate();

      res.status(200).json(final);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
);

router.delete(
  "/deletepostcomment/posts/:postId/comments/:commentId",
  auth,
  async (req, res, next) => {
    const { postId, commentId } = req.params;

    try {
      await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $pull: {
            comments: commentId,
          },
        },
        { new: true }
      );

      await PostComment.findByIdAndRemove({
        _id: commentId,
      });

      res.status(200).end();
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
);

router.put(
  "/editpostcomment/posts/:postId/comments/:commentId",
  auth,
  async (req, res, next) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    try {
      let updated = await PostComment.findByIdAndUpdate(
        { _id: commentId },
        {
          content,
        },
        { new: true }
      );

      let final = await updated.populate({ path: "user" }).execPopulate();

      res.status(200).json(final);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
);

module.exports = router;
