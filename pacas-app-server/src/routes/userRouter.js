const { Router } = require("express");
const userController = require("../controllers/userController");
const adminRouter = require("../routes/users/adminRouter");
const providerRouter = require("../routes/users/providerRouter");
const transporterRouter = require("../routes/users/transporterRouter");
const distributorRouter = require("../routes/users/distributorRouter");
const userRouter = Router();

const { Role } = require("../utils/enums");

userRouter.put("/profile/change-password/", userController.updateUserPassword);
userRouter.put("/profile/change-name/:id", userController.updateUserName);

userRouter.use((req, res, next) => {
  switch (req.user.role) {
    case Role.ADMIN:
      adminRouter(req, res, next);
      break;
    case Role.PROVIDER:
      providerRouter(req, res, next);
      break;
    case Role.TRANSPORTER:
      transporterRouter(req, res, next);
      break;
    case Role.DISTRIBUTOR:
      distributorRouter(req, res, next);
      break;
    default:
      res.status(403).json({ msg: "Role doesn't exist" });
  }
});

module.exports = userRouter;
