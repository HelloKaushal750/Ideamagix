import { useEffect, useState } from "react";

function LectureDetails({ ele }) {
    const [state,setState] = useState({});
  useEffect(() => {
    fetch(`https://tired-gold-fawn.cyclic.cloud/instructor/${ele.course}`, {
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
  return <div style={{display:"grid",gridTemplateColumns:"15% 85%",alignItems:"center",border:"1px solid grey",padding:"10px"}}>
    <div style={{border:"1px solid grey",padding:"10px"}}>
        <img src={state.image} alt="" width={"100%"} height={"100px"} />
    </div>
    <div style={{color:"white",display:"flex",flexDirection:"column",gap:"0",marginLeft:"30px"}}>
        <h2 style={{marginBottom:"-10px"}}>{state.name}</h2>
        <p style={{marginBottom:"-5px"}}>Level: {state.level}</p>
        <h3>Date: {ele.date.split("T")[0]}</h3>
    </div>
  </div>;
}

export default LectureDetails;
