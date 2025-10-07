import React, { useEffect, useState } from "react";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import { Form } from "react-bootstrap";

// Sample data for courses. In a real app, this would come from an API.
const courses = [
  { id: 1, name: "Introduction to React" },
  { id: 2, name: "Advanced JavaScript" },
  { id: 3, name: "Full-Stack Development with Node.js" },
  { id: 4, name: "UI/UX Design Fundamentals" },
  { id: 5, name: "Data Science with Python" },
  { id: 6, name: "Web Development Bootcamp" },
  { id: 7, name: "Machine Learning Basics" },
];

function CourseSearch() {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [message, setMessage] = useState("");
  const [allCoursesData, setAllCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl_express = process.env.REACT_APP_EXPRESS_API_URL;
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!userID) {
          setMessage("Please log in to view courses.");
          return;
        }

        const [allCoursesResponse] = await Promise.all([
          fetch(`${apiUrl_express}/api/courses`),
        ]);

        if (!allCoursesResponse.ok) {
          throw new Error("Error fetching recommended courses");
        }

        const courses = await allCoursesResponse.json();

        // Sort courses by name (optional)
        // courses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        setAllCoursesData(courses);
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (apiUrl_express) {
      fetchData();
    } else {
      setMessage("API configuration error. Please contact support.");
    }
  }, [message, apiUrl_express, userID]);

  const handleSelection = (selected) => {
    setSelectedCourses(selected);
    // You can perform additional actions here, like navigating to a course page
    if (selected.length > 0) {
      console.log("Course selected:", selected[0].name);
    }
  };

  return (
    <div className="container mt-5">
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-info my-3 mx-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <h2 className="mb-4 text-light">
            Smart Search using React Typeahead
          </h2>
          <Form.Group className="mb-3">
            <Form.Label className="text-light">Find a course:</Form.Label>
            <Typeahead
              id="course-search-typeahead"
              labelKey="name"
              options={allCoursesData}
              maxVisible={3}
              placeholder="e.g., React, JavaScript, Python..."
              onChange={handleSelection}
              selected={selectedCourses}
            />
          </Form.Group>

          {/* Display selected course details */}
          {selectedCourses.length > 0 && (
            <div className="mt-4">
              <h3>Selected Course</h3>
              <p>
                <strong>Course ID:</strong> {selectedCourses[0]._id}
              </p>
              <p>
                <strong>Name:</strong> {selectedCourses[0].name}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseSearch;
