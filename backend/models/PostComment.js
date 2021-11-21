const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
      // required: true
    },
    content: {
      type: String,
      // required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true
    },
  },
  { timestamps: true }
);

const PostComment = mongoose.model("post_comment", PostCommentSchema);

module.exports = PostComment;
