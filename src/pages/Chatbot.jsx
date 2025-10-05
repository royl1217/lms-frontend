import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";

import Navbar from "../components/Navbar";
import config from "../components/ConfigChatbot.js";
import ChatbotMessageParser from "../components/ChatbotMessageParser.js";
import ChatbotActionProvider from "../components/ChatbotActionProvider.js";
import "react-chatbot-kit/build/main.css";
import ChatbotIcon from "../components/ChatbotIconButton.jsx";

export default function ChatbotPage() {
  const [showChatbot, setShowChatbot] = useState(true);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <>
      {/* <Navbar active="Chatbot" /> */}
      <ChatbotIcon onClick={toggleChatbot} status={showChatbot} />
      <div className="d-flex justify-content-center bg-dark vh-100">
        {showChatbot && (
          <div className="chatbot-wrapper" style={{ marginTop: "2rem" }}>
            <Chatbot
              config={config}
              messageParser={ChatbotMessageParser}
              actionProvider={ChatbotActionProvider}
            />
          </div>
        )}
      </div>
    </>
  );
}
