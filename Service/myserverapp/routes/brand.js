var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const classify = require('../model/classify');
const multer = require('multer');
const NavSelect = require('../model/NavSelect')
//渲染品牌页面
router.get('/brand',function (req,res,next) {
    res.render('brand',{
        title:'这是添加品牌的页面'
    })
})
var storage = multer.diskStorage({
    destination:'public/brands',
    filename:function(req,res,cb){
        var name = req.body.brandName;
        cb(null, name + '.jpg');
    }
})
var upload = multer({storage:storage});
router.post('/brand',upload.single('photo'),function(req,res,next){
    // console.log(req.body);
    req.body.brandImg = `/brands/${req.body.brandName}.jpg`;
    var brand  = new Brand(req.body);
    brand.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
        // NavSelect.findOne({'NavName':req.body.brandType}).then((nav)=>{
        //     nav.brandNames.push(data);
        //     nav.save();
            return  res.json({error:0,message:'品牌添加成功'});
        // }).catch((err)=>{
        //     return res.json({error:1,message:'系统错误'});
        // })

    })
})
//前端首页获取所有的品牌
router.get('/allBrand',(req,res,next)=>{
    var m = 0;
    console.log(req.query);
    Brand.find().limit(1).skip(req.query.page * 1).then((brands)=>{
        // console.log(brands);
        res.json({error:0,message:brands})
    }).catch((err)=>{
    return  res.json({error:1,message:'系统错误'})
    })
})
//前端选择获取品牌
router.get('/chooseBrand/:name',(req,res,next)=>{
    // console.log(req.params);
    var name = req.params.name;
        Brand.findBrandByName(name,(err,brands)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            res.json({error:0,message:brands})
        })
})
router.get('/dehindRemoveBrand/:id/:brandType',function(req,res,next){
    // console.log(req.params);
    var id = req.params.id;
    var name = req.params.brandType;
    NavSelect.findOne({'NavName':name}).then((NavName)=>{
        var n = 0;
        NavName.brandNames.forEach((item,index)=>{
            if(item._id == id){
                n = index;
            }
        })
        console.log(n);
        var de = NavName.brandNames[n];
        console.log(de);
        Array.prototype.remove = function(val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
        NavName.brandNames.remove(de);
        console.log( NavName.brandNames);
        NavName.save();
        Brand.removeBrandById(id,(err,brand)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
        })
        res.json({error:0,message:'删除成功'});
    }).catch((err)=>{
        return res.json({error:1,message:'系统错误'});
    })

})
module.exports = router;
