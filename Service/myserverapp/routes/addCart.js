const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
router.get('/addCart/:id',function (req,res,next) {
  console.log(req.params);
  if(req.session.user){
      User.findById({'_id':req.session.user._id}).then((user)=>{
          // console.log(user);
          Good.findById({'_id':req.params.id}).then((good)=>{
              // console.log(good);
              //判断购物车里有没有同样的商品
              var isCun = true;
              if(user.cartList.length > 0){
                  user.cartList.forEach(function (item,index) {
                      // console.log(item);
                      if(item._id == req.params.id){
                          //有
                          item.goodNum += 1;
                          var num = 0;
                          user.cartList.forEach(function (getGoods) {
                              num +=  getGoods.goodNum;
                              return num;
                          })
                          console.log(num);
                          user.cartListNum = num;
                        // console.log(user);
                          //重新实例化
                          let users = new User(user);
                          //保存
                          users.save();
                          //更新req.session.user的信息
                          req.session.user = users;
                          // console.log(req.session.user);
                          isCun = false;
                          return res.json({error:0,message:'成功',data:users});
                      }
                  })
              }
              if(isCun){
              //如果购物车里没有东西
                user.cartList.push(good);
                  user.cartListNum += 1;
                  user.save();
                  req.session.user = user;
                  return res.json({error:0,message:'成功',data:user});
              }

          }).catch((err)=>{
              return res.json({error:1,message:'系统错误'})
          })
      }).catch((err)=>{
          return res.json({error:1,message:'系统错误'})
      })
  }else{
      return res.json({error:1,message:'你还没有登录'});
  }
})
module.exports = router;
