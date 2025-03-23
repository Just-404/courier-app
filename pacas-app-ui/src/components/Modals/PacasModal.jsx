import { useRef, useEffect, useState } from "react";
import styles from "../../styles/itemsCard.module.css";
import { PacaStatus } from "../../utils/enums";

const PacaModal = ({ showModal, setShowModal, newPaca, onSubmit }) => {
  const dialogRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(newPaca.img_url);
  const [localPaca, setLocalPaca] = useState({ ...newPaca });

  useEffect(() => {
    setLocalPaca({ ...newPaca });
    setPreviewImage(newPaca.img_url);
  }, [newPaca]);

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPaca((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...localPaca, imgFile: selectedFile });
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <dialog ref={dialogRef} className={styles.addUserModal}>
      <h2>{newPaca.id ? "Edit" : "Create"} Paca:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={localPaca.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <textarea
            name="description"
            placeholder="Description"
            value={localPaca.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            step="0.01"
            value={localPaca.weight}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            step="0.01"
            value={localPaca.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min="1"
            value={localPaca.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewImage && (
            <img src={previewImage} alt="Paca preview" width="100" />
          )}
        </label>

        <label>
          <select
            name="status"
            value={localPaca.status}
            onChange={handleChange}
          >
            <option value={PacaStatus.AVAILABLE}>Available</option>
          </select>
        </label>

        <button type="submit">{newPaca.id ? "Edit" : "Create"}</button>
        <button type="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </form>
    </dialog>
  );
};

export default PacaModal;
