const AuthController = require("../controllers/auth.controller");
const authRouter = require("express").Router();
const middlewareAuth = require("../middlewares/auth.middleware");

authRouter.post("/login", AuthController.login);
authRouter.get(
  "/currentUser",
  middlewareAuth.verifyToken,
  AuthController.getCurrentUser
);

module.exports = authRouter;
