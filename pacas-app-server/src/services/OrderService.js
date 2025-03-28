const orderModel = require("../models/OrderModel");
const pacaModel = require("../models/PacaModel");

class OrderService {
  async createOrder(orderInfo, paca) {
    const newOrder = await orderModel.createOrder(orderInfo);
    await pacaModel.updatePaca(orderInfo.paca_id, {
      quantity: paca.quantity - orderInfo.quantity,
      status: paca.quantity - orderInfo.quantity === 0 ? "SOLD" : paca.status,
    });

    return newOrder;
  }
  async getOrders(offset, limit, provider_id = null, status = null) {
    return await orderModel.getOrders(offset, limit, provider_id, status);
  }
  async getOrderById(id) {
    return await orderModel.getOrderById(id);
  }

  async getOrdersByTransporter(offset, limit, transporter_id) {
    return await orderModel.getOrdersByTransporter(
      offset,
      limit,
      transporter_id
    );
  }
  async updateOrder(id, data) {
    return await orderModel.updateOrder(id, data);
  }
  async deleteOrder(id) {
    return await orderModel.deleteOrder(id);
  }
}

module.exports = new OrderService();
