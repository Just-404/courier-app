import addToastMessage from "../../utils/toastMessage";

const PacaCard = ({ paca, styles, onEdit, onDelete }) => {
  const handleEditPaca = () => {
    const confirmation = confirm("Are you sure you want to change this paca?");
    if (!confirmation) {
      addToastMessage("warning", "Paca edit cancelled!");
      return;
    }
    onEdit();
  };

  const handleDeletePaca = () => {
    const result = confirm(
      "Are you sure you want to delete this paca? This is irreversible"
    );
    if (!result) {
      addToastMessage("warning", "Deletion cancelled!");
      return;
    }

    onDelete(paca.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className="cardImg">
          <img src={paca.img_url || null} alt={paca.name} />
        </div>

        <div>
          <h3>{paca.name}</h3>
          <p>Status: {paca.status}</p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p>
          <strong>Description:</strong> {paca.description}
        </p>
        <p>
          <strong>Weight:</strong> {paca.weight} kg
        </p>
        <p>
          <strong>Price:</strong> RD${paca.price}
        </p>
        <p>
          <strong>Quantity:</strong> {paca.quantity}
        </p>
        <button onClick={handleEditPaca}>Edit</button>
        <button onClick={handleDeletePaca}>Delete</button>
      </div>
    </div>
  );
};

export default PacaCard;
