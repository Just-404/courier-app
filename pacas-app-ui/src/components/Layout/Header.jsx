import userIcon from "../../assets/user.png";

const Header = ({ user }) => {
  return (
    <header>
      <div className="user-profile">
        <img src={userIcon} alt="user photo" className="icon" />
        <p>Welcome, {user.name}</p>
      </div>
      <button>Profile</button>
    </header>
  );
};

export default Header;
