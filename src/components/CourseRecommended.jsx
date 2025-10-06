import { useEffect, useState } from "react";
import Card from "./Card";
import CourseModal from "./CourseModal";

const CourseRecommended = () => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const [message, setMessage] = useState("");
  const [recommendedCoursesData, setRecommendedCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [descText, setDescText] = useState("");

  // const apiUrl_ai = process.env.REACT_APP_AI_API_URL || "";
  const apiUrl_ai = "https://roy-app.com/flask-api";
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = "https://roy-app.com/express-api";
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!userID) {
          setMessage("Please log in to view courses.");
          return;
        }

        const [recommendedCoursesResponse] = await Promise.all([
          fetch(`${apiUrl_ai}/api/getRecommendations/${userID}`),
        ]);

        if (!recommendedCoursesResponse.ok) {
          throw new Error("Error fetching recommended courses");
        }

        const courses = await recommendedCoursesResponse.json();

        // Sort courses by name (optional)
        // courses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setRecommendedCoursesData(courses);
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (apiUrl_ai) {
      fetchData();
    } else {
      setMessage("API configuration error. Please contact support.");
    }
  }, [message, modalContent, apiUrl, apiUrl_ai, userID]);

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

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 className="display-6 mb-3">Recommended Courses</h1>
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
            {Array.isArray(recommendedCoursesData) &&
            recommendedCoursesData.length > 0 ? (
              recommendedCoursesData.map((item, index) => {
                return (
                  <Card
                    key={index}
                    title={[item.course_id, item.name || "Unnamed Course"]}
                    text={item.description || "No description available"}
                    buttonText="View Details"
                    button2Text={"Enroll"}
                    onViewDetailsClick={handleViewDescriptionClick}
                    onEnrollDropClick={handleEnrollClick}
                  />
                );
              })
            ) : (
              <p>Must enroll at least one course to generate recommendations</p>
            )}
          </div>
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

export default CourseRecommended;
