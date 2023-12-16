const geminiRoutes = require('express').Router();
const { gemini } = require('../../controllers/index');
const { reqMeta } = require('../../middlewares');

geminiRoutes.post('/', reqMeta, gemini);

module.exports = geminiRoutes;
