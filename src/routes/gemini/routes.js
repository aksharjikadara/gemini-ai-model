const geminiRoutes = require('express').Router();
const { gemini } = require('../../controllers/index');

geminiRoutes.post('/', gemini);

module.exports = geminiRoutes;
