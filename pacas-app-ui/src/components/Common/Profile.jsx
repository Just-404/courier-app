import { useState } from "react";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import { useAuth } from "../../utils/AuthContext";
const Profile = ({ loggedUser }) => {
  const [name, setName] = useState(loggedUser.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setAuth } = useAuth();

  const handleNameUpdate = async () => {
    try {
      if (name.trim() === loggedUser.name) {
        throw new Error("Same name can't be sent");
      }
      let reqUrl = `/${loggedUser.role}/profile/change-name/${loggedUser.id}`;
      const data = await fetchApi(reqUrl, "PUT", { name });

      setAuth((prevAuth) => ({
        ...prevAuth,
        user: { ...prevAuth.user, name: data.updatedUser.name },
      }));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const handlePassUpdate = async () => {
    try {
      let reqUrl = `/${loggedUser.role}/profile/change-password/`;
      await fetchApi(reqUrl, "PUT", { oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  return (
    <div>
      <p>{loggedUser.name}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name">Change Name</label>
          <input
            id="name"
            type="text"
            placeholder="New Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleNameUpdate}>Update Name</button>
        </div>
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="password">Change Password</label>
          <input
            id="password"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            required
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePassUpdate}>Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
