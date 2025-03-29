import UserSection from "../../utils/UserSection";
import Dashboard from "../Common/Dashboard";
import UsersManagement from "../AdminComponents/UsersManagement";
import OrdersManagement from "../AdminComponents/OrdersManagement";
import PacasManagement from "../Common/PacasManagement";
import DeliveryManagement from "../Common/DeliveryManagement";
import OrdersDeliveredManagement from "../Common/OrdersDeliveredManagement";
import Profile from "../Common/Profile";
const MainContent = ({ user, activeSection }) => {
  return (
    <main className="main-content">
      {activeSection === "Profile" && <Profile />}
      {activeSection === UserSection.adminSection[0].title && <Dashboard />}
      {activeSection === UserSection.adminSection[1].title && (
        <UsersManagement user={user} />
      )}
      {activeSection === UserSection.adminSection[2].title && (
        <OrdersManagement loggedUser={user} />
      )}
      {activeSection === UserSection.adminSection[3].title &&
        user.role === "ADMIN" && <PacasManagement loggedUser={user} />}

      {activeSection === UserSection.providerSection[1].title &&
        user.role === "PROVIDER" && <PacasManagement loggedUser={user} />}

      {activeSection === UserSection.providerSection[2].title && (
        <OrdersManagement loggedUser={user} />
      )}
      {activeSection === UserSection.providerSection[3].title && (
        <OrdersDeliveredManagement loggedUser={user} />
      )}
      {activeSection === UserSection.distributorSection[1].title &&
        user.role === "DISTRIBUTOR" && <PacasManagement loggedUser={user} />}
      {activeSection === UserSection.distributorSection[3].title && (
        <DeliveryManagement loggedUser={user} />
      )}
      {activeSection === UserSection.transporterSection[1].title && (
        <OrdersManagement loggedUser={user} />
      )}

      {activeSection === UserSection.transporterSection[2].title && (
        <DeliveryManagement loggedUser={user} />
      )}

      {activeSection === UserSection.transporterSection[3].title && (
        <OrdersDeliveredManagement loggedUser={user} />
      )}
    </main>
  );
};

export default MainContent;
