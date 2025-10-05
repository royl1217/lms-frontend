/** The action provider defines the chatbot's responses.
 * The updateChatbotState helper function is used
 * to add new messages to the chat.  */
class ChatbotActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  handleCourses = () => {
    const message = this.createChatBotMessage("Response to Courses");
    this.updateChatbotState(message);
  };

  handleAssignments = () => {
    const message = this.createChatBotMessage("Response to Assignments");
    this.updateChatbotState(message);
  };

  handleGrades = () => {
    const message = this.createChatBotMessage("Response to Grades");
    this.updateChatbotState(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      'Sorry, I do not understand. Please ask about "courses," "assignments," or "grades."'
    );
    this.updateChatbotState(message);
  };
}

export default ChatbotActionProvider;
