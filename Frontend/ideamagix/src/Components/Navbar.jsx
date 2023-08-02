import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => {
    return state.isAdmin;
  });
  const isLogin = useSelector((state) => {
    return state.isLogin;
  });
  const isInstructor = useSelector((state) => {
    return state.isInstructor;
  });
  return (
    <div className="navbar">
      <div>
        <h1>Ideamagix</h1>
      </div>
      {isAdmin ? (
        <div className="sub_navbar">
          <Link to={"/"} className="links">
            Home
          </Link>
          <Link to={"/course"} className="links">
            Courses
          </Link>
          <Link to={"/instructor"} className="links">
            Instructors
          </Link>
          <Link to={"/"}>
            <button
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
                fontSize: "18px",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch({ type: "CHECKLOGIN", payload: false });
                dispatch({ type: "CHECKADMIN", payload: false });
                alert("You are successfully logged out");
              }}
            >
              Logout
            </button>
          </Link>
        </div>
      ) : isInstructor ? (
        <div className="sub_navbar">
          <Link to={"/"} className="links">
            Home
          </Link>
          <Link to={"/lecture"} className="links">
            Lectures
          </Link>
          <Link to={"/"}>
            <button
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "600",
                fontSize: "18px",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch({ type: "CHECKINSTRUCTOR", payload: false });
                dispatch({ type: "CHECKADMIN", payload: false });
                alert("You are successfully logged out");
              }}
            >
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className="sub_navbar">
          <Link to={"/"} className="links">
            Home
          </Link>
          <Link to={"/signup"} className="links">
            Signup
          </Link>
          <Link to={"/login"} className="links">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
