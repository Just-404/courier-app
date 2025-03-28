const { Router } = require("express");
const pacaController = require("../../controllers/pacaController");
const orderController = require("../../controllers/orderController");
const userAuth = require("../../controllers/authController");

const providerRouter = Router();

providerRouter.use(userAuth.isProvider);

// Pacas Management
providerRouter.get("/pacas", pacaController.getPacas);
providerRouter.post("/pacas", pacaController.addPaca);
providerRouter.put("/pacas/:id", pacaController.updatePaca);
providerRouter.delete("/pacas/:id", pacaController.deletePaca);

// Orders Received (View orders made for provider's pacas)
providerRouter.get("/orders", orderController.getOrders);
// providerRouter.get("/orders/:id", orderController.getOrderById);
providerRouter.put("/orders/:id/status", orderController.updateOrderStatus);

module.exports = providerRouter;
