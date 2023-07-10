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
    timeLog('GET my-page called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
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
            for(let i = 0; i <rows.length; i++){
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
    timeLog('GET follower-info called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
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
            for(let i = 0; i <rows.length; i++){
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
    timeLog('GET followee-info called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
};



export { getMyPage, getFollowerInfo, getFolloweeInfo };