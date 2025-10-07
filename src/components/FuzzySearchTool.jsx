import React, { useEffect, useState } from "react";
import { useFuseSearch } from "./useFuseSearch";
import { Container, Form, Spinner } from "react-bootstrap";
import Select from "react-select";

const FuzzySearchTool = () => {
  const [message, setMessage] = useState("");
  const [allCoursesData, setAllCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
  }, []);

  const [searchResults, searchTerm, setSearchTerm] = useFuseSearch(
    allCoursesData,
    ["name"]
  );

  // Map the search results to the format react-select expects
  const courseOptions = searchResults.map((course) => ({
    value: course._id,
    label: `${course.name}`,
    // Include the full course object if needed for the selection logic
    course: course,
  }));

  return (
    <Container className="mt-5">
      {isLoading ? (
        <div className="text-center">
          <Spinner
            className="my-3 mx-5"
            animation="border"
            variant="info"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row justify-content-center">
          <h2 className="mb-4 text-light">Course Search</h2>
          <Form>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable
              name="color"
              options={courseOptions}
              value={selectedCourse}
              onChange={setSelectedCourse}
              inputValue={searchTerm}
              onInputChange={setSearchTerm}
              placeholder="Search for and select a course..."
            />
          </Form>

          {selectedCourse && (
            <div className="mt-4">
              <h3>Selected Course:</h3>
              <p>
                <strong>Course ID:</strong> {selectedCourse.value}
              </p>
              <p>
                <strong>Name:</strong> {selectedCourse.label}
              </p>
            </div>
          )}
        </div>
      )}
      {message && <p className="mt-3 text-danger">{message}</p>}
    </Container>
  );
};

export default FuzzySearchTool;
