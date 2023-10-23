const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.genarateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "365d" }
  );
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUser({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }
    const token = this.genarateAccessToken(user);
    return res
      .status(200)
      .json({ success: true, message: "Login successfully", user, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUser({ _id: req.user.id });
    return res.status(200).json({
      success: true,
      message: "Get current user successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
