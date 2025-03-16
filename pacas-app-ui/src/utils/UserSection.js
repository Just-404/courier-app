import userIcon from "../assets/user.png"; // icon template for now

const adminSection = [
  { id: 1, title: "Dashboard", icon: userIcon },
  { id: 2, title: "Users Management", icon: userIcon },
  { id: 3, title: "Orders Management", icon: userIcon },
  { id: 4, title: "Pacas Management", icon: userIcon },
];

const providerSection = [
  { id: 1, title: "Dashboard", icon: userIcon },
  { id: 2, title: "Pacas Management", icon: userIcon },
  { id: 3, title: "Orders Received", icon: userIcon },
  { id: 4, title: "Sales History", icon: userIcon },
];

const transporterSection = [
  { id: 1, title: "Dashboard", icon: userIcon },
  { id: 2, title: "Pending Orders", icon: userIcon },
  { id: 3, title: "Update Delivery Status", icon: userIcon },
  { id: 4, title: "Orders History", icon: userIcon },
];
const distributorSection = [
  { id: 1, title: "Dashboard", icon: userIcon },
  { id: 2, title: "Order Pacas", icon: userIcon },
  { id: 3, title: "Orders History", icon: userIcon },
  { id: 4, title: "Order Tracking", icon: userIcon },
];
export default {
  adminSection,
  transporterSection,
  providerSection,
  distributorSection,
};
