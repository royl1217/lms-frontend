import { useEffect, useState } from "react";
import Card from "./Card";
import CourseModal from "./CourseModal";

const CourseAll = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const [message, setMessage] = useState("");
  const [allCourseData, setAllCourseData] = useState(null);
  const [enrolledCourseData, setEnrolledCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [descText, setDescText] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const COURSES_PER_PAGE = 10; // Number of courses per page

  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = "https://roy-app.com";
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!userID) {
          setMessage("Please log in to view courses.");
          return;
        }

        const [coursesResponse, enrollmentsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/courses`),
          fetch(`${apiUrl}/api/enrollments/${userID}`),
        ]);

        if (!coursesResponse.ok) {
          throw new Error("Error fetching all courses");
        }
        if (!enrollmentsResponse.ok) {
          throw new Error("Error fetching enrollments");
        }

        const courses = await coursesResponse.json();
        const enrollments = await enrollmentsResponse.json();

        // Sort courses by name (optional)
        // courses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setAllCourseData(courses);
        setEnrolledCourseData(enrollments.map((item) => item.courseId._id));
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (apiUrl) {
      fetchData();
    } else {
      setMessage("API configuration error. Please contact support.");
    }
  }, [message, modalContent, apiUrl, userID]);

  const handleViewDescriptionClick = (title, text) => {
    // console.log(`You clicked on ${title[0]}!`);
    // console.log(`${text}!`);
    setDescText((prev) => [title[1], text]);
  };

  const handleEnrollClick = async (title) => {
    try {
      // Add new enrollment record
      const response = await fetch(`${apiUrl}/api/enrollments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: title[0],
          studentId: localStorage.getItem("userID"),
          enrollmentDate: Date.now(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Enrollment created successfully!");
        setModalContent([title, "Enrollment Successful!"]);
        setShowModal(true);
      } else {
        setMessage(result.message || "Failed to create enrollment.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  const handleDropClick = async (title) => {
    try {
      // Delete enrollment record
      const response = await fetch(`${apiUrl}/api/enrollments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: title[0],
          studentId: localStorage.getItem("userID"),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Enrollment deleted successfully!");
        setModalContent([title, "Drop Successful!"]);
        setShowModal(true);
      } else {
        setMessage(result.message || "Failed to delete enrollment.");
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Pagination logic
  const totalCourses = allCourseData ? allCourseData.length : 0;
  const totalPages = Math.ceil(totalCourses / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const currentCourses = allCourseData
    ? allCourseData.slice(startIndex, endIndex)
    : [];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <h1 className="display-6 mb-3">All Courses</h1>
      {isLoading ? (
        <div className="spinner-border text-info my-3 mx-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {descText && (
            <>
              <h2 className="fs-5">Course: {descText[0]}</h2>
              <p className="">Description: {descText[1]}</p>
            </>
          )}
          <div className="d-flex flex-wrap justify-content-left gap-3">
            {Array.isArray(currentCourses) && currentCourses.length > 0 ? (
              enrolledCourseData &&
              currentCourses.map((item, index) => {
                return (
                  <Card
                    key={index}
                    title={[item._id, item.name || "Unnamed Course"]}
                    text={item.description || "No description available"}
                    buttonText="View Details"
                    button2Text={
                      enrolledCourseData.includes(item._id) ? "Drop" : "Enroll"
                    }
                    onViewDetailsClick={handleViewDescriptionClick}
                    onEnrollDropClick={
                      enrolledCourseData.includes(item._id)
                        ? handleDropClick
                        : handleEnrollClick
                    }
                  />
                );
              })
            ) : (
              <p>No available course</p>
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 gap-3">
              <button
                className="btn btn-primary"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="align-self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Render the modal component */}
      <CourseModal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent[0]}
        text={modalContent[1]}
      />
    </>
  );
};

export default CourseAll;
