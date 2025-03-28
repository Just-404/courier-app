const trackingModel = require("../models/TrackingModel");

class TrackingService {
  async createTracking(data) {
    return await trackingModel.createTracking(data);
  }

  async updateTrackingStatus(orderId, status) {
    return await trackingModel.updateTrackingStatus(orderId, status);
  }

  async updateMultipleTrackingStatus(orderIds, status) {
    return await trackingModel.updateMultipleTrackingStatus(orderIds, status);
  }
  async returnTransporterOrder(orderId) {
    return await trackingModel.returnTransporterOrder(orderId);
  }
}

module.exports = new TrackingService();
