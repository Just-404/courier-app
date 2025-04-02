import userIcon from "../assets/user.png";
import dashboardIcon from "../assets/dashboard.png";
import orderManagementIcon from "../assets/Orders/order-delivery.png";
import pacaManagementIcon from "../assets/Pacas/t-shirt.png";
import ordersReceivedIcon from "../assets/Orders/received.png";
import historyIcon from "../assets/Orders/history.png";
import pendingOrderIcon from "../assets/Pacas/booking.png";
import orderTrackingIcon from "../assets/Orders/order-tracking.png";
import updateStatus from "../assets/Orders/refresh-page-option.png";

const adminSection = [
  { id: 1, title: "Dashboard", icon: dashboardIcon },
  { id: 2, title: "Users Management", icon: userIcon },
  { id: 3, title: "Orders Management", icon: orderManagementIcon },
  { id: 4, title: "Pacas Management", icon: pacaManagementIcon },
];

const providerSection = [
  { id: 1, title: "Pacas Management", icon: pacaManagementIcon },
  { id: 2, title: "Orders Received", icon: ordersReceivedIcon },
  { id: 3, title: "Sales History", icon: history },
];

const transporterSection = [
  { id: 1, title: "Pending Orders", icon: pendingOrderIcon },
  { id: 2, title: "Update Track Status", icon: updateStatus },
  { id: 3, title: "Orders History", icon: historyIcon },
];
const distributorSection = [
  { id: 1, title: "Order Pacas", icon: pacaManagementIcon },
  { id: 2, title: "Order Tracking", icon: orderTrackingIcon },
  { id: 3, title: "Orders History", icon: historyIcon },
];
export default {
  adminSection,
  transporterSection,
  providerSection,
  distributorSection,
};
