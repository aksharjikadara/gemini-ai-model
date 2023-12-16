const { GoogleGenerativeAI } = require('@google/generative-ai');
const httpStatus = require('http-status');
const CONFIG = require('../../config/config');
const logger = require('../../lib/logger/logger');
const { getMessage } = require('../../utils/messages');

const gemini = async (req, res) => {
  try {
    let { data: { prompt } } = req.body;

    const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: CONFIG.GEMINI_GENERATIVE_MODEL,
    });

    if (!prompt.trim()) {
      return res.send(getMessage('REQUIRED_PROMPT'));
    }
    prompt = prompt.trim();

    const result = await model.generateContent(prompt);
    const { response } = result;
    const text = response.text();

    if (!text) {
      return res.send(getMessage('FAIL'));
    }
    logger.info(getMessage('SUCCESS'));
    return res.status(httpStatus.OK).send(text);
  } catch (error) {
    throw new Error(`Error from gemini : ${error}`);
  }
};

module.exports = gemini;
