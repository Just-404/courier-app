const Role = Object.freeze({
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
  TRANSPORTER: "TRANSPORTER",
  DISTRIBUTOR: "DISTRIBUTOR",
});

const PacaStatus = Object.freeze({
  AVAILABLE: "AVAILABLE",
  SOLD: "SOLD",
  ON_TRANSPORT: "ON_TRANSPORT",
});

const OrderStatus = Object.freeze({
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
  READY: "READY",
  ON_TRANSPORT: "ON_TRANSPORT",
  ON_WAREHOUSE: "ON_WAREHOUSE",
  DELIVERED: "DELIVERED",
});

const TrackingStatus = Object.freeze({
  ORIGIN_WAREHOUSE: "ORIGIN_WAREHOUSE",
  ON_AIRPLANE: "ON_AIRPLANE",
  ON_ADUANAS: "ON_ADUANAS",
  LOCAL_WAREHOUSE: "LOCAL_WAREHOUSE",
});

export { Role, PacaStatus, OrderStatus, TrackingStatus };
