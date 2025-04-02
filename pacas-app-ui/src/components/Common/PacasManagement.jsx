import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import styles from "../../styles/itemsCard.module.css";
import filterStyles from "../../styles/filterSection.module.css";
import PacaModal from "../Modals/PacasModal";
import PacaCard from "../Cards/PacaCard";
import Select from "react-select";
import { PacaStatus } from "../../utils/enums";

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
  const [selectedPacaStatus, setSelectedPacaStatus] = useState(null);

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
    fetchPacas(currentPage, selectedPacaStatus);
  }, [currentPage, selectedPacaStatus]);

  const fetchPacas = async (page = 1, pacaStatus = "", limit = 10) => {
    let reqUrl = `/${loggedUser.role}/pacas?page=${page}&limit=${limit}`;
    if (loggedUser.role === "PROVIDER")
      reqUrl += `&provider_id=${loggedUser.id}`;

    if (pacaStatus) reqUrl += `&pacaStatus=${pacaStatus}`;
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
      fetchPacas(currentPage, selectedPacaStatus);
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
      fetchPacas(currentPage, selectedPacaStatus);
      callback(true);
    } catch (error) {
      addToastMessage("error", error.message);
      callback(false);
    }
  };

  const handleDeletePaca = async (pacaId) => {
    try {
      await fetchApi(`/${loggedUser.role}/pacas/${pacaId}`, "DELETE");
      fetchPacas(currentPage, selectedPacaStatus);
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
      fetchPacas(currentPage, selectedPacaStatus);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  const pacaStatusOptions = [
    { value: PacaStatus.AVAILABLE, label: "Available" },
    { value: PacaStatus.SOLD, label: "Sold" },
  ];
  return (
    <>
      <div className={filterStyles.filterContainer}>
        <label>Paca Status: </label>
        <Select
          className={filterStyles.select}
          value={pacaStatusOptions.find(
            (option) => option.value === selectedPacaStatus
          )}
          onChange={(selectedOption) =>
            setSelectedPacaStatus(selectedOption?.value || "")
          }
          options={pacaStatusOptions}
          placeholder="Select Status"
          isClearable
        />
        {loggedUser.role !== "DISTRIBUTOR" && (
          <button
            onClick={() => {
              resetForm();
              setEditingPaca(null);
              setShowModal(true);
            }}
          >
            +
          </button>
        )}
      </div>
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
