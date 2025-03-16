import ErrorPage from "./components/NotFound";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import SignUpForm from "./components/Login_Signup/SignUpForm.jsx";
import LoginForm from "./components/Login_Signup/LoginForm.jsx";
import Layout from "./components/Layout.jsx";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
];

export default routes;
