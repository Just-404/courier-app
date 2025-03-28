const prisma = require("../db/prismaClient").prisma;
const { OrderStatus, TrackingStatus } = require("../utils/enums");

class Order {
  async createOrder({ distributor_id, total_price, paca_id, quantity }) {
    return await prisma.order.create({
      data: {
        distributor: {
          connect: { id: distributor_id },
        },
        total_price,
        status: "PENDING",
        Order_Details: {
          create: {
            paca: {
              connect: { id: paca_id },
            },
            quantity,
          },
        },
        Tracking: {
          create: {
            status: "ORIGIN_WAREHOUSE",
          },
        },
      },
    });
  }
  async getOrders(offset = 0, limit = 10, provider_id, status) {
    return await prisma.order.findMany({
      skip: offset,
      take: limit,
      where: {
        status: status || undefined,
        ...(provider_id && {
          Order_Details: {
            some: {
              paca: {
                provider_id,
              },
            },
          },
        }),
      },
      include: {
        distributor: {
          select: {
            id: true,
            name: true,
          },
        },
        transporter: {
          select: {
            id: true,
            name: true,
          },
        },
        Tracking: {
          select: {
            id: true,
            status: true,
            updatedAt: true,
          },
        },
        Order_Details: {
          select: {
            id: true,
            quantity: true,
            paca: {
              select: {
                id: true,
                name: true,
                provider: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                price: true,
                weight: true,
              },
            },
          },
        },
      },
    });
  }

  async getOrderById(id) {
    return await prisma.order.findUnique({ where: { id } });
  }

  async getOrdersByTransporter(offset, limit, transporter_id) {
    return await prisma.order.findMany({
      skip: offset,
      take: limit,
      where: { transporter_id, status: OrderStatus.ON_TRANSPORT },
      select: {
        id: true,
        distributor: { select: { name: true } },
        status: true,
        createdAt: true,
        total_price: true,
        Order_Details: {
          select: { paca: { select: { weight: true } }, quantity: true },
        },
        Tracking: {
          orderBy: { timestamp: "desc" },
          select: {
            status: true,
            updatedAt: true,
          },
        },
      },
    });
  }
  async updateOrder(id, data) {
    return await prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id) {
    return await prisma.$transaction([
      prisma.tracking.deleteMany({ where: { order_id: id } }),
      prisma.orderDetails.deleteMany({ where: { order_id: id } }),
      prisma.order.delete({ where: { id } }),
    ]);
  }
}

module.exports = new Order();
