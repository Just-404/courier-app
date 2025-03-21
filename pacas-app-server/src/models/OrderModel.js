const prisma = require("../db/prismaClient").prisma;

class Order {
  async getOrders(offset = 0, limit = 10) {
    return await prisma.order.findMany({
      skip: offset * limit,
      take: limit,
    });
  }

  async getOrderById(id) {
    return await prisma.order.findUnique({ where: { id } });
  }

  async updateOrderStatus(id, status) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}

module.exports = new Order();
