const orderModel = require("../models/OrderModel");

class OrderService {
  async getOrders(offset, limit) {
    return await orderModel.getOrders(offset, limit);
  }
  async getOrderById(id) {
    return await orderModel.getOrderById(id);
  }
  async updateOrderStatus(id, status) {
    return await orderModel.updateOrderStatus(id, status);
  }
}

module.exports = new OrderService();
