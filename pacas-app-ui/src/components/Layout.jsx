import Header from "./Layout/Header";
import MainContent from "./Layout/MainContent";
import Sidebar from "./Layout/Sidebar";
import { useAuth } from "../utils/AuthContext";

import "../styles/layout.css";

const Layout = () => {
  const { auth } = useAuth() ?? null;
  const user = auth?.user ?? { name: "Guest", role: "ADMIN" };

  return (
    <div className="parent-container">
      <Header user={user} />
      <MainContent />
      <Sidebar user={user} />
    </div>
  );
};

export default Layout;
