import { useState } from "react";
import Header from "./Layout/Header";
import MainContent from "./Layout/MainContent";
import Sidebar from "./Layout/Sidebar";
import { useAuth } from "../utils/AuthContext";

import "../styles/layout.css";

const Layout = () => {
  const { auth } = useAuth() ?? null;
  const user = auth?.user ?? { name: "Guest", role: "PROVIDER" };

  const [activeSection, setActiveSection] = useState("");
  return (
    <div className="parent-container">
      <Header user={user} setActiveSection={setActiveSection} />
      <MainContent user={user} activeSection={activeSection} />
      <Sidebar user={user} setActiveSection={setActiveSection} />
    </div>
  );
};

export default Layout;
