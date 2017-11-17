var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const multer = require('multer');

//单个品牌
const sigleBrand = require('../model/sigleBrand');
const sigleBrandSmall = require('../model/sigleBrandSmall')
//渲染单个品牌页面
router.get('/sigleBrandSmall',function (req,res,next) {
    res.render('sigleBrandSmall',{
        title:'这是添加单个品牌的小图片'
    })
})
var storage = multer.diskStorage({
    destination:'public/sigleBrandSmall',
    filename:function(req,res,cb){
        var name = req.body.sigleBrandName;
        cb(null, name + '.jpg');
    }
})
var upload = multer({storage:storage});
router.post('/sigleBrandSmall',upload.single('photo'),function(req,res,next){
    // console.log(req.body);
    req.body.sigleBrandImg = `/sigleBrandSmall/${req.body.sigleBrandName}.jpg`;
    var siglesmall  = new sigleBrandSmall(req.body);
    siglesmall.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
        console.log(data);
        res.json({error:0,message:'添加成功'});
    })
})
router.get('/brand/:id',function (req,res,next) {
    // console.log('获得品牌的id'+req.params);
    Brand.findById({'_id':req.params.id}).then((data)=>{
        Good.find({'brandName':data.brandName}).then((goods)=>{
            // console.log('获取品牌的商品' + goods);
             res.json({error:0,message:goods});
        }).catch((err)=>{
           return res.json({error:1,message:'系统错误'})
        })
    }).catch((err)=>{
        return res.json({error:1,message:'系统错误'})
    })

})
router.post('/sortZ',(req,res)=>{
    console.log(req.body.params)
    var sorts = req.body.params.sort;
    Brand.findById({'_id':req.body.params.id}).then((data)=>{
        Good.find({'brandName':data.brandName}).sort({'goodPrice':sorts}).then((goods)=>{
            // console.log('获取品牌的商品' + goods);
            res.json({error:0,message:goods});
        }).catch((err)=>{
            return res.json({error:1,message:'系统错误'})
        })
    }).catch((err)=>{
        return res.json({error:1,message:'系统错误'})
    })
})
module.exports = router;
