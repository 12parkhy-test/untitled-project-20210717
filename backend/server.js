const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/authentication/", require("./routes/auth"));
app.use("/api/posts/", require("./routes/posts"));
app.use("/api/postFunctions1/", require("./routes/postFunctions1"));

app.use("/api/admin/posts/", require("./routes/admin/posts"));
app.use(
  "/api/admin/datavisualization/",
  require("./routes/admin/dataVisualization")
);
app.use("/api/admin/download/", require("./routes/admin/download"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.of("/socket/changestream").on("connection", (socket) => {
  console.log("socket.io connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io disconnected: ", socket.id);
  });
});

const { changeStreamFunc } = require("./socket/socket");

changeStreamFunc(io);
