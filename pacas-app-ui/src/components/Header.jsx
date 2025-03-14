import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/logout", { method: "GET", credentials: "include" });
    navigate("/login");
  };
  return (
    <header>
      <nav>
        <ul>
          <li onClick={() => handleLogout()}>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
