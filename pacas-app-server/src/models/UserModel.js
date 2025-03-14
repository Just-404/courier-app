const prisma = require("../db/prismaClient").prisma;

class UserModel {
  async createUser(user) {
    return await prisma.user.create({
      data: {
        ...user,
      },
    });
  }

  async getUsers() {
    return await prisma.user.findMany();
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
}

module.exports = new UserModel();
