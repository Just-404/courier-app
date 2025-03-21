import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import userIcon from "../../assets/user.png";
import pwdIcon from "../../assets/Login_SignUp/padlock.png";
import roleIcon from "../../assets/Login_SignUp/settings.png";
import "./Login_Signup.css";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    userRole: "DISTRIBUTOR",
  });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const addError = (newError) => {
    toast.error(newError, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addSuccessMsg = (newMsg) => {
    toast.success(newMsg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      addSuccessMsg("Sign-up successful! Redirecting...");

      setAuth({ isAuthenticated: true, user: data.user });
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (error) {
      addError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="signUp-container">
      <div className="btns-container">
        <div className={"btn-signUp"}>Sign Up</div>
        <div className={"btn-login gray"} onClick={() => navigate("/login")}>
          Login
        </div>
      </div>

      <form className="container" onSubmit={handleSubmit}>
        <div className="top-box">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>

        <div className="inputs-box">
          <div className="select-item">
            <img src={roleIcon} alt="user role icon" />
            <select
              name="userRole"
              id="userRole"
              required
              onChange={(e) =>
                setFormData({ ...formData, userRole: e.target.value })
              }
              value={formData.userRole}
              disabled={loading}
            >
              <option value="DISTRIBUTOR">Distributor</option>
            </select>
          </div>
        </div>

        <div className="inputs-box">
          <div className="input-item">
            <img src={userIcon} alt="user icon" />
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              autoComplete="off"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              disabled={loading}
            />
          </div>
        </div>

        <div className="inputs-box">
          <div className="input-item">
            <img src={pwdIcon} alt="password icon" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-btns">
          <button type="submit" disabled={loading}>
            Sign up
          </button>
          <button
            type="reset"
            onClick={() =>
              setFormData({ name: "", password: "", userRole: "DISTRIBUTOR" })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
