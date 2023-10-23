const User = require("../models/user.model");

module.exports.getUser = async (body) => {
  return await User.findOne(body);
};

module.exports.createUser = async (body) => {
  return await User.create(body);
};
