// 导入 express
const express = require('express');
// 创建服务器的实例对象
const app = express();
const joi = require('joi');

// 导入 cros 跨域中间件
const cors = require('cors');
app.use(cors());

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));

// 在路由之前优化res.send(),封装为res.cc函数中间件
app.use((req, res, next) => {
    res.cc = function(err, statusbar = 1) {
        res.send({
            statusbar,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})

// 一定在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }));


// 导入并使用路由模块
const userRouter = require('./router/user');
app.use('/api', userRouter);

// 导入并使用获取用户信息路由
const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

// 导入并使用文章分类管理路由
const artCateRouter = require('./router/artcate');
app.use('/my/article', artCateRouter);

// 导入并使用发布文章路由模块
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);

// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误种类
    if (err instanceof joi.ValidationError) return res.cc(err);
    // 捕获身份失败错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败');
    res.cc('未知错误')
})



// 启动服务器
app.listen(3007, () => {
    console.log('app server running at http://127.0.0.1:3007');
})