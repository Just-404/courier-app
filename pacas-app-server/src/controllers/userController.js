const userService = require("../services/UserService");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userRoles = require("../utils/enums").Role;

const signUpAdmin = asyncHandler(async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({
      name: req.body.name,
      password: hashedPassword,
      role: req.body.role,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const signUpRegularUser = asyncHandler(async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({
      name: req.body.name,
      password: hashedPassword,
      role: userRoles.DISTRIBUTOR,
    });

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
    });

    res.status(201).json({
      msg: "User created succesfully!",
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || "Sign-up failed" });
  }
});
module.exports = {
  signUpAdmin,
  signUpRegularUser,
};
