/** Parses the user's message to determine the appropriate action */
class ChatbotMessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("courses")) {
      this.actionProvider.handleCourses();
    } else if (lowercase.includes("assignments")) {
      this.actionProvider.handleAssignments();
    } else if (lowercase.includes("grades")) {
      this.actionProvider.handleGrades();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default ChatbotMessageParser;
