const { Router } = require("express");
const userController = require("../controllers/userController");
const userAuth = require("../controllers/authController");
const userRouter = Router();

userRouter.post(
  "/dashboard/sign-up",
  userAuth.isAdmin,
  userController.signUpAdmin
);

module.exports = userRouter;
