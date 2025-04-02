import { useEffect, useState } from "react";
import Pagination from "../Common/Pagination";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import DeliveryCard from "../Cards/DeliveryCard";
import styles from "../../styles/itemsCard.module.css";
import filterStyles from "../../styles/filterSection.module.css";
import TrackingStatusModal from "../Modals/TrackingStatusModal";
import { Role, OrderStatus, TrackingStatus } from "../../utils/enums";
import Select from "react-select";

const DeliveryManagement = ({ loggedUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [takenDeliveries, setTakenDeliveries] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [selectedTrackingStatus, setSelectedTrackingStatus] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const fetchDeliveries = async (page = 1, limit = 10) => {
    let reqUrl = `/${loggedUser.role}/orders/transporter-orders?page=${page}&limit=${limit}&transporter_id=${loggedUser.id}`;
    if (loggedUser.role === "DISTRIBUTOR") {
      reqUrl = `/${loggedUser.role}/orders/orders-tracking?page=${page}&limit=${limit}&distributor_id=${loggedUser.id}`;
    }

    if (selectedOrderStatus) {
      reqUrl += `&orderStatus=${selectedOrderStatus.value}`;
    }
    if (selectedTrackingStatus) {
      reqUrl += `&trackingStatus=${selectedTrackingStatus.value}`;
    }
    try {
      const data = await fetchApi(reqUrl);
      setTakenDeliveries(data.orders);
      setPageCount(Math.ceil(data.total / limit));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  useEffect(() => {
    fetchDeliveries(currentPage);
  }, [currentPage, selectedOrderStatus, selectedTrackingStatus]);

  const returnOrder = async (orderId) => {
    const reqUrl = `/${loggedUser.role}/tracking/return-order`;
    try {
      await fetchApi(reqUrl, "PUT", { orderId });
      fetchDeliveries(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const updateTrackingStatus = async (orderId, status) => {
    const reqUrl = `/${loggedUser.role}/tracking/update-tracking-status`;

    try {
      await fetchApi(reqUrl, "PUT", { orderId, status });
      fetchDeliveries(currentPage);
      setShowModal(false);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const updateAllTrackingStatus = async (status) => {
    console.log("Updating all tracking status to:", status);

    const reqUrl = `/${loggedUser.role}/tracking/update-multiple-status`;
    const orderIds = takenDeliveries.map((order) => order.id);

    try {
      await fetchApi(reqUrl, "PUT", { orderIds, status });
      fetchDeliveries(currentPage);
      setShowModal(false);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      await fetchApi(
        `/${loggedUser.role}/orders/${orderId}/cancel-order`,
        "PUT"
      );
      fetchDeliveries(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  return (
    <>
      {loggedUser.role === "DISTRIBUTOR" && (
        <div className={filterStyles.filterContainer}>
          <div className={filterStyles.filterItem}>
            <label>Order Status:</label>
            <Select
              className={filterStyles.select}
              options={Object.values(OrderStatus)
                .filter((status) => status !== OrderStatus.DELIVERED)
                .map((status) => ({
                  value: status,
                  label: status,
                }))}
              onChange={setSelectedOrderStatus}
              isClearable
            />
          </div>
          <div className={filterStyles.filterItem}>
            <label>Tracking Status:</label>
            <Select
              className={filterStyles.select}
              options={Object.values(TrackingStatus).map((status) => ({
                value: status,
                label: status,
              }))}
              onChange={setSelectedTrackingStatus}
              isClearable
            />
          </div>
        </div>
      )}
      {takenDeliveries.length !== 0 && loggedUser.role === Role.TRANSPORTER && (
        <div>
          {" "}
          <button
            onClick={() => {
              setSelectedOrder(null);
              setShowModal(true);
            }}
          >
            Update all
          </button>
        </div>
      )}
      <TrackingStatusModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentStatus={
          selectedOrder
            ? selectedOrder.currentTrackingStatus
            : "ORIGIN_WAREHOUSE"
        }
        onUpdate={(status) => {
          if (selectedOrder) {
            updateTrackingStatus(selectedOrder.id, status);
          } else {
            updateAllTrackingStatus(status);
          }
        }}
      />

      <Pagination
        data={takenDeliveries}
        onPageCount={(page) => setCurrentPage(page)}
        pageCount={pageCount}
        renderItem={(delivery) => (
          <DeliveryCard
            onOpenModal={handleOpenModal}
            order={delivery}
            styles={styles}
            key={delivery.id}
            loggedUser={loggedUser}
            onCancel={cancelOrder}
            onReturnOrder={returnOrder}
            onUpdateTrackingStatus={updateTrackingStatus}
          />
        )}
      />
    </>
  );
};

export default DeliveryManagement;
