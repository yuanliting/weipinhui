const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
//删除某个收货地址
router.post('/removeGood',function (req,res,next) {
    console.log(req.body.params);
    if(req.session.user){
        var id = req.session.user._id;
        User.findById({'_id':id}).then((user)=>{
           // console.log(user);
            var n = 0;
            user.cartList.forEach((item,index)=>{
                if(index == req.body.params.index){
                  n = item.goodNum;
                }
            })
            var num = req.body.params.index;
            console.log('索引值' +  num);
            console.log('该商品的个数'+ n);
            //得到了，要删除的购物车里的商品的索引值了
            //根据索引值删除
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            // //删除该商品
            var rem =  user.cartList[num];
            user.cartList.remove(rem);
            //将购物车里的商品数量的也变化
            var m = 0;
            m = user.cartListNum - n;
            if(user.cartList.length == 0){
                m = 0;
            }
            user.cartListNum = m;
            // console.log('这是购物车里的商品数量'+ user.cartListNum);
            user.save();
            // console.log('再次输出数量'+user.cartListNum);
            // // //更新
            req.session.user = user;
            res.json({error:0,message:user})
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    }else{
        return res.json({error:1,message:'系统错误'});
    }
})

module.exports = router;
