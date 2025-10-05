import React from "react";
import { Button } from "react-bootstrap";
import { FaCommentDots, FaTimes } from "react-icons/fa"; // Example icon from react-icons

const ChatbotIcon = ({ onClick, status }) => {
  return (
    <Button
      variant="primary" // Or any other Bootstrap variant
      className="chatbot-icon-button"
      onClick={onClick}
    >
      {status ? <FaTimes size={30} /> : <FaCommentDots size={30} />}
    </Button>
  );
};

export default ChatbotIcon;
