import Pagination from "../Common/Pagination";
import { useEffect, useState, useRef } from "react";
import addToastMessage from "../../utils/toastMessage";
import styles from "../../styles/itemsCard.module.css";
import UserCard from "../Cards/UserCard";

const UsersManagement = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    role: "DISTRIBUTOR",
  });

  const dialogRef = useRef(null);

  const resetForm = () => {
    setNewUser({
      name: "",
      password: "",
      role: "DISTRIBUTOR",
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (newUser.name === "" || newUser.password === "") {
      addToastMessage("error", "Error: inputs cannot be empty");
      return;
    }
    fetch("/api/admin/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
      credentials: "include",
    })
      .then((response) => response.json())
      .then(() => {
        fetchUsers(currentPage);
        addToastMessage("success", "User created successfully");
        setShowModal(false);
        resetForm();
      })
      .catch((error) => addToastMessage("error", error.message));
  };
  const fetchUsers = (page = 1, limit = 10) => {
    fetch(`/api/${user.role}/users?page=${page}&limit=${limit}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) =>
        response.json().then((data) => {
          if (!data.users || !data.total) {
            throw new Error("Invalid response data");
          }
          setUsers(data.users);
          setPageCount(Math.ceil(data.total / limit));
        })
      )
      .catch((error) => {
        addToastMessage("error", error.message);
        console.error("Error fetching users:", error.message);
      });
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleEditUser = (editedUser, callback) => {
    fetch(`/api/${editedUser.role}/users/${editedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.log(errorData);

            throw new Error(errorData.error || "Failed to edit user");
          });
        }
        return response.json();
      })
      .then(() => {
        fetchUsers(currentPage);
        addToastMessage("success", "User edited successfully!");
        callback(true);
      })
      .catch((error) => {
        addToastMessage("error", error.message);
        callback(false);
      });
  };

  const handleDeleteUser = (userID) => {
    fetch(`/api/${user.role}/users/${userID}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.log(errorData);

            throw new Error(errorData.error || "Failed to erase user");
          });
        }
        return response.json();
      })
      .then(() => {
        fetchUsers(currentPage);
        addToastMessage("success", "User deleted!");
      })
      .catch((error) => {
        addToastMessage("error", error.message);
      });
  };

  return (
    <>
      <div className={styles.addUser}>
        <button onClick={() => setShowModal(true)}>+</button>
      </div>
      {showModal && (
        <dialog ref={dialogRef} className={styles.addUserModal}>
          <h2>Create User:</h2>
          <form onSubmit={addUser}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
            <select
              defaultValue={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="ADMIN">Admin</option>
              <option value="PROVIDER">Provider</option>
              <option value="TRANSPORTER">Transporter</option>
              <option value="DISTRIBUTOR">Distributor</option>
            </select>
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
          </form>
        </dialog>
      )}
      <Pagination
        data={users}
        onPageCount={(page) => setCurrentPage(page)}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        pageCount={pageCount}
        renderItem={(user) => (
          <UserCard
            user={user}
            styles={styles}
            key={user.id}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        )}
      />
    </>
  );
};

export default UsersManagement;
