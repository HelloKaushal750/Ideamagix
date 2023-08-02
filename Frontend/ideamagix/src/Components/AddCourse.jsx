import { useState } from "react";
import "../Styles/AddCourse.css";
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const handleCourse = () => {
    if (
      state.name === "" ||
      state.level === "" ||
      state.description === "" ||
      state.image === ""
    ) {
      alert("Kindly fill all the inputs");
    } else {
      fetch("https://tired-gold-fawn.cyclic.cloud/admin/addcourse", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setState({ name: "", level: "", description: "", image:"" });
          if (res) {
            alert("Course Added Successfully");
          }
          navigate("/course");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ color: "white", textAlign: "center" }}>
        <h1>Add New Course</h1>
      </div>
      <div className="addcourse_page">
        <div>
          <label htmlFor="">Course Name:</label>
          <input
            type="text"
            value={state.name}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="">Level: </label>
          <select
            name=""
            id=""
            value={state.level}
            onChange={(e) => {
              setState({ ...state, level: e.target.value });
            }}
          >
            <option value="">--</option>
            <option value="I">I</option>
            <option value="II">II</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Description: </label>
          <input
            type="text"
            value={state.description}
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="">Image URL: </label>
          <input
            type="text"
            value={state.image}
            onChange={(e) => {
              setState({ ...state, image: e.target.value });
            }}
          />
        </div>
        <button onClick={handleCourse}>Add Course</button>
      </div>
    </div>
  );
}

export default AddCourse;
