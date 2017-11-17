const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const Evaluate = require('../model/Evaluate');
//更改用户信息
var multer = require('multer');
var storage = multer.diskStorage({
    destination:'public/userPhoto',
    filename:function (req,file,cb) {
        var times = Date.now();
        cb(null,times + '.jpg');
        req.body.picture = times + '.jpg'

    }
})
var upload = multer({storage:storage});
router.post('/changeUserP',upload.array('photo',6),(req,res,next)=>{
    console.log(req.body);
    var userImg;
    if(req.body.picture){
        userImg = `/userPhoto/${req.body.picture}`;
    }
    if(req.session.user){
        var ids = req.session.user._id;
        User.findUserById(ids,(err,user)=>{
            if(err){
            return res.json({error:1,message:'系统错误'})
        }
        user.userImg = userImg;
            user.save();
        //    更新
            req.session.user = user;
            res.json({error:0,message:'更改头像成功'})
        })

    }
})
router.post('/changeUserN',(req,res,next)=>{
    console.log(req.body);
    var name = req.body.params.name;
    if(req.session.user) {
        var ids = req.session.user._id;
        User.findUserById(ids, (err, user) => {
            if (err) {
                return res.json({error: 1, message: '系统错误'})
            }
            user.userName = name;
            user.save();
            //    更新
            req.session.user = user;
            res.json({error: 0, message: '更改用户名成功'})
        })
    }
})


module.exports = router;