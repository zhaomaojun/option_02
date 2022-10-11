const express = require('express');
const router = express.Router();
const expressJoi = require('@escook/express-joi');

// 导入用户路由处理函数模块
const user_handler = require('../router_handler/user');


// 定义表单验证
const { reg_login_schema } = require('../schema/user');

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handler.reguser);

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login);



// 将 router 暴露出去
module.exports = router