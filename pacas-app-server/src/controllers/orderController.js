const asyncHandler = require("express-async-handler");
const orderService = require("../services/OrderService");
const pacaService = require("../services/PacaService");
const trackingService = require("../services/TrackingService");
const { OrderStatus, TrackingStatus } = require("../utils/enums");

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
    const {
      page = 1,
      limit = 10,
      provider_id,
      orderStatus,
      trackingStatus,
    } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrders(
      offset,
      parseInt(limit),
      provider_id,
      orderStatus,
      trackingStatus
    );
    res.status(200).json({ orders, total: orders.length });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error getting orders" });
  }
});

const getOrdersByStatus = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, status, provider_id = null } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrders(
      offset,
      parseInt(limit),
      provider_id,
      status
    );

    res.status(200).json({ orders, total: orders.length });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error getting orders by provider" });
  }
});

const getDistributorTrackingOrders = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      distributor_id,
      orderStatus,
      trackingStatus,
    } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await trackingService.getDistributorTrackingOrders(
      offset,
      parseInt(limit),
      distributor_id,
      orderStatus,
      trackingStatus
    );
    if (!orders.length) {
      return res.status(404).json({ error: "No orders found" });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      distributor: order.distributor.name,
      orderStatus: order.status,
      total_price: order.total_price,
      createdAt: order.createdAt,
      pacaName: order.Order_Details[0].paca.name,
      totalWeight: order.Order_Details.reduce(
        (sum, detail) => sum + detail.quantity * detail.paca.weight,
        0
      ),
      currentTrackingStatus: order.Tracking[0]?.status || "No tracking info",
      timestamp: order.Tracking[0]?.updatedAt,
    }));

    res.status(200).json({ orders: formattedOrders, total: orders.length });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error getting distributor orders" });
  }
});
const getDeliveredOrders = asyncHandler(async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      transporter_id,
      distributor_id,
      provider_id,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const filter = {};
    if (transporter_id) filter.transporter_id = transporter_id;
    if (distributor_id) filter.distributor_id = distributor_id;
    if (provider_id) filter.provider_id = provider_id;

    const orders = await trackingService.getDeliveredOrders(
      offset,
      parseInt(limit),
      filter
    );

    if (!orders.length) {
      return res.status(404).json({ error: "No delivered orders found" });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      distributor: order.distributor.name,
      orderStatus: order.status,
      total_price: order.total_price,
      createdAt: order.createdAt,
      pacaName: order.Order_Details[0].paca.name,
      totalWeight: order.Order_Details.reduce(
        (sum, detail) => sum + detail.quantity * detail.paca.weight,
        0
      ),
      currentTrackingStatus: order.Tracking[0]?.status || "No tracking info",
      timestamp: order.Tracking[0]?.updatedAt,
    }));

    res.status(200).json({ orders: formattedOrders, total: orders.length });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error getting delivered orders" });
  }
});

const getTransporterOrders = asyncHandler(async (req, res) => {
  try {
    const { transporter_id, page = 1, limit = 10 } = req.params;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const orders = await orderService.getOrdersByTransporter(
      offset,
      parseInt(limit),
      transporter_id
    );

    if (!orders.length) {
      return res
        .status(404)
        .json({ error: "No orders taken by this transporter" });
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      distributor: order.distributor.name,
      orderStatus: order.status,
      total_price: order.total_price,
      createdAt: order.createdAt,
      totalWeight: order.Order_Details.reduce(
        (sum, detail) => sum + detail.quantity * detail.paca.weight,
        0
      ),
      currentTrackingStatus: order.Tracking[0].status || "No tracking info",
      timestamp: order.Tracking[0].updatedAt,
    }));

    res.status(200).json({ orders: formattedOrders, total: orders.length });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error getting transporter orders" });
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
    const updatedOrder = await orderService.updateOrder(req.params.id, {
      status,
    });

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

const updateOrderForTransporter = asyncHandler(async (req, res) => {
  try {
    const { order_id, transporter_id } = req.body;

    const existingOrder = await orderService.getOrderById(order_id);

    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (existingOrder.transporter_id) {
      return res
        .status(400)
        .json({ error: "Order already taken by another transporter" });
    }

    const [updatedOrder, trackingInfo] = await Promise.all([
      orderService.updateOrder(order_id, {
        transporter_id,
        status: OrderStatus.ON_TRANSPORT,
      }),
      trackingService.createTracking({
        order_id,
        status: TrackingStatus.ORIGIN_WAREHOUSE,
      }),
    ]);

    return res.status(200).json({
      msg: "Order successfully taken by transporter",
      order: updatedOrder,
      tracking: trackingInfo,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error taking order for transporter" });
  }
});

const updateTrackingStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (status === TrackingStatus.LOCAL_WAREHOUSE) {
      const trackingInfo = await trackingService.updateTrackingStatus(
        orderId,
        status
      );

      if (!trackingInfo) {
        return res.status(404).json({ error: "Tracking not found" });
      }
      const orderUpdate = await orderService.updateOrder(orderId, {
        status: OrderStatus.ON_WAREHOUSE,
      });

      if (!orderUpdate) {
        return res
          .status(404)
          .json({ error: "Order not found or update failed" });
      }

      res.status(200).json({
        msg: "Tracking status and order status updated successfully!",
        tracking: trackingInfo,
        order: orderUpdate,
      });
    } else {
      const trackingInfo = await trackingService.updateTrackingStatus(
        orderId,
        status
      );

      if (!trackingInfo) {
        return res.status(404).json({ error: "Tracking not found" });
      }

      res.status(200).json({
        msg: "Tracking status updated successfully!",
        tracking: trackingInfo,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error updating tracking status" });
  }
});

const updateMultipleTrackingStatus = asyncHandler(async (req, res) => {
  try {
    const { orderIds, status } = req.body;
    if (!orderIds || orderIds.length === 0) {
      return res.status(400).json({ error: "No order IDs provided" });
    }
    if (!status) {
      return res.status(400).json({ error: "No status provided" });
    }
    const updatedOrders = await trackingService.updateMultipleTrackingStatus(
      orderIds,
      status
    );
    if (!updatedOrders) {
      return res.status(404).json({ error: "Orders not found" });
    }

    if (updatedOrders.count === 0) {
      return res.status(404).json({ error: "No orders were updated" });
    }
    res.status(200).json({
      msg: "Orders status updated successfully!",
      orders: updatedOrders,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || "Error updating multiple orders status",
    });
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

    const updatedOrder = await orderService.updateOrder(id, {
      status: "CANCELLED",
    });
    res
      .status(200)
      .json({ msg: "Order cancelled successfully", order: updatedOrder });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error cancelling order" });
  }
});

const returnTransporterOrder = asyncHandler(async (req, res) => {
  try {
    console.log("Returning order");

    const { orderId } = req.body;

    await trackingService.returnTransporterOrder(orderId);

    res.status(200).json({ msg: "Order returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error returning order" });
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
  getOrdersByStatus,
  getTransporterOrders,
  getDeliveredOrders,
  getDistributorTrackingOrders,
  updateOrderStatus,
  updateTrackingStatus,
  updateMultipleTrackingStatus,
  cancelOrder,
  returnTransporterOrder,
  deleteOrder,
  updateOrderForTransporter,
};
