import { useEffect, useState } from "react";
import Pagination from "../Common/Pagination";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import DeliveryCard from "../Cards/DeliveryCard";
import styles from "../../styles/itemsCard.module.css";

const DeliveryManagement = ({ loggedUser }) => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDeliveries = async (page = 1, limit = 10) => {
    const reqUrl = `/${loggedUser.role}/orders/delivered?page=${page}&limit=${limit}&transporter_id=${loggedUser.id}`;

    try {
      const data = await fetchApi(reqUrl);

      setDeliveredOrders(data.orders);
      setPageCount(Math.ceil(data.total / limit));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  useEffect(() => {
    fetchDeliveries(currentPage);
  }, [currentPage]);

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
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  return (
    <>
      <Pagination
        data={deliveredOrders}
        onPageCount={(page) => setCurrentPage(page)}
        pageCount={pageCount}
        renderItem={(delivery) => (
          <DeliveryCard
            order={delivery}
            styles={styles}
            key={delivery.id}
            loggedUser={loggedUser}
            onReturnOrder={returnOrder}
            onUpdateTrackingStatus={updateTrackingStatus}
          />
        )}
      />
    </>
  );
};

export default DeliveryManagement;
