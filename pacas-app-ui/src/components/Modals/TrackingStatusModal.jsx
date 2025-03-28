import { useRef, useEffect, useState } from "react";
import styles from "../../styles/itemsCard.module.css";
import addToastMessage from "../../utils/toastMessage";

const TrackingStatusModal = ({
  showModal,
  setShowModal,
  currentStatus,
  onUpdate,
  selectedOrder,
}) => {
  const dialogRef = useRef(null);
  const [trackingStatus, setTrackingStatus] = useState(currentStatus);

  useEffect(() => {
    setTrackingStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleChange = (e) => {
    setTrackingStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (trackingStatus === "LOCAL_WAREHOUSE") {
      const confirmation = confirm(
        "Are you sure you want to update the tracking status LOCAL_WAREHOUSE? This action cannot be undone."
      );
      if (!confirmation) {
        addToastMessage("warning", "Action cancelled!");
        setShowModal(false);
        return;
      }
    }

    if (selectedOrder && currentStatus && trackingStatus === currentStatus) {
      addToastMessage("warning", "You selected the same status!");
      setShowModal(false);
      return;
    }
    onUpdate(trackingStatus);
  };

  if (!showModal) return null;

  return (
    <dialog ref={dialogRef} className={styles.modal}>
      <h2>Update Tracking Status</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={trackingStatus || "ORIGIN_WAREHOUSE"}
          onChange={handleChange}
        >
          <option value="ORIGIN_WAREHOUSE">ORIGIN_WAREHOUSE </option>
          <option value="ON_AIRPLANE">ON_AIRPLANE</option>
          <option value="ON_ADUANAS">ON_ADUANAS</option>
          <option value="LOCAL_WAREHOUSE">LOCAL_WAREHOUSE</option>
        </select>
        <button type="submit">Update</button>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            addToastMessage("warning", "Action cancelled!");
          }}
        >
          Cancel Cancel
        </button>
      </form>
    </dialog>
  );
};

export default TrackingStatusModal;
