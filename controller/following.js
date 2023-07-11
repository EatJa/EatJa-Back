'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { appendFollowee, appendFollower, deleteFollow, postFollow, reduceFollower, reduceFollowee, checkFollow } from './userInfo.js';

const follow = async (req, res) => {
    const results = {};

    const followerId = req.body.followerId;
    const followeeId = req.body.followeeId;

    await checkFollow(results, followerId, followeeId);

    if (results.exist == false) {
        postFollow(results, followerId, followeeId);

        appendFollower(results, followeeId);
        appendFollowee(results, followerId);

        res.send(results);
        consoleBar();
        timeLog('POST follow called // ' + JSON.stringify(req.body) + ' // ' + JSON.stringify(results));
    }
    else {
        res.send(results);
        consoleBar();
        timeLog('POST follow called [ALEADY FOLLOWED]// ' + JSON.stringify(req.body) + ' // ' + JSON.stringify(results));
    }
};

const unFollow = async (req, res) => {
    const results = {};

    const followerId = req.query.followerId;
    const followeeId = req.query.followeeId;

    deleteFollow(results, followerId, followeeId);
    reduceFollower(results, followeeId);
    reduceFollowee(results, followerId);

    res.send(results);
    consoleBar();
    timeLog('DELETE follow called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

}

export { follow, unFollow };