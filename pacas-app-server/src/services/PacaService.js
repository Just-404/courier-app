const e = require("express");
const pacaModel = require("../models/PacaModel");

class PacaService {
  async getPacas(offset, limit, pacaStatus = null) {
    return await pacaModel.getPacas(offset, limit, pacaStatus);
  }
  async getPacasByProvider(providerId, offset, limit, pacaStatus = null) {
    return await pacaModel.getPacasByProvider(
      providerId,
      offset,
      limit,
      pacaStatus
    );
  }
  async getPacaByID(id) {
    return await pacaModel.getPacaByID(id);
  }
  async addPaca(paca) {
    return await pacaModel.addPaca({ ...paca });
  }
  async updatePaca(id, paca) {
    if (paca.quantity) {
      paca.quantity = parseInt(paca.quantity, 10);
    }
    if (paca.quantity > 0) {
      paca.status = "AVAILABLE";
    } else {
      paca.status = "SOLD";
    }
    return await pacaModel.updatePaca(id, { ...paca });
  }
  async deletePaca(id) {
    return await pacaModel.deletePaca(id);
  }
  async countPacas() {
    return await pacaModel.countPacas();
  }
  async countPacasByProvider(providerId) {
    return await pacaModel.countPacasByProvider(providerId);
  }
}

module.exports = new PacaService();
