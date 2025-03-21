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
adminRouter.put("/users/:id", userController.updateUser);
adminRouter.delete("/users/:id", userController.deleteUser);

// Orders management
adminRouter.get("/orders", orderController.getOrders);
adminRouter.get("/orders/:id", orderController.getOrderById);
adminRouter.put("/orders/:id/status", orderController.updateOrderStatus);

//Pacas management
adminRouter.get("/pacas", pacaController.getPacas);
adminRouter.post("/pacas", pacaController.addPaca);
adminRouter.put("/pacas/:id", pacaController.updatePaca);
adminRouter.delete("/pacas/:id", pacaController.deletePaca);

module.exports = adminRouter;
