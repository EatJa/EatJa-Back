'use strict';
import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { consoleBar, timeLog } from './lib/common.js';
import config from './config/config.js';
import { ping } from './controller/system.js';
import { myPage } from './controller/userInfo.js';

const serverPort = config.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const router = express.Router();

// -------------------- api --------------------

router.route('/ping').get(ping);
router.route('/my-page').get(myPage);

// -------------------- server start --------------------

app.use('/eatja/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');