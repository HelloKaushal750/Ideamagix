import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LectureDetails from "./LectureDetails";

function ShowLecture() {
  const { courseId } = useParams();
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(`https://tired-gold-fawn.cyclic.cloud/admin/showlecture/${courseId}`, {
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
      <div style={{ display: "flex", justifyContent: "left", padding: "20px" }}>
        <h1 style={{ color: "white" }}>Scheduled Lectures</h1>
      </div>
      <div style={{padding:"20px"}}>
        {state.length>0 ? state?.map((ele) => {
          return <LectureDetails ele={ele} />;
        }) : <h1 style={{color:"red"}}>No Lecture Added!</h1>}
      </div>
    </div>
  );
}

export default ShowLecture;
