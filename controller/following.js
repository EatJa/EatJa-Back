'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { appendFollowee, appendFollower, postFollow } from './userInfo.js';

const follow = async (req, res) => {
    const results = {};

    const followerId = req.body.followerId;
    const followeeId = req.body.followeeId;

    postFollow(results, followerId, followeeId);
    appendFollower(results, followeeId);
    appendFollowee(results, followerId);
    
    res.send(results);
    consoleBar();
    timeLog('POST follow called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
};

const unFollow = async (req, res) => {
    const results = {};

    const followerId = req.query.followerId;
    const followeeId = req.query.followeeId;

    
}

export { follow };