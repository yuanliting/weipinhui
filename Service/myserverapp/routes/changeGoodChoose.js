const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
//购物车里的选择
router.post('/chooseCartList',(req,res,next)=>{
    // console.log(req.body);
    var index = req.body.params.index;
    var idG = req.body.params.id;
//    找到是购物车里的哪个商品
    if(req.session.user){
        var idU = req.session.user._id;
        User.findUserById(idU,(err,user)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            var good = {}
            user.cartList.forEach((item,index1)=>{
                if(item._id == idG){
                    if(item.choose == true){
                        item.choose = false;
                    }else{
                        item.choose = true;
                    }
                  good = item
                }
            })
            //重新实例化、
            var users = new User(user);
            users.save();
        //    更新
            req.session.user = users;
            res.json({error:0,message:good});
        })

    }
})
//全选购物车里的商品---全不选购物车里的商品
router.get('/chooseAllCartList',(req,res,next)=>{
    if(req.session.user){
        var idU = req.session.user._id;
        User.findUserById(idU,(err,user)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            var goods = []
            user.cartList.forEach((item,index1)=>{
                    if(item.choose == true){
                        item.choose = false;
                    }else{
                        item.choose = true;
                    }
                    goods.push(item)
            })
            //重新实例化、
            var users = new User(user);
            users.save();
            //    更新
            req.session.user = users;
            res.json({error:0,message:goods});
        })

    }
})
module.exports = router;
