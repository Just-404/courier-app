const { Router } = require("express");
const orderController = require("../../controllers/orderController");
const userAuth = require("../../controllers/authController");

const transporterRouter = Router();

//transporterRouter.use(userAuth.isProvider);

// Pending orders
transporterRouter.get("/orders", orderController.getOrdersByStatus);
transporterRouter.put(
  "/tracking/return-order",
  orderController.returnTransporterOrder
);
transporterRouter.put(
  "/tracking/update-tracking-status",
  orderController.updateTrackingStatus
);
transporterRouter.put("/orders/:id", orderController.updateOrderForTransporter);

transporterRouter.put(
  "/tracking/update-multiple-status",
  orderController.updateMultipleTrackingStatus
);

transporterRouter.get(
  "/orders/transporter-orders",
  orderController.getTransporterOrders
);
transporterRouter.put("/orders/:id/status", orderController.updateOrderStatus);

module.exports = transporterRouter;
