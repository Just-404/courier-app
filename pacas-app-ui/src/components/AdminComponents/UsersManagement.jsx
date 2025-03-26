import { useEffect, useState } from "react";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import styles from "../../styles/itemsCard.module.css";
import UserCard from "../Cards/UserCard";
import Pagination from "../Common/Pagination";
import UsersModals from "../Modals/UsersModal";
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

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const resetForm = () => {
    setNewUser({
      name: "",
      password: "",
      role: "DISTRIBUTOR",
    });
  };

  const addUser = async (newUser) => {
    try {
      await fetchApi("/admin/users/sign-up", "POST", newUser);
      fetchUsers(currentPage);
      setShowModal(false);
      resetForm();
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      const data = await fetchApi(
        `/${user.role}/users?page=${page}&limit=${limit}`
      );
      setUsers(data.users);
      setPageCount(Math.ceil(data.total / limit));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const handleEditUser = async (editedUser, callback) => {
    try {
      await fetchApi(
        `/${editedUser.role}/users/${editedUser.id}`,
        "PUT",
        editedUser
      );
      fetchUsers(currentPage);
      callback(true);
    } catch (error) {
      addToastMessage("error", error.message);
      callback(false);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      await fetchApi(`/${user.role}/users/${userID}`, "DELETE");
      fetchUsers(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  return (
    <>
      <div className={styles.addUser}>
        <button onClick={() => setShowModal(true)}>+</button>
      </div>

      <UsersModals
        showModal={showModal}
        setShowModal={setShowModal}
        newUser={newUser}
        onSubmit={addUser}
        addToastMessage={addToastMessage}
        resetForm={resetForm}
      />
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
