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
            for (let i = 0; i < rows.length; i++) {
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
    timeLog('GET my-review called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// ---------- [post]my-review -----------
// 리뷰 작성

const postMyReview = async (req, res) => {
    const query = 'INSERT INTO review (userId, imgUrl, locationUrl, tag, description) VALUES (?,?,?,?,?);';

    const userId = req.body.userId;
    const imgUrl = req.body.imgUrl;
    const locationUrl = req.body.locationUrl;
    const tag = req.body.tag;
    const description = req.body.description;

    const queryData = [userId, imgUrl, locationUrl, tag, description];

    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
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
    timeLog('POST my-review called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// ---------- [delete]my-review -----------
// 리뷰 삭제

const deleteMyReview = async (req, res) => {
    const query ='DELETE FROM review WHERE reviewId = ?';
    const reviewId = req.query.reviewId;

    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, reviewId);
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
    timeLog('DELETE my-review called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));


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
            for (let i = 0; i < rows.length; i++) {
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
    timeLog('GET tag-review called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};


// ---------- [get]review-info -----------
// reviewId로 리뷰 찾기

const getReviewInfo = async (req, res) => {
    const query = 'SELECT * FROM review WHERE reviewId = ?; ';
    const reviewId = req.query.reviewId;
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, reviewId);
            results.review = rows[0];
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
    timeLog('GET review-info called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};



export { getMyReview, postMyReview, deleteMyReview, getTagReview, getReviewInfo };