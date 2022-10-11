const express = require('express');
const router = express.Router();

// 挂载路由
const userinfo_handler = require('../router_handler/userinfo');
// 导入验证规则的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要验证规则的对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user');

// 获取用户信息
router.get('/userinfo', userinfo_handler.getUserinfo);
// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo);
// 更新用户密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePwd);
// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar);

module.exports = router