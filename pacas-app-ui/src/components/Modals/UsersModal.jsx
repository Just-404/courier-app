import { useRef, useEffect, useState } from "react";
import styles from "../../styles/modals.module.css";

const PacaModal = ({
  showModal,
  setShowModal,
  newUser,
  onSubmit,
  resetForm,
  addToastMessage,
}) => {
  const dialogRef = useRef(null);
  const [localUser, setLocalUser] = useState({ ...newUser });

  useEffect(() => {
    setLocalUser({ ...newUser });
  }, [newUser]);

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localUser);
  };

  if (!showModal) return null;

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <h2>Create User:</h2>
      <form onSubmit={handleSubmit} className={styles.userForm}>
        <div className={styles.inputBox}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={localUser.name}
            onChange={handleChange}
            required
            maxLength="25"
            autoComplete="off"
          />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={localUser.password}
            onChange={handleChange}
            required
            maxLength="50"
          />
        </div>
        <select name="role" value={localUser.role} onChange={handleChange}>
          <option value="ADMIN">Admin</option>
          <option value="PROVIDER">Provider</option>
          <option value="TRANSPORTER">Transporter</option>
          <option value="DISTRIBUTOR">Distributor</option>
        </select>
        <div className={styles.btnsBox}>
          <button type="submit">Create</button>
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              resetForm();
              addToastMessage("warning", "Action cancelled!");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default PacaModal;
