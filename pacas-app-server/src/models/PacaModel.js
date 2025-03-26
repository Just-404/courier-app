const prisma = require("../db/prismaClient").prisma;

class Paca {
  async getPacas(offset = 0, limit = 10) {
    return await prisma.paca.findMany({
      skip: offset * limit,
      take: limit,
    });
  }

  async getPacaByID(id) {
    return await prisma.paca.findUnique({
      where: { id },
    });
  }

  async getPacasByProvider(providerId, offset, limit) {
    return await prisma.paca.findMany({
      where: { provider_id: providerId },
      skip: offset,
      take: limit,
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
