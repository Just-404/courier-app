import { useRef } from "react";
import userIcon from "../../assets/user.png";
import addToastMessage from "../../utils/toastMessage";
import modalStyles from "../../styles/modals.module.css";

const UserCard = ({ user, styles, onEdit, onDelete }) => {
  const dialogRef = useRef(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleEditUser = () => {
    const confirmation = confirm(
      "Are you sure you want to change this user name?"
    );
    if (!confirmation) {
      addToastMessage("warning", "User edit cancelled!");
      return;
    }
    const newName = prompt("Enter new User Name: ", user.name);
    if (!newName || newName === user.name) return;

    const updatedUser = { ...user, name: newName };
    onEdit(updatedUser, (success) => {
      if (!success) {
        addToastMessage("error", "Failed to update user name!");
      }
    });
  };

  const handleDeleteUser = () => {
    const result = confirm(
      "Are you sure you want to delete this user? This is irreversible"
    );
    if (!result) {
      addToastMessage("warning", "Deletion cancelled!");
      return;
    }

    onDelete(user.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.userCardIcon}>
          <img src={userIcon} alt="user-img" />
        </div>

        <div>
          <h3>{user.name}</h3>
          <h4>{user.role}</h4>
        </div>
      </div>
      <div className={styles.userBtnBox}>
        <button onClick={handleEditUser}>Edit name</button>
        <button onClick={handleDeleteUser}>Delete</button>
        <button onClick={openModal}>...</button>
      </div>

      <dialog ref={dialogRef} className={modalStyles.modal}>
        <div className={modalStyles.cardMoreUserInfo}>
          <p>Registered on: {new Date(user.createdAt).toLocaleString()}</p>
          <p>Modified on: {new Date(user.updatedAt).toLocaleString()}</p>
        </div>
        <button onClick={closeModal}>Close</button>
      </dialog>
    </div>
  );
};

export default UserCard;
