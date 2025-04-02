import { useState } from "react";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import { useAuth } from "../../utils/AuthContext";
import styles from "../../styles/profile.module.css";

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
    <div className={styles.profileContainer}>
      <h2>{loggedUser.name}</h2>
      <div className={styles.formContainers}>
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Change name</h3>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              placeholder="New Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button className={styles.updateBtn} onClick={handleNameUpdate}>
            Update Name
          </button>
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Change Password</h3>

          <div>
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              id="oldPassword"
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              required
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button className={styles.updateBtn} onClick={handlePassUpdate}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
