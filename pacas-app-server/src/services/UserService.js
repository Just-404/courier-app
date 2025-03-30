const userModel = require("../models/UserModel");

class UserService {
  async createUser(user) {
    return await userModel.createUser(user);
  }
  async getUsers(offset, limit, userRole) {
    return await userModel.getUsers(offset, limit, userRole);
  }
  async getUserByName(name) {
    return await userModel.findByName(name);
  }
  async getUserById(id) {
    return await userModel.findById(id);
  }
  async updateUser(id, user) {
    return await userModel.updateUser(id, user);
  }
  async deleteUser(id) {
    return await userModel.deleteUser(id);
  }
  async countUsers() {
    return await userModel.countUsers();
  }
}

module.exports = new UserService();
