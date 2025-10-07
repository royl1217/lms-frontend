import React, { useState } from "react";

const CourseRecommender = () => {
  const [interest, setInterest] = useState("");
  const [recommended, setRecommended] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const recommendCourse = () => {
    setIsLoading(true);
    let recommendItem = [];

    if (interest.toLowerCase().includes("web")) {
      recommendItem.push("React.js for Beginners");
    }
    if (interest.toLowerCase().includes("data")) {
      recommendItem.push("Intro to Data Science with Python");
    }
    if (interest.toLowerCase().includes("ai")) {
      recommendItem.push("Machine Learning with Scikit-Learn");
    }

    console.log(recommendItem);
    setRecommended(recommendItem);
    setIsLoading(false);
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
          {/* <div className="col-md-6"> */}
          <h2 className="mb-4 text-light">Rule-based Course Recommender</h2>
          <div className="mb-3 px-0">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your interest (e.g., AI, Web, Data)"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary btn-fit-content"
            onClick={recommendCourse}
          >
            Get Recommendation
          </button>
          {recommended && (
            <div
              className="alert alert-info mt-3 d-flex flex-column"
              role="alert"
            >
              {recommended.length > 0 ? (
                <>
                  <p className="align-self-center text-secondary">
                    We recommend:
                  </p>
                  {recommended.map((item, index) => (
                    <p key={index}>
                      {index + 1}. {item}
                    </p>
                  ))}
                </>
              ) : (
                <p>Please enter a valid interest (e.g., AI, Web, Data)</p>
              )}
            </div>
          )}
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default CourseRecommender;
