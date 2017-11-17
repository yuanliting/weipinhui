var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const multer = require('multer');
//单个品牌
const sigleBrand = require('../model/sigleBrand');
//单个品牌的小图片
const sigleBrandSmall = require('../model/sigleBrandSmall')
//渲染单个品牌页面
router.get('/sigleBrand',function (req,res,next) {
    res.render('sigleBrand',{
        title:'这是添加单个品牌的图片的'
    })
})
var storage = multer.diskStorage({
    destination:'public/sigleBrand',
    filename:function(req,res,cb){
        var name = req.body.sigleBrandName;
        cb(null, name + '.jpg');
    }
})
var upload = multer({storage:storage});
router.post('/sigleBrand',upload.single('photo'),function(req,res,next){
    // console.log(req.body);
    req.body.sigleBrandImg = `/sigleBrand/${req.body.sigleBrandName}.jpg`;
    var sigles  = new sigleBrand(req.body);
    sigles.save(function (err,data) {
        if(err){
            return res.json({error:1,message:'系统错误'});
        }
       // console.log(data);
        res.json({error:0,message:'添加成功'});
    })
})
router.get('/sigleBrand/:id',function (req,res,next) {
    // console.log(req.params);
    Brand.findById({'_id':req.params.id}).then((data)=>{
        var name = data.brandName;
        sigleBrand.find({'sigleBrandName':name}).then((sigle)=>{
            // console.log(sigle);
            sigleBrandSmall.find({'sigleBrandName':name}).then((sigles)=>{
                res.json({error:0,message:sigle,small:sigles});
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
    })
    }).catch((err)=>{
        console.log(err);
    })
})
module.exports = router;
