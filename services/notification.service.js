const Notification = require("../models/notification.model");

module.exports.createNotification = async (body) => {
  return await Notification.create(body);
};

module.exports.getAllNotification = async () => {
  return await Notification.find();
};
