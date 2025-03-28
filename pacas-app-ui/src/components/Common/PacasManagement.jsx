import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import styles from "../../styles/itemsCard.module.css";
import PacaModal from "../Modals/PacasModal";
import PacaCard from "../Cards/PacaCard";

const PacasManagement = ({ loggedUser }) => {
  const [pacas, setPacas] = useState([]);
  const [editingPaca, setEditingPaca] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [newPaca, setNewPaca] = useState({
    provider_id: loggedUser?.id,
    name: "",
    description: "",
    weight: 0.0,
    price: 0.0,
    status: "AVAILABLE",
    img_url: "",
    quantity: 1,
  });

  const resetForm = () => {
    setNewPaca({
      provider_id: loggedUser?.id || "",
      name: "",
      description: "",
      weight: 0.0,
      price: 0.0,
      status: "AVAILABLE",
      img_url: "",
      quantity: 1,
    });
  };

  useEffect(() => {
    fetchPacas(currentPage);
  }, [currentPage]);

  const fetchPacas = async (page = 1, limit = 10) => {
    let reqUrl = `/${loggedUser.role}/pacas?page=${page}&limit=${limit}`;
    if (loggedUser.role === "PROVIDER")
      reqUrl += `&provider_id=${loggedUser.id}`;

    try {
      const data = await fetchApi(reqUrl);

      setPacas(data.pacas);
      setPageCount(Math.ceil(data.total / limit));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const addPaca = async (newPaca) => {
    const formData = new FormData();
    formData.append("name", newPaca.name);
    formData.append("description", newPaca.description);
    formData.append("weight", newPaca.weight);
    formData.append("price", newPaca.price);
    formData.append("quantity", newPaca.quantity);
    formData.append("status", newPaca.status);

    if (newPaca.imgFile) {
      formData.append("image", newPaca.imgFile);
    }

    try {
      await fetchApi("/admin/pacas", "POST", formData, true);
      fetchPacas(currentPage);
      setShowModal(false);
      resetForm();
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const handleEditPaca = async (editedPaca, callback) => {
    delete editedPaca.provider_id;
    try {
      await fetchApi(
        `/${loggedUser.role}/pacas/${editedPaca.id}`,
        "PUT",
        editedPaca
      );
      fetchPacas(currentPage);
      callback(true);
    } catch (error) {
      addToastMessage("error", error.message);
      callback(false);
    }
  };

  const handleDeletePaca = async (pacaId) => {
    try {
      await fetchApi(`/${loggedUser.role}/pacas/${pacaId}`, "DELETE");
      fetchPacas(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const handleEditOpenModal = (paca) => {
    setEditingPaca(paca);
    setNewPaca(paca);
    setShowModal(true);
  };

  const handleSubmit = async (paca) => {
    if (editingPaca) {
      await handleEditPaca(paca, (success) => {
        if (success) setShowModal(false);
      });
    } else {
      await addPaca(paca);
    }
  };

  const handleOrderPaca = async (order) => {
    try {
      await fetchApi(`/${loggedUser.role}/orders`, "POST", order);
      fetchPacas(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  return (
    <>
      {loggedUser.role !== "DISTRIBUTOR" && (
        <div className={styles.addUser}>
          <button
            onClick={() => {
              resetForm();
              setEditingPaca(null);
              setShowModal(true);
            }}
          >
            +
          </button>
        </div>
      )}

      <PacaModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPaca={newPaca}
        onSubmit={handleSubmit}
      />

      <Pagination
        data={pacas}
        onPageCount={(page) => setCurrentPage(page)}
        pageCount={pageCount}
        renderItem={(paca) => (
          <PacaCard
            paca={paca}
            styles={styles}
            key={paca.id}
            loggedUser={loggedUser}
            onEdit={() => handleEditOpenModal(paca)}
            onDelete={handleDeletePaca}
            onOrder={handleOrderPaca}
          />
        )}
      />
    </>
  );
};

export default PacasManagement;
