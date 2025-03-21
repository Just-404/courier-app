const { Router } = require("express");
const adminRouter = require("../routes/users/adminRouter");
const userRouter = Router();
const { Role } = require("../utils/enums");

userRouter.use((req, res, next) => {
  1;
  switch (req.user.role) {
    case Role.ADMIN:
      adminRouter(req, res, next);
      break;
    case Role.PROVIDER:
      // future providerRouter
      break;
    case Role.TRANSPORTER:
      // future transporterRouter
      break;
    case Role.DISTRIBUTOR:
      // future distributorRouter
      break;
    default:
      res.status(403).json({ msg: "Role doesn't exist" });
  }
});

module.exports = userRouter;
