// 导入数据库模块
const db = require('../db/index');
// 导入密码加密模块
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// 注册用户处理函数
exports.reguser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body;
    // 判断数据是否合法
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('用户名或密码不能为空')
    // }

    // 定义 sql语句 查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?';
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) {
            return res.cc('查询失败')
        }
        // 用户名是否被占用
        if (result.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        // 调用 bcryptjs.hashsync() 方法对密码加密
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
        // 定义插入新用户的sql 语句
        const sql = 'insert into ev_users set ?';
        // 调用 db.query 执行sql语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err);
            // 判断影响行数是否为1
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！');
            // 注册成功
            res.cc('注册成功！', 0)
        })
    })

    // res.send('reguser ok')
};

// 登录处理函数
exports.login = (req, res) => {
    const userinfo = req.body;
    //定义sql 语句
    const sqlStr = 'select * from ev_users where username=?';
    // 执行sql 语句
    db.query(sqlStr, userinfo.username, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 1) return res.cc('登录失败');
        // 验证密码是否正确
        const comparResult = bcryptjs.compareSync(userinfo.password, result[0].password);
        if (!comparResult) return res.cc('登录失败');

        // 在服务器生成token字符串
        const users = {...result[0], password: '', user_pic: '' };
        const tokenStr = jwt.sign(users, config.jwtSecretKey, { expiresIn: '10h' });
        // 调用res.send() 将token响应给客户端
        res.send({
            statusbar: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })





};