const admin = require("../config/firebase");
const Notification = require("../models/notification.model");
const agenda = require("../config/agenda");
const logger = require("../utils/logger");

const sendNotification = async (message, deviceToken) => {
  const payload = {
    notification: {
      title: "Thông báo mới",
      body: `${message.title}/${message.content}`,
    },
    token: deviceToken,
  };

  try {
    const response = await admin.messaging().send(payload);
    logger.info("Successfully sent message:", response);
  } catch (error) {
    logger.error("Error sending message:", error);
  }
};

const scheduleNotification = async (notification) => {
  let currentDate = new Date(notification.start);
  const specificTime = new Date(currentDate);
  specificTime.setHours(notification.time.hour);
  specificTime.setMinutes(notification.time.minute);
  specificTime.setSeconds(0);
  specificTime.setMilliseconds(0);

  logger.info(`Schedule notification: at ${specificTime}`);
  logger.info(`Schedule notification: ${notification._id} at ${specificTime}`);

  await agenda.schedule(specificTime, "send notification", {
    notificationId: notification._id,
    notificationTitle: notification.title,
    notificationContent: notification.content,
  });
};

agenda.define("send notification", async (job, done) => {
  const notificationId = job.attrs.data.notificationId;
  const notificationTitle = job.attrs.data.notificationTitle;
  const notificationContent = job.attrs.data.notificationContent;
  const notification = await Notification.findById(notificationId);
  const deviceToken = notification.deviceToken;
  logger.info(`Sending notification: ${notificationId} to ${deviceToken}`);
  if (!notification) {
    return done(new Error(`Notification not found: ${notificationId}`));
  }
  const message = {
    title: notificationTitle,
    content: notificationContent,
  };
  await sendNotification(message, deviceToken);
  logger.info(`Sending notification: ${message} to ${deviceToken}`);

  let nextDate = new Date(notification.start);
  nextDate.setDate(nextDate.getDate() + 1);
  let year = nextDate.getFullYear();
  let month = nextDate.getMonth() + 1;
  let day = nextDate.getDate();
  logger.info(
    `Next notification: ${notification._id} at ${
      nextDate.toISOString().split("T")[0]
    }`
  );
  notification.start = `${year}-${month}-${day}`;
  await notification.save();
  await scheduleNotification(notification);
  done();
});

const scheduleAllNotifications = async () => {
  const allNotifications = await Notification.find({});

  for (const notification of allNotifications) {
    await scheduleNotification(notification);
  }
};

agenda.on("ready", async function () {
  logger.info("Agenda is ready!");
  await scheduleAllNotifications();
});

(async function () {
  await agenda.start();
})();

module.exports.scheduleNotification = scheduleNotification;
