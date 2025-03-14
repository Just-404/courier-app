const { Router } = require("express");
const userController = require("../controllers/userController");
const signUpRouter = Router();

signUpRouter.post("/sign-up", userController.signUpRegularUser);

module.exports = signUpRouter;
