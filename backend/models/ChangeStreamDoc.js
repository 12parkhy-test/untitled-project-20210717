const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChangeStreamDocSchema = new Schema(
  {
    item_id: {
      type: Schema.Types.ObjectId,
      refPath: "item_type",
    },
    item_type: {
      type: String,
      required: true,
      enum: ["user", "post_comment"],
    },
  },
  { timestamps: true }
);

const ChangeStreamDoc = mongoose.model(
  "change_stream_doc",
  ChangeStreamDocSchema
);

module.exports = ChangeStreamDoc;
