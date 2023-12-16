const { GoogleGenerativeAI } = require('@google/generative-ai');
const httpStatus = require('http-status');
const CONFIG = require('../../config/config');
const logger = require('../../lib/logger/logger');
const { getMessage } = require('../../utils/messages');
const Prompt = require('../../models/prompt');

const gemini = async (req, res) => {
  try {
    const { meta, body } = req;
    const { reqIp, userAgent } = meta;
    let { data: { prompt } } = body;

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

    const promptData = new Prompt({
      prompt,
      res: text,
      reqIp,
      userAgent,
      os: userAgent.os,
      browser: userAgent.browser,
      deviceType: userAgent.deviceType,
    });
    await promptData.save();

    if (!text) {
      return res.send(getMessage('FAIL'));
    }
    logger.info(getMessage('SUCCESS').replace('{{ip}}', req.meta.reqIp));
    return res.status(httpStatus.OK).send(text);
  } catch (error) {
    throw new Error(`Error from gemini : ${error}`);
  }
};

module.exports = gemini;
