const NotificationController = require("../controllers/notification.controller");
const notificationRouter = require("express").Router();
const middlewareAuth = require("../middlewares/auth.middleware");

notificationRouter.post(
  "/",
//   middlewareAuth.verifyToken,
  NotificationController.createNotification
);

module.exports = notificationRouter;
