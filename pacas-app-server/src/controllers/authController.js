const userRole = require("../utils/enums").Role;
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      msg: "You are not Authorized to see this page. You must log in.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === userRole.ADMIN) {
    next();
  } else {
    res.status(401).json({
      msg:
        "You are not Authorized to see this page. You must be " +
        userRole.ADMIN,
    });
  }
};

const isProvider = (req, res, next) => {
  if (req.user.role === userRole.PROVIDER) {
    next();
  } else {
    res.status(401).json({
      msg:
        "You are not Authorized to see this page. You must be " +
        userRole.PROVIDER,
    });
  }
};
module.exports = {
  isAuth,
  isAdmin,
  isProvider,
};
