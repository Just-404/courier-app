const { Router } = require("express");
const userController = require("../../controllers/userController");
const adminController = require("../../controllers/adminController");
const orderController = require("../../controllers/orderController");
const pacaController = require("../../controllers/pacaController");
const userAuth = require("../../controllers/authController");
const adminRouter = Router();

adminRouter.use(userAuth.isAdmin);

//Users management
adminRouter.get("/users", userController.getUsers);
adminRouter.post("/users/sign-up", adminController.signUpForAdmin);
adminRouter.put("/profile/change-password", userController.updateUserPassword);
adminRouter.put("/users/:id", userController.updateUserName);
adminRouter.delete("/users/:id", userController.deleteUser);

// Orders management
adminRouter.get("/orders", orderController.getOrders);
adminRouter.get("/orders/:id", orderController.getOrderById);
adminRouter.put("/orders/:id/status", orderController.updateOrderStatus);
adminRouter.put("/orders/:id", orderController.cancelOrder);
adminRouter.delete("/orders/:id", orderController.deleteOrder);
//Pacas management
adminRouter.get("/pacas", pacaController.getPacas);
adminRouter.post("/pacas", pacaController.addPaca);
adminRouter.put("/pacas/:id", pacaController.updatePaca);
adminRouter.delete("/pacas/:id", pacaController.deletePaca);

module.exports = adminRouter;
