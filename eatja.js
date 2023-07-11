'use strict';
import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { consoleBar, timeLog } from './lib/common.js';
import config from './config/config.js';
import { ping } from './controller/system.js';
import { getFolloweeInfo, getFollowerInfo, getMyPage, getSearchUser } from './controller/userInfo.js';
import { deleteMyReview, getMyReview, getReviewInfo, getTagReview, geAllReview } from './controller/reviewInfo.js';
import { follow, unFollow } from './controller/following.js';
import { signIn } from './controller/singUp.js';
import { uploadReview } from './controller/uploadReview.js';

// ------------------ router set ------------------

const serverPort = config.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const router = express.Router();

// ------------------ multer set ------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './reviewImages/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });

// -------------------- api --------------------

router.route('/ping').get(ping);
router.route('/sign-in').post(signIn);
router.route('/my-page').get(getMyPage);
router.route('/my-review').get(getMyReview);
router.route('/my-review').post(upload.single('imgUrl'), uploadReview);
router.route('/my-review').delete(deleteMyReview);
router.route('/review-info').get(getReviewInfo);
router.route('/tag-review').get(getTagReview);
router.route('/follower-info').get(getFollowerInfo);
router.route('/followee-info').get(getFolloweeInfo);
router.route('/follow').post(follow);
router.route('/follow').delete(unFollow);
router.route('/search-user').get(getSearchUser);
router.route('/all-review').get(geAllReview);


// -------------------- server start --------------------

app.use('/eatja/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');