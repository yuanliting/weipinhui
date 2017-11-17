var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify');
const multer = require('multer');
//管理员添加商品
var storage = multer.diskStorage({
    destination:'public/goods',
    filename:function(req,res,cb){
        var name = req.body.goodName;
        cb(null, name + '.jpg');
    }
})
var upload = multer({storage:storage});
router.post('/adding',upload.single('photo'),function(req,res,next){
    console.log(req.body)
    console.log('1234567')
    req.body.goodImg = `/goods/${req.body.goodName}.jpg`;
    var good  = new Good(req.body);
    good.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
    })
    res.json({error:0,message:'商品添加成功'});
})

module.exports = router;