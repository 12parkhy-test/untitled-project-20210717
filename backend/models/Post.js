const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostImageSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
    storagePath: {
      type: String,
      //required: true,
    },
    type: {
      type: String,
      //required: true,
    },
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    mainTopSlide: {
      type: Boolean,
      default: false,
      // required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      //required: true
    },
    title: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      //required: true,
    },
    images: {
      type: [PostImageSchema],
    },
    comments: {
      type: [{ type: Schema.Types.ObjectId, ref: "post_comment" }],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
