import UserSection from "../../utils/UserSection";
import Dashboard from "../Common/Dashboard";
import UsersManagement from "../AdminComponents/UsersManagement";
import OrdersManagement from "../AdminComponents/OrdersManagement";
import PacasManagement from "../Common/PacasManagement";
import DeliveryManagement from "../Common/DeliveryManagement";
import OrdersDeliveredManagement from "../Common/OrdersDeliveredManagement";
import Profile from "../Common/Profile";

const MainContent = ({ user, activeSection }) => {
  const sectionComponents = {
    Profile: <Profile loggedUser={user} />,
    [`ADMIN: ${UserSection.adminSection[0].title}`]: <Dashboard />,
    [`ADMIN: ${UserSection.adminSection[1].title}`]: (
      <UsersManagement user={user} />
    ),
    [`ADMIN: ${UserSection.adminSection[2].title}`]: (
      <OrdersManagement loggedUser={user} />
    ),
    [`ADMIN: ${UserSection.adminSection[3].title}`]: (
      <PacasManagement loggedUser={user} />
    ),

    [`PROVIDER: ${UserSection.providerSection[0].title}`]: (
      <PacasManagement loggedUser={user} />
    ),
    [`PROVIDER: ${UserSection.providerSection[1].title}`]: (
      <OrdersManagement loggedUser={user} />
    ),
    [`PROVIDER: ${UserSection.providerSection[2].title}`]: (
      <OrdersDeliveredManagement loggedUser={user} />
    ),

    [`DISTRIBUTOR: ${UserSection.distributorSection[0].title}`]: (
      <PacasManagement loggedUser={user} />
    ),
    [`DISTRIBUTOR: ${UserSection.distributorSection[1].title}`]: (
      <DeliveryManagement loggedUser={user} />
    ),
    [`DISTRIBUTOR: ${UserSection.distributorSection[2].title}`]: (
      <OrdersDeliveredManagement loggedUser={user} />
    ),

    [`TRANSPORTER: ${UserSection.transporterSection[0].title}`]: (
      <OrdersManagement loggedUser={user} />
    ),
    [`TRANSPORTER: ${UserSection.transporterSection[1].title}`]: (
      <DeliveryManagement loggedUser={user} />
    ),
    [`TRANSPORTER: ${UserSection.transporterSection[2].title}`]: (
      <OrdersDeliveredManagement loggedUser={user} />
    ),
  };

  return (
    <main className="main-content">
      {sectionComponents[`${user.role}: ${activeSection}`] ||
        sectionComponents[activeSection] ||
        null}
    </main>
  );
};

export default MainContent;
