import { useEffect, useState } from "react";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import styles from "../../styles/itemsCard.module.css";
import filterStyles from "../../styles/filterSection.module.css";
import UserCard from "../Cards/UserCard";
import Pagination from "../Common/Pagination";
import UsersModals from "../Modals/UsersModal";
import Select from "react-select";

const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "PROVIDER", label: "Provider" },
  { value: "TRANSPORTER", label: "Transporter" },
  { value: "DISTRIBUTOR", label: "Distributor" },
];

const UsersManagement = ({ user }) => {
  const [selectedRole, setSelectedRole] = useState(null);
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
    fetchUsers(currentPage, selectedRole);
  }, [currentPage, selectedRole]);

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
      fetchUsers(currentPage, selectedRole);
      setShowModal(false);
      resetForm();
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  const fetchUsers = async (page = 1, role = null, limit = 10) => {
    try {
      const roleQuery = role ? `&role=${role}` : "";
      const data = await fetchApi(
        `/${user.role}/users?page=${page}&limit=${limit}${roleQuery}`
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
      fetchUsers(currentPage, selectedRole);
      callback(true);
    } catch (error) {
      addToastMessage("error", error.message);
      callback(false);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      await fetchApi(`/${user.role}/users/${userID}`, "DELETE");
      fetchUsers(currentPage, selectedRole);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  return (
    <>
      <div className={filterStyles.filterContainer}>
        <label htmlFor="roleFilter">Rol:</label>
        <Select
          id="rolFilter"
          options={roleOptions}
          onChange={(selectedOption) =>
            setSelectedRole(selectedOption?.value || null)
          }
          isClearable
          placeholder="Selecciona un rol"
        />
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
