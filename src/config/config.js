require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_GENERATIVE_MODEL: process.env.GEMINI_GENERATIVE_MODEL || 'gemini-pro',
  RATE_LIMIT: {
    DEFAULT_WINDOW_IN_MS: Number(process.env.RATE_LIMIT_DEFAULT_WINDOW_IN_MS) || 1 * 60 * 1000,
    MAX_REQUESTS_PER_WINDOW: Number(process.env.RATE_LIMIT_MAX_REQUESTS_PER_WINDOW) || 10,
  },
};

module.exports = config;
