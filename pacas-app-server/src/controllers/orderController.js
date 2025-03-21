const orderService = require("../services/OrderService");
const asyncHandler = require("express-async-handler");

const getOrders = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrders(offset, parseInt(limit));

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting orders" });
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

module.exports = {
  getOrders,
  getOrderById,
  updateOrderStatus,
};
