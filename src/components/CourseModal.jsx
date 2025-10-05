import React from "react";

const CourseModal = ({ show, onClose, title, text, imageUrl }) => {
  if (!show) {
    return null; // Don't render anything if the modal is not visible
  }
  return (
    <>
      {/* The modal backdrop element */}
      <div
        className={`modal-backdrop fade ${show ? "show d-block" : ""}`}
      ></div>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-labelledby="courseModalLabel"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalLabel">
                Course: {title?.[1] || ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Course Code:</strong> {title?.[0] || "N/A"}
              </p>
              <p>{text || ""}</p>
              {imageUrl && (
                <img
                  src={imageUrl}
                  className="img-fluid mb-3"
                  alt={title?.[1] || "Course"}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseModal;
