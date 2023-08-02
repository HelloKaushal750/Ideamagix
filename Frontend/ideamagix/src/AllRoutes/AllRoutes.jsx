import { Route, Routes } from "react-router-dom";
import Home from "../Components/Home";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import Course from "../Components/Course";
import Lecture from "../Components/Lecture";
import Instructor from "../Components/Instructor";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/course" element={<Course />} />
      <Route path="/instructor" element={<Instructor />} />
      <Route path="/lecture" element={<Lecture />} />
    </Routes>
  );
}

export default AllRoutes;
