import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
