const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
//删除某个收货地址
router.post('/removeAddress',function (req,res,next) {
    var index = req.body.params.index;
    // console.log(index);
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // console.log(user);
          // console.log(  user.addressList[index]);
          var de = user.addressList[index];
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            user.addressList.remove(de);
            console.log(user.addressList)
            user.save();
            //更新
            req.session.user = user;
            res.json({error:0,message:user})
        }).catch((err)=>{
           return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})
//查找收货地址
router.post('/findAddress',function (req,res,next) {
    console.log(req.body.params);
    var index = req.body.params.index;
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // console.log(user);
            console.log(  user.addressList[index]);
            var update = user.addressList[index];
            res.json({error:0,message:update})
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})
//修改收货地址
router.post('/updateAddress',function (req,res,next) {
    // console.log(req.body.params);
    // res.json({error:0,message:'成功'})
    var index = req.body.params.item;
    var name = req.body.params.userName;
    var tel = req.body.params.tel;
    var goToTime = req.body.params.goToTime;
    var detailAddress = req.body.params.detailAddress;
    var choose = req.body.params.choose;
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // console.log(user);
            console.log(  user.addressList[index]);
           user.addressList[index].name = name;
           user.addressList[index].tel = tel;
           user.addressList[index].goToTime = goToTime;
           user.addressList[index].detailAddress = detailAddress;
           user.addressList[index].choose = choose;
           console.log(user.addressList[index]);
            //重新实例化
            var users = new User(user);
            users.save();
            //更新
            req.session.user = users;
            res.json({error:0,message:'修改成功'})
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})
module.exports = router;
