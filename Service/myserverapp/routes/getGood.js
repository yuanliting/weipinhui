const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
// router.post('/getGood',function (req,res,next) {
//     console.log('获得商品'+ req.body.params);
//     var goodName = req.body.params;
//     Good.find({'brandName':goodName}).then((goods)=>{
//         // console.log(goods);
//         res.json({error:0,message:goods})
//     }).catch((err)=>{
//         res.json({error:1,message:'系统错误'});
//     })
//
// })
router.get('/goodDetail/:id',function (req,res,next) {
    // console.log(req.params);
    var id = req.params.id;
    Good.findById({'_id':id}).then((good)=>{
        // console.log(good)
        res.json({error:0,message:good});
    }).catch((err)=>{
        res.json({error:1,message:'系统错误'});
    })

})

module.exports = router;