'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";

// ---------- [get]my-review -----------
// userId로 리뷰 찾기

const getMyReview = async (req, res) => {
    const query = 'SELECT * FROM review WHERE userId = ?; ';
    const userId = req.query.userId;
    const results = {};
    results.result = true;
    results.error = [];
    results.userId = userId;
    results.reviews = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, userId);
            for(let i = 0; i <rows.length; i++){
                results.reviews.push(rows[i]);
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
    timeLog('GET my-review called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
};

// ---------- [get]tag-review -----------
// tag로 리뷰 찾기

const getTagReview = async (req, res) => {
    const query = 'SELECT * FROM review WHERE tag = ?; ';
    const tagId = req.query.tagId;
    const results = {};
    results.result = true;
    results.error = [];
    results.tagId = tagId;
    results.reviews = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, tagId);
            for(let i = 0; i <rows.length; i++){
                results.reviews.push(rows[i]);
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
    timeLog('GET tag-review called // '+ JSON.stringify(req.query)+ ' // '+ JSON.stringify(results));
};

export { getMyReview, getTagReview };