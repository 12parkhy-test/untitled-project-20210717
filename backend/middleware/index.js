const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token)
    return res
      .status(401)
      .json({ msg: "There is no token. Authorization denied." });

  try {
    const verfied = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findOne({ uid: verfied.uid });
    req.user = foundUser;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid token." });
  }
};

const authAdmin = async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token)
    return res
      .status(401)
      .json({ msg: "There is no token. Authorization denied." });

  try {
    const verfied = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await User.findOne({ uid: verfied.uid });

    if (!foundUser.isAdmin) {
      return res.status(400).json({ msg: "Only admin is allowed." });
    }
    req.user = foundUser;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid token." });
  }
};

module.exports = { auth, authAdmin };
