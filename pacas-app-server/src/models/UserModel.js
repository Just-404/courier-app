import { PrismaCliente as prisma } from "../db/prisma";

class UserModel {
  async createUser(data) {
    return await prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  async getUsers() {
    return await prisma.user.findMany();
  }

  async findByName(name) {
    return await prisma.user.findUnique({
      where: { name },
    });
  }
}

export default new UserModel();
