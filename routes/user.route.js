const UserController = require("../controllers/user.controller");
const userRouter = require("express").Router();

userRouter.post("/", UserController.creatUser);

module.exports = userRouter;
