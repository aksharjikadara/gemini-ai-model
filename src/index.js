const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const compression = require('compression');
const httpStatus = require('http-status');
const path = require('path');

const { rateLimitMiddleware } = require('./middlewares');
const CONFIG = require('./config/config');
const { VERSION_ROUTE, API_PREFIX, VIEWS_FOLDER_PATH } = require('./constants/api-constant');
const packageJson = require('../package.json');
const logger = require('./lib/logger/logger');
const router = require('./routes');

const serverStartTime = new Date();

const app = express();

app.use(compression());

app.set('trust proxy', true);

// CORS AND PARSERS
app.use(cors());
app.use(express.json());
app.use(rateLimitMiddleware);
app.use(express.static(path.join(__dirname, `.${VIEWS_FOLDER_PATH}`)));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(CONFIG.DB.CONNECTION_URL)
  .then(() => {
    logger.info('Connection Successfully!');
  })
  .catch((error) => {
    logger.info('Connection failed!', error);
  });

app.use(`${API_PREFIX}`, router);

const homePage = path.join(`${__dirname}${VIEWS_FOLDER_PATH}/home.html`);

app.get('/', (req, res) => { res.status(httpStatus.OK).sendFile(homePage); });
app.get(`${VERSION_ROUTE}`, (req, res) => {
  const { meta } = req;
  const timeDifference = Date.now() - serverStartTime.getTime();
  const { reqIp } = meta;

  res.json({
    name: packageJson.name,
    version: packageJson.version,
    startTime: serverStartTime.toISOString(),
    upTime: timeDifference,
    ip: reqIp,
  });
});

app.listen(CONFIG.PORT, () => {
  logger.info(`server started at http://localhost:${CONFIG.PORT}`);
});

module.exports = app;
