var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify');
const NavSelect = require('../model/NavSelect');
router.get('/nav',function (req,res,next) {
    res.render('nav',{
        title:'这是添加导航内容的页面'
    })
})
router.post('/nav',function (req,res,next) {
    console.log(req.body);
    var nav = new NavSelect(req.body);
    nav.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
        res.json({error:0,message:'添加导航内容成功'})
    })
})
router.get('/findNav',function (req,res,next) {
    NavSelect.find().then((navs)=>{
        console.log(navs);
        res.json({error:0,message:navs});
    }).catch((err)=>{
        res.json({error:1,message:'系统错误'});
    })
})
module.exports = router;
