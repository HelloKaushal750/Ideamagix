import { useState, useEffect } from "react";
import '../Styles/Course.css'

function Course() {
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
    <div>
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "white" }}>Courses</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          padding: "20px 80px",
          gap: "80px",
        }}
      >
        {state?.map((ele) => {
          return (
            <div
              style={{
                border: "1px solid grey",
                padding: "15px",
                borderRadius: "10px",
                textAlign:'center',
                color:"white"
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
                <button>Add Lecture</button>
                <button>Show Lectures</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Course;
