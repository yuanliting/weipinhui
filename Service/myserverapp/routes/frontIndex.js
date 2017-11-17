const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */

//查询所有的商品
router.get('/getBigClassify',function (req,res,next) {
    bigClassify.find().then((bigCalssify)=>{
        if (!bigCalssify) {
            res.json({error: 1, message: '没有商品'})
        }
        res.json({error: 0, message: bigCalssify});
    }).catch((err)=>{
        res.json({error:1,message:'系统错误'});
    })
})
//用户登录-----------如果有人登陆了，就不能再登陆
router.get('/login', function(req, res,next) {
    if(req.session.user){
        return res.json({error:1,message:'有人在登录，你等会吧'});
    }else{
        // console.log(req.query);
        let userPhone = req.query.phone;
        User.findOne({userPhone:req.query.phone}).then((user)=> {
            if (!user) {
                return res.json({error: 1, message: '您还没有注册,请去注册吧！'});
            }
            // console.log(user);
            //设置cookie
            setting.create_cookie(user,res);
            req.session.user = user;
            res.json({
                error:'0',
                data:req.session.user,
                message: '登录成功'
            });
        }).catch((err)=>{
            return res.json({error:1,message:'登录失败'});
        })
    }

});
//用户注册
router.get('/register', function(req, res,next) {
    console.log(req.query);
    let userPhone = req.query.phone;
    User.findOne({userPhone:req.query.phone}).then((user)=>{
        console.log(user);
        if(user){
            return res.json({error:1,message:'用户已注册'});
        }
        let users = new User();
        users.userPhone = userPhone;
        users.save(function (err) {
            if(err){
                return res.json({error:1,message:'用户保存失败'});
            }
            res.json({
                error:'0',
                message: '注册成功'
            });
        });
    }).catch((err)=>{
       return res.json({error:1,message:'注册失败'});
    })

});
//检查用户是否登录了
router.get('/checkUser',function (req,res,next) {
    if(req.session.user){
        res.json({error:0,message:req.session.user})
    }else{
        res.json({error:1,message:'你未登录'})
    }
})
//用户退出
router.get('/logout',function (req,res,next) {
    req.session.destroy();
    //清空cookie
    res.clearCookie();
})
module.exports = router;
