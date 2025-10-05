import {
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Sidebar from "../components/Sidebar_Courses";
import EnrollmentList from "../components/EnrollmentList";
import CourseAll from "../components/CourseAll";
import CourseRecommended from "../components/CourseRecommended";
import ResponsiveSidebar from "../components/ResponsiveSidebar_Courses";

export default function Courses() {
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function ConfigComponent(path) {
    switch (path) {
      case "/courses/enrollment":
        return <EnrollmentList />;

      case "/courses/recommendedCourses":
        return <CourseRecommended />;

      default:
        return <CourseAll />;
    }
  }

  function SetComponent({ path }) {
    return <div className="col p-3">{ConfigComponent(path)}</div>;
  }

  return (
    <>
      <div className="d-flex flex-column flex-md-row min-vh-100">
        {/* <Sidebar /> */}
        <ResponsiveSidebar />
        {SetComponent({ path: pathname })}
      </div>
    </>
  );
}
