import { useEffect, useState } from "react";

const EnrollmentList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Define async function inside useEffect
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const apiUrl_express = process.env.REACT_APP_EXPRESS_API_URL;
        const userID = localStorage.getItem("userID");

        const response = await fetch(
          `${apiUrl_express}/api/enrollments/${userID}`
        );

        if (!response.ok) {
          throw new Error("Error Fetching Enrollment");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array = run once on mount

  return (
    <>
      <h1 className="display-6 mb-3 text-light">Enrollment Details</h1>
      {isLoading ? (
        <div className="spinner-border text-info my-3 mx-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : Array.isArray(data) && data.length > 0 ? (
        <div className="rounded-table-container">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Description</th>
                <th>School</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.courseId.name}</td>
                  <td>{item.courseId.description}</td>
                  <td>{item.courseId.schoolId.name}</td>
                  <td>
                    {new Date(item.enrollmentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>There is no enrollment</p>
      )}
    </>
  );
};

export default EnrollmentList;
