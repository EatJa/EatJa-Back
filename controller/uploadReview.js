'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";

// ------- multer server upload image -------
// ---------- [post]my-reviw -----------
// 사진 저장 후 리뷰 작성

  const uploadReview = async (req, res) => {
    const query = 'INSERT INTO review (userId, imgUrl, locationUrl, tag, description) VALUES (?,?,?,?,?);';
  
    const userId = req.body.userId;
    const imgUrl = `/reviewImages/${req.file.filename}`; // Use the uploaded file's filename
    const locationUrl = req.body.locationUrl;
    const tag = req.body.tag;
    const description = req.body.description;
  
    const queryData = [userId, imgUrl, locationUrl, tag, description];
    
    const results = {};
    results.result = true;
    results.error = [];
  
    try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const [rows, fields] = await connection.query(query, queryData);
      } catch (err) {
        results.result = false;
        results.error.push('Query Error');
      } finally {
        connection.release();
      }
    } catch (err) {
      results.result = false;
      results.error.push('DB Error');
    }
  
    res.send(results);
    consoleBar();
    timeLog('POST my-review called // ' + JSON.stringify(req.body) + ' // ' + JSON.stringify(results));
  };
  
export { uploadReview };