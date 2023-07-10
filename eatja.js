'use strict';
import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { consoleBar, timeLog } from './lib/common.js';
import config from './config/config.js';
import { ping } from './controller/system.js';
import { getFolloweeInfo, getFollowerInfo, getMyPage } from './controller/userInfo.js';
import { deleteMyReview, getMyReview, getReviewInfo, getTagReview, postMyReview } from './controller/reviewInfo.js';
import { follow } from './controller/following.js';

const serverPort = config.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const router = express.Router();

// -------------------- api --------------------

router.route('/ping').get(ping);
router.route('/my-page').get(getMyPage);
router.route('/my-review').get(getMyReview);
router.route('/my-review').post(postMyReview);
router.route('/my-review').delete(deleteMyReview);
router.route('/review-info').get(getReviewInfo);
router.route('/tag-review').get(getTagReview);
router.route('/follower-info').get(getFollowerInfo);
router.route('/followee-info').get(getFolloweeInfo);
router.route('/follow').post(follow);


// -------------------- server start --------------------

app.use('/eatja/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');