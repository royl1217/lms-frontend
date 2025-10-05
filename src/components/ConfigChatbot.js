import { createChatBotMessage } from "react-chatbot-kit";

import ChatbotActionProvider from "./ChatbotActionProvider";

/**  Defines the chatbot's configuration,
 *   including the initial message and custom widgets. */
const config = {
  initialMessages: [
    createChatBotMessage(`Hello! How can I assist you with the LMS today?`),
  ],
  botName: "LMS Bot",
  actionProvider: ChatbotActionProvider,
};

export default config;
