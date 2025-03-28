import { OrderStatus, Role } from "../../utils/enums";
const DeliveryCard = ({
  onOpenModal,
  loggedUser,
  order,
  styles,
  onReturnOrder,
}) => {
  const handleReturnOrder = () => {
    const confirmation = confirm(
      "Are you sure you want to return this order? This action cannot be undone."
    );
    if (confirmation) {
      onReturnOrder(order.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3>Order ID: {order.id.slice(0, 8)}...</h3>

          <div>
            <p>Status: {order.orderStatus}</p>
            {loggedUser.role === Role.TRANSPORTER && (
              <button onClick={handleReturnOrder}>Return</button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p>
          <strong>Total Price:</strong> RD${order.total_price}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <div>
          <p>
            <strong>Tracking Status:</strong> {order.currentTrackingStatus}
          </p>
          <button
            onClick={() => {
              onOpenModal(order);
            }}
          >
            Update
          </button>
        </div>
        <div className="order-details">
          <h4>Order Details</h4>
          <p>
            <strong>Weight:</strong> {order.totalWeight}
          </p>
          <p>
            <strong>Modified:</strong>{" "}
            {new Date(order.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
