var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify')
router.get('/editGood/:id',(req,res)=>{
    console.log(req.params);
    var id = req.params.id;
    Good.findGoodById(id,(err,good)=>{
        if(err){
            return res.end(err)
        }
        res.render('editGood',{
            title:'这是编辑商品的页面',
            good:good
        })
        res.json({error:0,message:'成功'})
    })

})
router.post('/editGoodH',(req,res)=>{
    console.log(req.body)
    var id = req.body.id;
    var goodPrice = req.body.goodPrice;
    var categorys = req.body.categorys;
    var discount = req.body.discount;
    var size = req.body.size;
    var yieldly = req.body.yieldly;
    var texture = req.body.texture;
    var fashion_element = req.body.fashion_element;
    var goodFunction = req.body.goodFunction;
    var skin = req.body.skin;
    var goodType = req.body.goodType;
    var timeLimit = req.body.timeLimit;
    var specification = req.body.specification;
    var detail = req.body.detail;
    var good_describe = req.body.good_describe;
    var controller = req.body.controller;
    var originalPrice = req.body.originalPrice;
    var goodDis = req.body.goodDis;
    Good.findGoodById(id,(err,good)=>{
        if(err){
            return res.end(err)
        }
       good.goodPrice = goodPrice;
        good.categorys = categorys;
        good.discount = discount;
        good.size = size;
        good.yieldly = yieldly;
        good.texture = texture;
        good.fashion_element = fashion_element;
        good.goodFunction = goodFunction;
        good.skin = skin;
        good.goodType = goodType;
        good.timeLimit = timeLimit;
        good.specification = specification;
       good.detail = detail;
       good.good_describe = good_describe;
       good.controller = controller;
       good.originalPrice = originalPrice;
       good.goodDis = goodDis;
       good.save();
        res.json({error:0,message:'成功'})
    })

})
module.exports = router;
