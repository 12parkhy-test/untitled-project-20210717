const mongoose = require("mongoose");
const ChangeStreamDoc = require("../models/ChangeStreamDoc");

const changeStreamFunc = (io) => {
  const connection = mongoose.connection;
  connection.once("open", () => {
    const postCommentsChangeStream = connection
      .collection("post_comments")
      .watch();

    const tempFunc = async (changeStream, collType) => {
      changeStream.on("change", async (change) => {
        switch (change.operationType) {
          case "insert":
            let newChangeStreamDoc = new ChangeStreamDoc({
              item_id: change.fullDocument._id,
              item_type: "post_comment",
            });

            let savedChangeStreamDoc = await newChangeStreamDoc.save();
            io.of("/socket/changestream").emit(
              "change_stream",
              savedChangeStreamDoc
            );
            break;
        }
      });
    };

    tempFunc(postCommentsChangeStream, "user");
  });
};

module.exports = { changeStreamFunc };
