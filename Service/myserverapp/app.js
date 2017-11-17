var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 导入session
const session = require('express-session');
//导入存储session的模块
const MongoStore = require('connect-mongo')(session);
//导入ejs模块
const ejs = require('ejs');
//导入上传图片的模块
const multer = require('multer');
//导入时间模块
const moment = require('moment');
const multiparty = require('multiparty');
var setting = require('./common/setting')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
//// 对cookie进行签名  == 加密
app.use(cookieParser('yuan' ));
//设置静态资源文件夹---express唯一的内置中间件
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// 设置session
app.use(session({
    secret:'yuan',
    store:new MongoStore({
    //  链接mongooseDB数据库
        url:'mongodb://localhost/WenPinHui'
    }),
    resave:false,
    saveUninitialized:false,
    name:'yuan'
}))
//前端登录注册的处理
app.use(require('./routes/frontIndex'));
//后端的首页
app.use(require('./routes/behindIndex'));
//后端添加商品
app.use(require('./routes/addGood'));
//删除后端的商品
app.use(require('./routes/removeGoodBehind'));
//编辑后端的商品
app.use(require('./routes/editGoodBehind'));
app.use(require('./routes/add'));
//这是品牌的
app.use(require('./routes/brand'));
//这是导航的
app.use(require('./routes/NavSelect'));
//这是获取商品的
app.use(require('./routes/getGood'));
//加入购物车
app.use(require('./routes/addCart'));
//添加单个品牌的图片
app.use(require('./routes/sigleBrand'));
//添加单个品牌的小图片
app.use(require('./routes/sigleBrandSmall'))
//添加地址
app.use(require('./routes/addAddress'));
//删除收货地址---修改收货地址
app.use(require('./routes/removeAddress'));
//删除购物车里的某个商品
app.use(require('./routes/removeGood'));
//减少用户购物车里的某个商品的数量
app.use(require('./routes/minusGood'));
//选择购物车里的商品
app.use(require('./routes/changeGoodChoose'));
//提交代付款的信息
app.use(require('./routes/ordering'));
//评价
app.use(require('./routes/evaluate'));
//搜索商品
app.use(require('./routes/searchGood'));
//更改用户信息
app.use(require('./routes/changeUserInfo'));
//收藏以及取消收藏商品的处理
app.use(require('./routes/collectionGood'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.get('/login',function (req,res,next) {
//     res.json({error:0,message:'成功'});
// })
app.listen(4000,function () {
    console.log('后端运行');
})
module.exports = app;
