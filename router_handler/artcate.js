// 导入数据库操作
const db = require('../db/index');


// 这是获取文章分类列表处理函数模块
exports.getArticleCate = (req, res) => {
    // 定义查询文章分类列表sql 语句
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc';
    db.query(sql, (err, result) => {
        if (err) return res.cc(err);
        res.send({
            statusbar: 0,
            message: '获取文章列表成功！',
            data: result
        })
    })
}

// 新增文章分类处理函数
exports.addArticleCate = (req, res) => {
    // 定义文章查重 SQL 语句
    const sql = `select * from ev_article_cate where name=? or alias=?`;
    // 执行sql 语句
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err);
        // 判断 result.length
        if (result.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！');
        // 判断 length === 1 的三种情况
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias)
            return res.cc('分类名称与分类别名被占用，请更换后重试！');
        if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

        // 新增文章分类
        const sql = `insert into ev_article_cate set ?`;
        db.query(sql, req.body, (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('新增文章失败！');
            res.cc('添加成功！', 0);
        })


    })
}

// 删除文章列表处理函数
exports.deleteCateById = (req, res) => {
    // 定义删除文章分类的sql语句 标记删除
    const sql = `update ev_article_cate set is_delete=1 where id=?`;
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('删除失败！');
        res.cc('删除文章成功！', 0)
    })
}

// 根据ID 获取文章分类列表处理函数
exports.getArtCateById = (req, res) => {
    // 定义获取文章分类列表的 sql 语句
    const sql = `select * from ev_article_cate where id=?`;
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.cc(err);
        if (result.length !== 1) return res.cc('获取文章分类列表失败！');
        res.send({
            statusbar: 0,
            message: '获取文章分类列表成功！',
            data: result[0]
        })
    })
}

// 根据ID 更新文章分类列表处理函数
exports.updateArtCateById = (req, res) => {
    // 判断文章id name alias 查重的 SQL 语句
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`;
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err);
        // 判断 result.length
        if (result.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！');
        // 判断 length === 1 的三种情况
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias)
            return res.cc('分类名称与分类别名被占用，请更换后重试！');
        if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

        // 实现更新文章分类的功能
        const sql = `update ev_article_cate set ? where id=?`;
        db.query(sql, [req.body, req.body.Id], (err, result) => {
            if (err) return res.cc(err);
            if (result.affectedRows !== 1) return res.cc('更新失败！');
            res.cc('更新成功！', 0)
        })
    })

}