import UserSection from "../../utils/UserSection";
import Dashboard from "../Common/Dashboard";
import UsersManagement from "../AdminComponents/UsersManagement";
import OrdersManagement from "../AdminComponents/OrdersManagement";
import PacasManagement from "../Common/PacasManagement";
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
        <OrdersManagement />
      )}
      {activeSection === UserSection.adminSection[3].title && (
        <PacasManagement />
      )}
    </main>
  );
};

export default MainContent;
