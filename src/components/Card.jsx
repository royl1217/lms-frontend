import React, { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({
  title,
  text,
  imageUrl,
  buttonText,
  button2Text,
  onViewDetailsClick,
  onEnrollDropClick,
}) => {
  // Handle View Details button click
  const handleViewDetails = () => {
    if (onViewDetailsClick) {
      onViewDetailsClick(title, text);
    }
  };

  // Handle View Details button click
  const handleEnrollDrop = () => {
    if (onEnrollDropClick) {
      onEnrollDropClick(title, text);
    }
  };

  return (
    <div className="card" style={{ width: "12rem" }}>
      {imageUrl && (
        <img src={imageUrl} className="card-img-top" alt={title[1]} />
      )}
      <div className="card-body">
        <h5
          className="card-title text-primary fs-5 text-truncate"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Course Title"
        >
          {title[1]}
        </h5>
        <h5
          className="card-title text-secondary fs-6"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Course Code"
        >
          Course Code: {title[0].slice(-6)}
        </h5>
        {/* <p className="card-text">{text}</p> */}
      </div>
      <div className="card-footer">
        <div className="btn-group" role="group" aria-label="Card Buttons">
          {buttonText && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleViewDetails}
            >
              {buttonText}
            </button>
          )}
          {button2Text && (
            <button
              className={`btn ${
                button2Text === "Drop" ? "btn-danger" : "btn-primary"
              } btn-sm`}
              onClick={handleEnrollDrop}
            >
              {button2Text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
