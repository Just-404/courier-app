const { OrderStatus, TrackingStatus } = require("../utils/enums");

const prisma = require("../db/prismaClient").prisma;

class Tracking {
  async createTracking(data) {
    return await prisma.tracking.create({
      data,
    });
  }

  async getDeliveredOrders(offset, limit, transporter_id) {
    return await prisma.order.findMany({
      take: limit,
      skip: offset,
      where: {
        transporter_id,
        status: {
          in: [OrderStatus.ON_WAREHOUSE, OrderStatus.DELIVERED],
        },
      },
      select: {
        id: true,
        distributor: { select: { name: true } },
        status: true,
        createdAt: true,
        total_price: true,
        Order_Details: {
          select: {
            paca: { select: { weight: true } },
            quantity: true,
          },
        },
        Tracking: {
          orderBy: { timestamp: "desc" },
          take: 1,
          select: {
            status: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async updateTrackingStatus(orderId, status) {
    return await prisma.tracking.updateMany({
      where: { order_id: orderId },
      data: { status },
    });
  }

  async updateMultipleTrackingStatus(orderIds, status) {
    if (status === TrackingStatus.LOCAL_WAREHOUSE) {
      return prisma.$transaction([
        prisma.order.updateMany({
          where: { id: { in: orderIds } },
          data: { status: OrderStatus.ON_WAREHOUSE },
        }),

        prisma.tracking.updateMany({
          where: { order_id: { in: orderIds } },
          data: { status: TrackingStatus.LOCAL_WAREHOUSE },
        }),
      ]);
    } else {
      return await prisma.tracking.updateMany({
        where: { order_id: { in: orderIds } },
        data: {
          status,
        },
      });
    }
  }
  async returnTransporterOrder(orderId) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: "READY", transporter_id: null },
    });
  }
}

module.exports = new Tracking();
