var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify')
router.get('/removeGoodBehind/:id',(req,res,next)=>{
    console.log(req.params);
    var id = req.params.id;
    Good.removeGoodById(id,(err,good)=>{
        if(err){
            return res.json({error:1,message:'系统错误'})
        }
        res.json({error:0,message:'成功'})
    })
})
module.exports = router;
