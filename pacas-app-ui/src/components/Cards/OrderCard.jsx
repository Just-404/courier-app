import addToastMessage from "../../utils/toastMessage";
const OrderCard = ({ loggedUser, order, styles, onCancel, onDelete }) => {
  const handleCancelOrder = () => {
    const result = confirm("Are you sure you want to cancel this order?");
    if (!result) {
      addToastMessage("warning", "Order cancellation cancelled!");
      return;
    }

    onCancel(order.id);
  };

  const handleDeleteOrder = () => {
    const result = confirm(
      "Are you sure you want to delete this order? This is irreversible"
    );
    if (!result) {
      addToastMessage("warning", "Order deletion cancelled!");
      return;
    }

    onDelete(order.id);
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3>Order ID: {order.id.slice(0, 8)}...</h3>
          <p>Status: {order.status}</p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p>
          <strong>Provider:</strong> {order.Order_Details[0].paca.provider.name}
        </p>
        <p>
          <strong>Distributor:</strong> {order.distributor.name}
        </p>
        <p>
          <strong>Total Price:</strong> RD${order.total_price}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Tracking Status:</strong> {order.Tracking[0].status}
        </p>

        <div className="order-details">
          <h4>Order Details</h4>
          {order.Order_Details.map((detail, index) => (
            <div key={index}>
              <p>
                <strong>Paca:</strong> {detail.paca.name}
              </p>
              <p>
                <strong>Quantity:</strong> {detail.quantity}
              </p>
              <p>
                <strong>Total Weight:</strong>{" "}
                {detail.quantity * detail.paca.weight}
              </p>
            </div>
          ))}
        </div>

        {loggedUser.role === "ADMIN" && (
          <>
            <button onClick={handleCancelOrder}>Cancel Order</button>
            <button onClick={handleDeleteOrder}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
