const parser = require('ua-parser-js');

const reqMeta = (req, res, next) => {
  const reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || 'NA';
  let userAgent = parser(req.headers['user-agent']);

  userAgent = {
    ...userAgent,
    os: userAgent.os.name ? `${userAgent.os.name} ${userAgent.os.version}` : null,
    browser: userAgent.browser.name ? `${userAgent.browser.name} ${userAgent.browser.version}` : null,
    deviceType: userAgent.device.type ? `${userAgent.device.type} ${userAgent.device.model}` : null,
    rawUserAgent: req.headers['user-agent'],
  };

  const meta = {
    reqIp,
    userAgent,
  };

  req.meta = meta || {};

  next();
};

module.exports = reqMeta;
