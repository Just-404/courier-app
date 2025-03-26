const orderService = require("../services/OrderService");
const asyncHandler = require("express-async-handler");
const pacaService = require("../services/PacaService");

const createOrder = asyncHandler(async (req, res) => {
  try {
    const orderInfo = ({ distributor_id, total_price, paca_id, quantity } =
      req.body);

    const paca = await pacaService.getPacaByID(paca_id);

    if (!paca) {
      return res.status(401).json({ error: "This paca doesn't exist" });
    }

    const newOrder = await orderService.createOrder(orderInfo, paca);

    res
      .status(201)
      .json({ msg: "Order created successfully!", order: newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error creating order" });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, provider_id } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrders(
      offset,
      parseInt(limit),
      provider_id
    );
    console.log(orders);

    res.status(200).json({ orders, total: orders.length });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting orders" });
  }
});

const getOrderByProvider = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrdersByProvider(
      offset,
      parseInt(limit),
      req.params.provider_id
    );

    res.status(200).json({ orders, total: orders.length });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error getting orders by provider" });
  }
});
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error fetching order" });
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      status
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      msg: "Order status updated successfully!",
      order: updatedOrder,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error updating order status" });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const orderExists = await orderService.getOrderById(id);

    if (!orderExists) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (orderExists.status === "CANCELLED") {
      return res.status(400).json({ error: "Order is already cancelled" });
    }

    const updatedOrder = await orderService.updateOrderStatus(id, "CANCELLED");
    res
      .status(200)
      .json({ msg: "Order cancelled successfully", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error cancelling order" });
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const orderExists = await orderService.getOrderById(req.params.id);

    if (!orderExists) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (!orderExists.status === "CANCELLED") {
      return res
        .status(400)
        .json({ error: "Order is not cancelled to be deleted" });
    }
    await orderService.deleteOrder(req.params.id);

    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error deleting order" });
  }
});
module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByProvider,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
};
