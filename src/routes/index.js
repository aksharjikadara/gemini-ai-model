const router = require('express').Router();

const geminiRoutes = require('./gemini/routes');
const { GEMINI_PREFIX } = require('../constants/api-constant');

router.use(GEMINI_PREFIX, geminiRoutes);

module.exports = router;
