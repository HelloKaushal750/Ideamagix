import { useState, useEffect } from "react";

function Instructor() {
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
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <div>
        <h1>Instructors Detail</h1>
      </div>
      <div style={{marginTop:"50px"}}>
        <table
          style={{
            border: "1px solid grey",
            width: "80%",
            margin: "auto",
            borderCollapse: "collapse",
            cursor: "pointer",
          }}
        >
          <thead>
            <tr style={{ fontSize: "20px", color: "blue" }}>
              <th style={{ border: "1px solid grey" }}>Sr. No.</th>
              <th style={{ border: "1px solid grey", padding: "10px" }}>
                Name
              </th>
              <th style={{ border: "1px solid grey" }}>Email Id</th>
            </tr>
          </thead>
          <tbody>
            {state?.map((ele,index) => {
              return (
                <tr style={{ fontSize: "18px", textAlign: "center" }}>
                  <td style={{ padding: "10px", borderRight: "1px solid grey" }}>{index+1}</td>
                  <td
                    style={{ padding: "10px", borderRight: "1px solid grey" }}
                  >
                    {ele.name}
                  </td>
                  <td style={{ padding: "10px" }}>{ele.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Instructor;
