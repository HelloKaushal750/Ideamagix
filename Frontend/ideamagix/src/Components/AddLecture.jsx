import { useState, useEffect } from "react";
import "../Styles/AddLecture.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddLecture() {
  const navigate = useNavigate();
  const instructorDetail = useSelector((state) => {
    return state.instructorDet;
  });
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [data, setData] = useState({
    instructorname: "",
    date: "",
  });
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch("https://tired-gold-fawn.cyclic.cloud/admin/showInstructor", {
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

  const handleLecture = () => {
    if (data.instructorname === "" || data.date === "") {
      alert("Kindly fill all the inputs");
    } else {
      state?.forEach((ele) => {
        if (ele.name === data.instructorname) {
          dispatch({
            type: "INSTRUCTORDETAIL",
            payload: { instructorId: ele._id, date: data.date },
          });
          fetch(
            `https://tired-gold-fawn.cyclic.cloud/admin/addlecture/${courseId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ instructorId: ele._id, date: data.date }),
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              console.log(res);
              if (
                res.message ===
                "Lecture already scheduled for the instructor on this date"
              ) {
                alert(
                  "Lecture already scheduled for the instructor on this date.Please change the date"
                );
              } else if (res.course) {
                alert("Lecture Added Successfully");
                navigate("/course");
              } else {
                alert("Instructor Not Found!");
              }
              setData({ instructorname: "", date: "" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  return (
    <div>
      <div style={{ color: "white", textAlign: "center" }}>
        <h1>Add Lecture</h1>
      </div>
      <div className="addlecture_page">
        <div>
          <label htmlFor="">Instructor</label>
          <select
            name=""
            id=""
            value={data.instructorname}
            onChange={(e) => {
              setData({ ...data, instructorname: e.target.value });
            }}
          >
            <option value="">--</option>
            {state?.map((ele) => {
              return <option value={ele.name}>{ele.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Date</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => {
              setData({ ...data, date: e.target.value });
            }}
          />
        </div>
        <button onClick={handleLecture}>Add Lecture</button>
      </div>
    </div>
  );
}

export default AddLecture;
