const pacaModel = require("../models/PacaModel");

class PacaService {
  async getPacas(offset, limit) {
    return await pacaModel.getPacas(offset, limit);
  }

  async getPacaByID(id) {
    return await pacaModel.getPacaByID(id);
  }
  async addPaca(paca) {
    return await pacaModel.addPaca({ ...paca });
  }
  async updatePaca(id, paca) {
    return await pacaModel.updatePaca(id, { ...paca });
  }
  async deletePaca(id) {
    return await pacaModel.deletePaca(id);
  }
  async countPacas() {
    return await pacaModel.countPacas();
  }
}

module.exports = new PacaService();
