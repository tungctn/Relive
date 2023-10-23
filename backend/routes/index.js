const appRouter = require("express").Router();
const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const notificationRouter = require("./notification.route");

appRouter.use("/user", userRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/notification", notificationRouter);

module.exports = appRouter;
