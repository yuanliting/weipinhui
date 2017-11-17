var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify')
/* GET users listing. */
//渲染首页
router.get('/',(req,res,next)=> {
    Brand.findAllBrands((err,brands)=>{
        if(err){
            return res.end(err);
        }
        // console.log(brands);
        res.render('index',{
            title:'这是首页',
            brands:brands
        })
        res.json({error:0,message:'成功'})
    })

})
module.exports = router;
