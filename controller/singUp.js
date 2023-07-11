'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { consoleBar, timeLog, resSend } from "../lib/common.js";
import { pool } from "../lib/connect.js";
import { checkSignUp, postSignUp, login } from './userInfo.js';

// ---------- [post]sign-in -----------
// 로그인 (회원가입이 안되어있다면 회원가입 후 리턴)

const signIn = async (req, res) => {
    const results = {};

    const userId = req.body.userId;
    const userName = req.body.userName;
    const profileImg = req.body.profileImg;

    await checkSignUp(results, userId);

    if (results.isSignUp == false) {
        postSignUp(results, userId, userName, profileImg);
        timeLog('SIGN-UP // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
    }

    login(results, userId);

    res.send(results);
    consoleBar();
    timeLog('POST sign-in called // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

export { signIn };