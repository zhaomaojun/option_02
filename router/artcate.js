// 这是文章分类管理路由模块
const express = require('express');
const router = express.Router();

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
const { add_artcate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate');

// 导入文章分类处理函数
const artCate_handler = require('../router_handler/artcate');
// 获取文章分类列表
router.get('/cates', artCate_handler.getArticleCate);

// 新增文章分类
router.post('/addcates', expressJoi(add_artcate_schema), artCate_handler.addArticleCate);

// 删除文章分类列表
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artCate_handler.deleteCateById);

// 根据ID 查询文章分类列表
router.get('/cates/:id', expressJoi(get_cate_schema), artCate_handler.getArtCateById);

// 根据ID 更新文章分类列表
router.post('/updatecate', expressJoi(update_cate_schema), artCate_handler.updateArtCateById)

module.exports = router