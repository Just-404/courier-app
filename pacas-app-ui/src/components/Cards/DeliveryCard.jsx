import { TrackingStatus, OrderStatus, Role } from "../../utils/enums";
import addToastMessage from "../../utils/toastMessage";
const DeliveryCard = ({
  onOpenModal,
  loggedUser,
  order,
  styles,
  onReturnOrder,
  onCancel,
}) => {
  const handleReturnOrder = () => {
    const confirmation = confirm(
      "Are you sure you want to return this order? This action cannot be undone."
    );
    if (confirmation) {
      onReturnOrder(order.id);
    }
  };
  const handleCancelOrder = () => {
    const result = confirm("Are you sure you want to cancel this order?");
    if (!result) {
      addToastMessage("warning", "Order cancellation cancelled!");
      return;
    }

    onCancel(order.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.deliveryCardHeader}>
        <h3>Order ID: {order.id.slice(0, 8)}...</h3>

        <div className={styles.deliverySubHeader}>
          <p>
            <strong>
              <i>Status:</i>
            </strong>{" "}
            <span
              style={{
                color: order.orderStatus === OrderStatus.DELIVERED && "green",
              }}
            >
              <strong>{order.orderStatus}</strong>
            </span>
          </p>
          {loggedUser.role === Role.TRANSPORTER &&
            order.currentTrackingStatus === TrackingStatus.ORIGIN_WAREHOUSE && (
              <button onClick={handleReturnOrder}>Return</button>
            )}
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
          {loggedUser.role === "TRANSPORTER" &&
            order.currentTrackingStatus !== TrackingStatus.LOCAL_WAREHOUSE && (
              <button
                onClick={() => {
                  onOpenModal(order);
                }}
              >
                Update
              </button>
            )}
        </div>
        <div className="order-details">
          {loggedUser.role === "DISTRIBUTOR" && (
            <p>
              <strong>Paca:</strong> {order.pacaName}
            </p>
          )}
          <p>
            <strong>Weight:</strong> {order.totalWeight}
          </p>
          <p>
            <strong>Modified:</strong>{" "}
            {new Date(order.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      {loggedUser.role === Role.DISTRIBUTOR &&
        order.currentTrackingStatus === TrackingStatus.ORIGIN_WAREHOUSE &&
        order.orderStatus !== OrderStatus.CANCELLED && (
          <div className={styles.ordersBtnBox}>
            <button onClick={handleCancelOrder}>Cancel Order</button>
          </div>
        )}
    </div>
  );
};

export default DeliveryCard;
