const userService = require("../services/UserService");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userRoles = require("../utils/enums").Role;

const signUpForAdmin = asyncHandler(async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.createUser({
      name: req.body.name,
      password: hashedPassword,
      role: req.body.role,
    });

    res.status(201).json({
      msg: "User created succesfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = { signUpForAdmin };
