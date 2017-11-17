const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
//减少用户购物里的某个商品的数量
router.post('/minusGood',function (req,res,next) {
    console.log(req.body.params);
    var n = req.body.params.index;
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
            // console.log(user);
            var m = 0;
            user.cartList.forEach((item,index)=>{
                if(n == index){
                    if(item.goodNum > 1){
                        item.goodNum --;
                    }else{
                        item.goodNum = 1;
                    }

                }
            })
            if(user.cartListNum > 1){
                user.cartListNum --;
            }else{
                user.cartListNum = 1;
            }
            // console.log( user.cartList[n].goodNum)
            var users = new User(user);
            //    保存
            users.save();
            console.log(users);
            //    更新
            req.session.user = users;
            res.json({error:0,message:'成功'});
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})
//增加用户购物里的某个商品的数量
router.post('/addGood',function (req,res,next) {
    console.log(req.body.params);
    var n = req.body.params.index;
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
           // console.log(user);
            var m = 0;
            user.cartList.forEach((item,index)=>{
                if(n == index){
                  item.goodNum ++;
                }
            })
            user.cartListNum ++;
           // console.log( user.cartList[n].goodNum)
            var users = new User(user);
        //    保存
            users.save();
            console.log(users);
        //    更新
            req.session.user = users;
            res.json({error:0,message:'成功'});
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})
module.exports = router;
