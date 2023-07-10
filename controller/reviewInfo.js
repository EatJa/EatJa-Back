'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";

// ---------- my-review -----------

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
            console.log(rows);
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

export { getMyReview };