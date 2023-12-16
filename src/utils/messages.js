const messages = {
  SUCCESS: 'Response generated successfully!',
  FAIL: 'Gemini still in learning phase, Unable to process your request at the moment, please try again later!',
  REQUIRED_PROMPT: 'Prompt is required, please enter the valid prompt!',
};

const getMessage = (key) => {
  if (messages[key]) {
    return messages[key];
  }
  return key;
};

module.exports = { getMessage };
