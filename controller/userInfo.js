'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";

// ---------- [get]my-page -----------
// userId로 유저 정보 가져오기

const getMyPage = async (req, res) => {
    const query = 'SELECT * FROM user WHERE userId = ?; ';
    const userId = req.query.userId;
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, userId);
            results.user = rows[0];
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    res.send(results);
    consoleBar();
    timeLog('GET my-page called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};


// ---------- [get]follower-info -----------
// userId로 팔로워 정보 가져오기

const getFollowerInfo = async (req, res) => {
    const query = 'SELECT * FROM user WHERE userId IN(SELECT followerId FROM userRelation WHERE followeeId = ?);';
    const userId = req.query.userId;
    const results = {};
    results.result = true;
    results.error = [];
    results.userId = userId;
    results.followers = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, userId);
            for (let i = 0; i < rows.length; i++) {
                results.followers.push(rows[i]);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    res.send(results);
    consoleBar();
    timeLog('GET follower-info called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// ---------- [get]followee-info -----------
// userId로 팔로잉 정보 가져오기

const getFolloweeInfo = async (req, res) => {
    const query = 'SELECT * FROM user WHERE userId IN(SELECT followeeId FROM userRelation WHERE followerId = ?);';
    const userId = req.query.userId;
    const results = {};
    results.result = true;
    results.error = [];
    results.userId = userId;
    results.followers = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, userId);
            for (let i = 0; i < rows.length; i++) {
                results.followers.push(rows[i]);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    res.send(results);
    consoleBar();
    timeLog('GET followee-info called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};


// ---------- [post]follow -----------
// follow 동작시 userRelation 업데이트

const postFollow = async (results, followerId, followeeId) => {
    const query = 'INSERT INTO userRelation(followerId, followeeId) VALUES (?,?);';

    const queryData = [followerId, followeeId];

    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [postFollow]');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [postFollow]');
    }
};

// ---------- [post]follow -----------
// follow 동작시 follower 증가

const appendFollowee = async (results, followerId) => {
    const query = 'UPDATE user set followeeCount = followeeCount + 1 WHERE userId = ?;';

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, followerId);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [appendFollowee]');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [appendFollowee]');
    }

};

// ---------- [post]follow -----------
// follow 동작시 followee 증가

const appendFollower = async (results, followeeId) => {
    const query = 'UPDATE user set followerCount = followerCount + 1 WHERE userId = ?;';

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, followeeId);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [appendFollower');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [appendFollower]');
    }
};

// ---------- [delete]follow -----------
// unfollow 동작
const deleteFollow = async (results, followerId, followeeId) => {
    const query = 'DELETE FROM userRelation WHERE followerId = ? AND followeeId = ?;';

    const queryData = [followerId, followeeId];

    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [postFollow]');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [postFollow]');
    }
};

// ---------- [delete]follow -----------
// unfollow 동작시 follower 감소

const reduceFollowee = async (results, followerId) => {
    const query = 'UPDATE user set followeeCount = followeeCount - 1 WHERE userId = ?;';

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, followerId);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [appendFollowee]');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [appendFollowee]');
    }

};

// ---------- [delete]follow -----------
// unfollow 동작시 followee 감소

const reduceFollower = async (results, followeeId) => {
    const query = 'UPDATE user set followerCount = followerCount - 1 WHERE userId = ?;';

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, followeeId);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error [appendFollower');
        }
    } catch (err) {
        results.result = false;
        results.error.push('DB Error [appendFollower]');
    }
};

export {
    getMyPage, getFollowerInfo, getFolloweeInfo,
    postFollow, appendFollowee, appendFollower,
    deleteFollow, reduceFollowee, reduceFollower
};