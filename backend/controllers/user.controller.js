const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

module.exports.creatUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userService.getUser({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const newUser = await userService.createUser({
      email,
      password: hashed,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "Create user successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
