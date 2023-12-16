const express = require('express');
const cors = require('cors');
const compression = require('compression');
const httpStatus = require('http-status');
const path = require('path');

const CONFIG = require('./config/config');
const { VERSION_ROUTE, API_PREFIX, VIEWS_FOLDER_PATH } = require('./constants/api-constant');
const packageJson = require('../package.json');
const logger = require('./lib/logger/logger');
const router = require('./routes');

const app = express();

app.use(compression());

// CORS AND PARSERS
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, `.${VIEWS_FOLDER_PATH}`)));
app.use(express.urlencoded({ extended: true }));

app.use(`${API_PREFIX}`, router);

const homePage = path.join(`${__dirname}${VIEWS_FOLDER_PATH}/home.html`);

app.get('/', (req, res) => { res.status(httpStatus.OK).sendFile(homePage); });
app.get(`${VERSION_ROUTE}`, (req, res) => { res.json({ version: packageJson.version }); });

app.listen(CONFIG.PORT, () => {
  logger.info(`server started at http://localhost:${CONFIG.PORT}`);
});