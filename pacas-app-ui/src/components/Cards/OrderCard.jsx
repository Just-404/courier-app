import addToastMessage from "../../utils/toastMessage";
import { OrderStatus, TrackingStatus, Role } from "../../utils/enums";
const OrderCard = ({
  loggedUser,
  order,
  styles,
  onCancel,
  onDelete,
  onEditStatus,
  onTakeOrder,
}) => {
  const handleDeliverOrder = () => {
    const result = confirm("Are you sure you want to deliver this order?");
    if (!result) {
      addToastMessage("warning", "Order delivery cancelled!");
      return;
    }

    onEditStatus(order.id, OrderStatus.DELIVERED);
  };
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

  const toggleStatus = () => {
    const newStatus =
      order.status === OrderStatus.PENDING
        ? OrderStatus.READY
        : OrderStatus.PENDING;
    onEditStatus(order.id, newStatus);
  };

  const handleTakeOrder = () => {
    onTakeOrder(order);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h3>Order ID: {order.id.slice(0, 8)}...</h3>

          <div className={styles.orderSubHeader}>
            <p>
              <strong>
                <i>Status:</i>
              </strong>{" "}
              <span
                style={{
                  color: order.status === OrderStatus.DELIVERED && "green",
                }}
              >
                {order.status}
              </span>
            </p>
            {loggedUser.role === Role.ADMIN &&
              (order.status === "READY" || order.status === "PENDING") && (
                <button onClick={toggleStatus}>Toggle</button>
              )}

            {order.status === OrderStatus.DELIVERED && (
              <p>
                <strong>
                  <i>Delivered on:</i>
                </strong>{" "}
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            )}
          </div>
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
          <strong>Track Status:</strong> {order.Tracking[0].status}
        </p>

        <div className="order-details">
          {order.Order_Details.map((detail, index) => (
            <div key={index}>
              <p>
                <strong>Paca:</strong> {detail.paca.name}
              </p>
              <p>
                <strong>Quantity:</strong> {detail.quantity}
              </p>
              <p>
                <strong>Total Weight: </strong>
                {detail.quantity * detail.paca.weight}
              </p>
            </div>
          ))}
        </div>

        {loggedUser.role === Role.ADMIN &&
          order.Tracking[0].status === TrackingStatus.ORIGIN_WAREHOUSE && (
            <div className={styles.ordersBtnBox}>
              <button onClick={handleCancelOrder}>Cancel Order</button>
              <button onClick={handleDeleteOrder}>Delete</button>
            </div>
          )}
        {loggedUser.role === Role.ADMIN &&
          order.status === OrderStatus.ON_WAREHOUSE && (
            <button onClick={handleDeliverOrder}>Deliver</button>
          )}
        {loggedUser.role === Role.TRANSPORTER && (
          <button onClick={handleTakeOrder}>Take</button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
