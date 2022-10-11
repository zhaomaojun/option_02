// 这是发布文章路由
const express = require('express');
const router = express.Router();
// 导入文章处理函数
const article_handler = require('../router_handler/article');
// 导入解析formdata 格式表单数据包
const multer = require('multer');

// 导入处理路径的核心模块
const path = require('path');

// 创建 multer 实例对象 通过dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// 导入验证规则中间件
const expressJoi = require('@escook/express-joi');
// 导入验证规则
const { add_article_schema } = require('../schema/article');

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)

module.exports = router