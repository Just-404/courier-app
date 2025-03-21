const pacaModel = require("../models/PacaModel");

class PacaService {
  async getPacas(offset, limit) {
    return await pacaModel.getPacas(offset, limit);
  }

  async getPacaByID(id) {
    return await pacaModel.getPacaByID(id);
  }
  async addPaca(paca, imgUrl) {
    return await pacaModel.addPaca({ ...paca, imgUrl });
  }
  async updatePaca(id, paca, imgUrl) {
    return await pacaModel.updatePaca(id, { ...paca, imgUrl });
  }
  async deletePaca(id) {
    return await pacaModel.deletePaca(id);
  }
}

module.exports = new PacaService();
