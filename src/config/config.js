require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_GENERATIVE_MODEL: process.env.GEMINI_GENERATIVE_MODEL || 'gemini-pro',
};

module.exports = config;
