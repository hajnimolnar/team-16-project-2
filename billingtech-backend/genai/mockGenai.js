function simulateGenAIResponse(description) {
    const lower = description.toLowerCase();
    if (lower.includes("refund")) {
      return {
        type: "refund",
        status: "Pending",
        request_description: description,
      };
    } else {
      return {
        type: "change",
        status: "Pending",
        request_description: description,
      };
    }
  }
  
  module.exports = simulateGenAIResponse;
  