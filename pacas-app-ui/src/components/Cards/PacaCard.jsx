import addToastMessage from "../../utils/toastMessage";
const PacaCard = ({ loggedUser, paca, styles, onEdit, onDelete, onOrder }) => {
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

  const handleOrderPaca = async () => {
    const quantity = parseFloat(prompt("Insert quantity: ", paca.quantity));

    if (!quantity) {
      addToastMessage("warning", "Order cancelled!");
      return;
    }

    if (quantity < 1) {
      addToastMessage("error", "You can't select less than one paca");
      return;
    } else if (quantity > paca.quantity) {
      addToastMessage("error", "You can't select more than " + paca.quantity);
      return;
    }

    const newOrder = {
      distributor_id: loggedUser.id,
      total_price: paca.price * quantity,
      paca_id: paca.id,
      quantity,
    };
    onOrder(newOrder);
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
        {loggedUser.role !== "DISTRIBUTOR" ? (
          <>
            <button onClick={handleEditPaca}>Edit</button>
            <button onClick={handleDeletePaca}>Delete</button>
          </>
        ) : (
          <button
            onClick={handleOrderPaca}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PacaCard;
