// 导入解析formdata 格式表单数据包
const multer = require('multer');

// 导入处理路径的核心模块
const path = require('path');
const db = require('../db/index');

// 创建 multer 实例对象 通过dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// 这是发布文章处理函数
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！');
    // 导入处理路径的 path 核心模块
    const path = require('path');
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章作者的Id
        author_id: req.user.id,
    }

    // 定义发布文章的 SQL 语句
    const sql = `insert into ev_articles set ?`;
    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc('文章发布失败！');
        res.cc('文章发布成功！', 0)
    })

}