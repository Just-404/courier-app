import { useEffect, useState } from "react";
import Pagination from "../Common/Pagination";
import fetchApi from "../../utils/fetchApi";
import addToastMessage from "../../utils/toastMessage";
import OrderCard from "../Cards/OrderCard";
import styles from "../../styles/itemsCard.module.css";

const OrdersManagement = ({ loggedUser }) => {
  const [orders, setOrders] = useState([]);
  //const [showModal, setShowModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async (page = 1, limit = 10) => {
    let reqUrl = `/${loggedUser.role}/orders?page=${page}&limit=${limit}`;
    if (loggedUser.role === "PROVIDER") {
      reqUrl += `&provider_id=${loggedUser.id}`;
    }
    try {
      const data = await fetchApi(reqUrl);
      setOrders(data.orders);
      setPageCount(Math.ceil(data.total / limit));
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const cancelOrder = async (orderId) => {
    try {
      await fetchApi(`/${loggedUser.role}/orders/${orderId}`, "PUT");
      fetchOrders(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await fetchApi(`/${loggedUser.role}/orders/${orderId}`, "DELETE");
      fetchOrders(currentPage);
    } catch (error) {
      addToastMessage("error", error.message);
    }
  };
  return (
    <>
      <div></div>
      <Pagination
        data={orders}
        onPageCount={(page) => setCurrentPage(page)}
        pageCount={pageCount}
        renderItem={(order) => (
          <OrderCard
            order={order}
            styles={styles}
            key={order.id}
            loggedUser={loggedUser}
            onCancel={cancelOrder}
            onDelete={deleteOrder}
          />
        )}
      />
    </>
  );
};

export default OrdersManagement;
