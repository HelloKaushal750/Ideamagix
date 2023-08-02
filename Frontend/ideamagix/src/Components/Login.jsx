import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../Styles/Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (state.email === "" || state.password === "") {
        alert("Kindly fill all the inputs")
    } else {
      fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.message === "Login Successful") {
            localStorage.setItem("token", res.token);
            alert("Login Successful");
            setState({ email: "", password: "" });
            dispatch({ type: "CHECKLOGIN", payload: true });
            if (res.user.category === "Admin") {
              dispatch({ type: "CHECKADMIN", payload: true });
              dispatch({ type: "CHECKINSTRUCTOR", payload: false });
              navigate("/course");
            } else {
              dispatch({ type: "CHECKADMIN", payload: false });
              dispatch({ type: "CHECKINSTRUCTOR", payload: true });
              navigate("/lecture");
            }
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h1 style={{ color: "white", textAlign:'center' }}>Login Page</h1>
      <div className="login_page">
        <input
          type="text"
          placeholder="Email"
          value={state.email}
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
          }}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
