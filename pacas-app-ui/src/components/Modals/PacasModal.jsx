import { useRef, useEffect, useState } from "react";
import styles from "../../styles/modals.module.css";
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
    <dialog ref={dialogRef} className={`${styles.modal}  ${styles.pacaModal}`}>
      <div className={styles.pacaContainer}>
        <h2>{newPaca.id ? "Edit" : "Create"} Paca:</h2>
        <form onSubmit={handleSubmit} className={styles.pacaForm}>
          <div className={styles.inputBox}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              value={localPaca.name}
              onChange={handleChange}
              required
              autoComplete="off"
              maxLength="25"
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="desc">Description:</label>
            <textarea
              id="desc"
              name="description"
              placeholder="Description"
              value={localPaca.description}
              onChange={handleChange}
              required
              maxLength="200"
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="weight">Weight:</label>
            <input
              id="weight"
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              step="0.01"
              min="0.01"
              max="100"
              value={localPaca.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Price ($)"
              step="50"
              min="0"
              value={localPaca.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="quantity">Quantity: </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              min="0"
              value={localPaca.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={localPaca.status}
              onChange={handleChange}
            >
              <option value={PacaStatus.AVAILABLE}>Available</option>
            </select>
          </div>
          <div className={styles.uploadImg}>
            <div>
              <label htmlFor="uploadImg">Upload Image:</label>
              <input
                id="uploadImg"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            {previewImage && (
              <img src={previewImage} alt="Paca preview" width="100" />
            )}
          </div>

          <div className={styles.btnsBox}>
            <button type="submit">{newPaca.id ? "Edit" : "Create"}</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default PacaModal;
