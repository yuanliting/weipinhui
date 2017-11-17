var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify')
/* GET users listing. */
const multer = require('multer');

//渲染首页
router.get('/addGood/:id',function (req,res,next) {
    console.log(req.params);
    var id = req.params.id
    Brand.findById({'_id':id}).then((brand)=>{
        var name = brand.brandName;
        Good.findGoodByName(name,(err,goods)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            res.render('addGood',{
                title:'这是添加商品的页面',
                brandName:brand.brandName,
                goods:goods
            })
        })
    }).catch((err)=>{
        console.log(err);
    })
})

//渲染大分类页面
router.get('/big',function (req,res,next) {
    res.render('big',{
        title:'这是添加大分类页面'
    })
})
//处理大分类捞
router.post('/big',function (req,res,next) {
    console.log(req.body);
    var big = new bigClassify(req.body);
    big.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
        res.json({error:0,message:'添加大分类成功'})
    })
    // res.json({error:0,message:'成功'});
})
//渲染小分类页面
router.get('/small',function (req,res,next) {
    res.render('small',{
      title:'这是小分类页面'
    })
})
//处理小分类
var storage = multer.diskStorage({
    destination:'public/classify',
    filename:function(req,res,cb){
        var name = req.body.ClassifyName;
        cb(null, name + '.jpg');
    }
})
var upload = multer({storage:storage});
router.post('/small',upload.single('photo'),function(req,res,next){
    console.log(req.body)
    req.body.img = `/classify/${req.body.ClassifyName}.jpg`;
    var classifys  = new classify(req.body);
    classifys.save(function (err,smalldata) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
        // console.log(data);
        bigClassify.findOne({'bigClassifyName':req.body.belongTo}).then((data)=>{
          data.smallClassify.push(smalldata);
           data.save();
           res.json({error:0,message:'添加小分类成功'});
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'});
        })
    })
})

module.exports = router;
