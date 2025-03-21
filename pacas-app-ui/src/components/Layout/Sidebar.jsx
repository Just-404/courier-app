import { useNavigate } from "react-router-dom";
import userSection from "../../utils/UserSection";
import Menu from "../Menu";

const Sidebar = ({ user, setActiveSection }) => {
  const navigate = useNavigate();
  const dataSection =
    user.role === "ADMIN"
      ? userSection.adminSection
      : user.role === "PROVIDER"
      ? userSection.providerSection
      : user.role === "TRANSPORTER"
      ? userSection.transporterSection
      : userSection.distributorSection;

  const handleLogout = async () => {
    await fetch("/logout", { method: "GET", credentials: "include" });
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h1>Pacas App</h1>

      <div className="sidebar-body">
        <Menu data={dataSection} setActiveSection={setActiveSection} />
      </div>
      <div className="sidebar-footer">
        <a onClick={handleLogout}>Logout</a>
      </div>
    </aside>
  );
};

export default Sidebar;
