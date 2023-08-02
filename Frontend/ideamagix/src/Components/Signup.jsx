import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = () => {
    if (state.name === "" || state.email === "" || state.password === "") {
      alert("Kindly fill all the inputs");
    } else {
      fetch("https://tired-gold-fawn.cyclic.cloud/signup", {
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
          setState({ name: "", email: "", password: "" });
          if (res.message === "Registration Successfull") {
            alert("Registration Successfull");
          }
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <h1 style={{ color: "white", textAlign:"center" }}>Registration</h1>
      <div className="signup_page">
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          onChange={(e) => {
            setState({ ...state, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Email"
          value={state.email}
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
          }}
        />
        <button onClick={handleSignup}>Register</button>
      </div>
    </div>
  );
}

export default Signup;
