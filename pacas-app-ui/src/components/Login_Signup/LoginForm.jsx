import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import userIcon from "../../assets/user.png";
import pwdIcon from "../../assets/Login_SignUp/padlock.png";
import MessageWindow from "../msgWindow";
import "./Login_Signup.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState([]);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const addError = (newError) => {
    setErrors((prevErrors) => [...prevErrors, newError]);

    setTimeout(() => {
      setErrors((prevErrors) => prevErrors.slice(1));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      console.log(data.user);

      setAuth({ isAuthenticated: true, user: data.user });
      navigate(`/`);
    } catch (error) {
      addError(error.message);
    }
  };
  return (
    <div className="login-container">
      {errors.length > 0 && (
        <MessageWindow msgs={errors} additionalClasses="error" />
      )}
      <div className="btns-container">
        <div className={"btn-signUp gray"} onClick={() => navigate("/sign-up")}>
          Sign Up
        </div>
        <div className={"btn-login"}>Login</div>
      </div>

      <form className="container" onSubmit={handleSubmit}>
        <div className="top-box">
          <div className="text">Login</div>
          <div className="underline"></div>
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
            />
          </div>
        </div>

        <div className="form-btns">
          <button type="submit">Log in</button>
          <button
            type="reset"
            onClick={() => setFormData({ name: "", password: "" })}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
