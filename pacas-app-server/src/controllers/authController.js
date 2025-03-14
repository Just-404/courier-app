const userRole = require("../utils/enums").Role;
const isAuth = (req, res, next) => {
  console.log("server: ", req.isAuthenticated());

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
module.exports = {
  isAuth,
  isAdmin,
};
