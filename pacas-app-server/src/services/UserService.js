const userModel = require("../models/UserModel");

class UserService {
  async createUser(user) {
    return await userModel.createUser(user);
  }

  async getUserByUsername(name) {
    return await userModel.findByName(name);
  }
  async getUserById(id) {
    return await userModel.findById(id);
  }
}

module.exports = new UserService();
