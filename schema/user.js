// 导入表单验证规则模块
const joi = require('joi');

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(/^[\S]{6,12}$/).required();

// 定义id nickname Email 验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const user_email = joi.string().email().required();

// 更换头像验证规则
const avatar = joi.string().dataUri().required();

// 定义验证注册和登录表单的规则对象
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 更新用户基本信息验证规则对象
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email: user_email
    }
}

// 更新用户密码验证规则对象
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 更换头像验证规则
exports.update_avatar_schema = {
    body: {
        avatar
    }
}