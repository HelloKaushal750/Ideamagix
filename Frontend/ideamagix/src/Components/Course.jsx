import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Course.css";
import { Link } from "react-router-dom";

function Course() {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("https://tired-gold-fawn.cyclic.cloud/admin/showCourse", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setState(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ backgroundColor: "#0d1627" }}>
      <div
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Courses</h1>
        <button
          className="add_course_btn"
          onClick={() => {
            navigate("/addcourse");
          }}
        >
          ADD NEW COURSE
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          padding: "20px 80px",
          gap: "80px",
        }}
      >
        {state.length>0 && state.map((ele) => {
          return (
            <div
              style={{
                border: "1px solid grey",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
                color: "white",
              }}
            >
              <div style={{ width: "100%", height: "200px" }}>
                <img
                  src={ele.image}
                  alt=""
                  width={"100%"}
                  height={"100%"}
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <div>
                <h3>{ele.name}</h3>
                <p>Level: {ele.level}</p>
                <p>Description: {ele.description}</p>
              </div>
              <div className="lecture_button">
                <button
                  onClick={() => {
                    navigate(`/addlecture/${ele._id}`);
                  }}
                >
                  Add Lecture
                </button>
                <button
                  onClick={() => {
                    navigate(`/showlecture/${ele._id}`);
                  }}
                >
                  Show Lectures
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Course;
