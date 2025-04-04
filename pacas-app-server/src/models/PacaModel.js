const prisma = require("../db/prismaClient").prisma;

class Paca {
  async getPacas(offset = 0, limit = 10, pacaStatus) {
    return await prisma.paca.findMany({
      skip: offset,
      take: limit,
      where: { ...(pacaStatus && { status: pacaStatus }) },
      orderBy: { createdAt: "desc" },
    });
  }

  async getPacaByID(id) {
    return await prisma.paca.findUnique({
      where: { id },
    });
  }

  async getPacasByProvider(provider_id, offset, limit, pacaStatus) {
    return await prisma.paca.findMany({
      where: { provider_id, ...(pacaStatus && { status: pacaStatus }) },
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  }

  async addPaca(pacaData) {
    return await prisma.paca.create({ data: { ...pacaData } });
  }

  async updatePaca(id, pacaData) {
    return await prisma.paca.update({
      where: { id },
      data: { ...pacaData },
    });
  }

  async deletePaca(id) {
    return await prisma.paca.delete({ where: { id } });
  }

  async countPacas() {
    return await prisma.paca.count();
  }
  async countPacasByProvider(providerId) {
    return await prisma.paca.count({
      where: { provider_id: providerId },
    });
  }
}

module.exports = new Paca();
