import userIcon from "../../assets/user.png";
import Profile from "../Common/Profile";

const Header = ({ user, setActiveSection }) => {
  return (
    <header>
      <div className="user-profile">
        <img src={userIcon} alt="user photo" className="icon" />
        <p>Welcome, {user.name}</p>
      </div>
      <button onClick={() => setActiveSection("Profile")}>Profile</button>
    </header>
  );
};

export default Header;
