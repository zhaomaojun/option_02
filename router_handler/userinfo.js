// 导入数据库
const db = require('../db/index');

const bcrypt = require('bcryptjs')


// 获取用户信息处理函数
exports.getUserinfo = (req, res) => {
    // 定义查询用户信息的SQL语句
    const sqlStr = 'select id, username, nickname, user_pic, email from ev_users where id=?';
    // 使用 db.query() 执行
    db.query(sqlStr, req.user.id, (err, result) => {
        if (err) return res.cc(err);
        // 执行成功，但可能查询结果为空
        if (result.length !== 1) return res.cc('获取用户信息失败！');


        // 用户信息获取成功
        res.send({
            statusbar: 0,
            message: '获取成功！',
            data: result[0]
        })
    })

}

// 更新用户信息处理函数
exports.updateUserInfo = (req, res) => {
    // 定义SQL 语句
    const sqlStr = `update ev_users set ? where id=?`;
    db.query(sqlStr, [req.body, req.body.id], (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('更新用户信息失败！');
        res.cc('更新用户信息成功', 0)
    })
}

// 更新用户密码处理函数
exports.updatePwd = (req, res) => {
    // 查询用户信息是否存在
    const sql = `select * from ev_users where id=?`;
    // 从tokeen 中解析出的id 在req.user 中
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 1) return res.cc('用户不存在');
        // 判断旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password);
        if (!compareResult) return res.cc('旧密码错误');

        // 定义新密码sql 语句
        const sqlStr = 'update ev_users set password=? where id=?';
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
        db.query(sqlStr, [newPwd, req.user.id], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('密码更新失败！');
            res.cc('密码更新成功！', 0)
        })
    })
}

// 更新用户头像
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?';
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('头像更新失败');
        res.cc('头像更新成功！', 0)
    })
}