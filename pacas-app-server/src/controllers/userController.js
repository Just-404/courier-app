const userService = require("../services/UserService");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const userRoles = require("../utils/enums").Role;

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

const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const offset = (parseInt(page) - 1) * limit;

    const users = await userService.getUsers(offset, parseInt(limit));

    const totalUsers = await userService.countUsers();

    res.status(200).json({ users, total: totalUsers });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting users" });
  }
});

const getUserById = asyncHandler(async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ msg: "User not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error fetching user" });
  }
});

const getUserByName = asyncHandler(async (req, res) => {
  try {
    const user = await userService.getUserByName(req.params.name);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || "Error fetching user" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ msg: "User updated successfully!", updatedUser });
  } catch (error) {
    if (error.code === "P2002") {
      const fieldError = error.meta?.target?.[0] || "field";
      return res
        .status(400)
        .json({ error: `This ${fieldError} already exists!` });
    }
    res.status(400).json({ error: error.message || "Error updating user" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const adminId = process.env.PROTECTED_ADMIN_ID;

    if (req.params.id === adminId) {
      return res.status(403).json({ error: "Cannot delete the main admin" });
    }
    await userService.deleteUser(req.params.id);
    res.status(200).json({ msg: "User deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error deleting user" });
  }
});
module.exports = {
  signUpRegularUser,
  getUsers,
  getUserById,
  getUserByName,
  updateUser,
  deleteUser,
};
