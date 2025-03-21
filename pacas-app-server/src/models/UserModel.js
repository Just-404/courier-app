const prisma = require("../db/prismaClient").prisma;

class UserModel {
  async createUser(user) {
    return await prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  async getUsers(offset = 0, limit = 10) {
    return await prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy: [{ role: "asc" }, { name: "asc" }],
    });
  }
  async countUsers() {
    return await prisma.user.count();
  }
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }
  async findByName(name) {
    return await prisma.user.findUnique({
      where: { name },
    });
  }
  async updateUser(id, newUserData) {
    return await prisma.user.update({
      where: { id },
      data: { ...newUserData },
    });
  }
  async deleteUser(id) {
    return await prisma.user.delete({ where: { id } });
  }
}

module.exports = new UserModel();
