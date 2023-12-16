const rateLimit = require('express-rate-limit');
const CONFIG = require('../config/config');

const rateLimitOptions = {
  windowMs: CONFIG.RATE_LIMIT.DEFAULT_WINDOW_IN_MS,
  max: CONFIG.RATE_LIMIT.MAX_REQUESTS_PER_WINDOW,
  standardHeaders: true,
  legacyHeaders: false,
};

const rateLimitMiddleware = rateLimit(rateLimitOptions);

module.exports = rateLimitMiddleware;
