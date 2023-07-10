'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";

// ---------- my-page -----------

const myPage = async (req, res) => {
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

export { myPage };