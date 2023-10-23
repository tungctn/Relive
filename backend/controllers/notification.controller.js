const notificationService = require("../services/notification.service");
const { scheduleNotification } = require("../events/notification");
const logger = require("../utils/logger");

module.exports.createNotification = async (req, res) => {
  try {
    logger.info(req.body);
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    const newNotification = await notificationService.createNotification({
      ...req.body,
      start: `${year}-${month}-${day}`,
      time: { hour: Number(req.body.hour), minute: Number(req.body.minute) },
    });
    await scheduleNotification(newNotification);
    return res.status(200).json({
      success: true,
      message: Date.now().toString(),
      notification: newNotification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
