const { Router } = require("express");
const orderController = require("../../controllers/orderController");
const pacaController = require("../../controllers/pacaController");
const userAuth = require("../../controllers/authController");
const distributorRouter = Router();

// Orders management
distributorRouter.post("/orders", orderController.createOrder);
distributorRouter.get("/orders", orderController.getOrders);
distributorRouter.get("/orders/delivered", orderController.getDeliveredOrders);
distributorRouter.get(
  "/orders/orders-tracking",
  orderController.getDistributorTrackingOrders
);
distributorRouter.get("/orders/:id", orderController.getOrderById);
distributorRouter.put("/orders/:id/status", orderController.updateOrderStatus);

//Pacas management
distributorRouter.get("/pacas", pacaController.getPacas);
distributorRouter.post("/pacas", pacaController.addPaca);
distributorRouter.put("/pacas/:id", pacaController.updatePaca);
distributorRouter.delete("/pacas/:id", pacaController.deletePaca);

module.exports = distributorRouter;
