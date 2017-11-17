const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
//前端的购物车里点击的在线支付处理
router.post('/ordering',function (req,res,next) {
    // console.log(req.body.params);
    var address = req.body.params.address;
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{

            var arr = [];
            var arr1 = []
           user.cartList.forEach((item,index)=>{
                if(item.choose == true){
                    arr.push(item)
                }else{
                    arr1.push(item);
                }
           })
            var n = 0;
            if(arr1.length == 0){
                n = 0;
                user.cartList = [];
            }else{
                arr1.forEach((item,index)=>{
                    n += item.goodNum
                })
                user.cartList = arr1;
            }
            var ordering = {
                address:address,
                goods:arr
            }
            user.ordering.push(ordering);
                user.cartListNum = n;
            user.save();
        // //    更新
            req.session.user = user;
            return res.json({error:0,message:'提交订单成功'})
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        return res.json({error:1,message:'提交订单失败'})
    }
})
//前端代付款页面的请求处理
router.post('/orderingPay',(req,res,next)=>{
    // console.log(req.body.params);
    var address = req.body.params.address;
    // console.log(address);
    if(req.session.user){
        var id = req.session.user._id;
        User.findUserById(id,(err,user)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            //如果用户更换收货地址，就更改地址
            user.ordering[0].address = address;
            // console.log( user.ordering[0].address);
            var users = new User(user);
            users.save();
            //更新
            req.session.user = users;

            return res.json({error:0,message:'提交订单成功'})
        })
    }else{
        return res.json({error:1,message:'提交订单失败'})
    }
})
//前端代付款的页面--取消支付
router.get('/canclePay',(req,res,next)=>{
    if(req.session.user){
        var id = req.session.user._id;
        User.findUserById(id,(err,user)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            user.ordering = [];
            // console.log( user.ordering[0].address);
            var users = new User(user);
            users.save();
            //更新
            req.session.user = users;

            return res.json({error:0,message:'取消订单成功'})
        })
    }else{
        return res.json({error:1,message:'取消订单失败'})
    }
})
//前端付款页面的处理
router.get('/ordered',(req,res,next)=>{
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // user.orderList = user.ordering;
            var address = user.ordering[0].address;
            var goods = user.ordering[0].goods;
            //应该是push进去
            var orderReceving = {
                address:address,
                goods:goods
            }
            user.orderReceving.push(orderReceving);
            user.ordering = [];
            // user.cartList = [];
            // user.cartListNum = 0;
            user.save();
            //    更新
            req.session.user = user;
            return res.json({error:0,message:'提交订单成功'})
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        return res.json({error:1,message:'提交订单失败'})
    }
})
//查看物流---确认订单
router.get('/sureOrdered/:id/:index',(req,res,next)=>{
    // console.log(req.params);
    var index1 = req.params.index;
    console.log(req.params.index);
    if(req.session.user) {
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
           // console.log(user);
            var de = {}
            user.orderReceving.forEach((item,index2)=>{
                if( index1 == index2 ){
                  de = item;
                }
            })
            // console.log(de);
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            user.orderList.push(de);
            user.orderReceving.remove(de);

            user.save();
        //    更新
            req.session.user = user;
            return res.json({error:0,message:'确定收货成功'})

        }).catch((err)=>{
            console.log(err);
        })
    }else{
        return res.json({error:1,message:'提交订单失败'})
    }

})
//删除订单
router.get('/removeOrder/:index',(req,res,next)=>{
    console.log(req.params.index);
    var index1 = req.params.index;
    if(req.session.user) {
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // console.log(user);
            var de = {}
            user.orderList.forEach((item,index2)=>{
                if( index1 == index2 ){
                    de = item;
                }
            })
            // console.log(de);
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            user.orderList.remove(de);
            user.save();
            //    更新
            req.session.user = user;
            return res.json({error:0,message:'删除订单成功'})
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        return res.json({error:1,message:'删除订单失败'})
    }
})
module.exports = router;
