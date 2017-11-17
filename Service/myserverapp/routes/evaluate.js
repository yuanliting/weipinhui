const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
const Evaluate = require('../model/Evaluate');
//评价
var multer = require('multer');

var storage = multer.diskStorage({

    destination:'public/elavluate',
    filename:function (req,file,cb) {
        var times = Date.now();
        cb(null,times + '.jpg');
        req.body.picture = times + '.jpg'

    }
})
var upload = multer({storage:storage});
router.post('/evaluate',upload.array('photo',6),(req,res,next)=>{
    // console.log(req.body);
    var content = req.body.content;
    var evaluateImg;
    if(!req.body.picture){
        evaluateImg = '';
    }else{
        evaluateImg = `/elavluate/${req.body.picture}`;
    }
    var id = req.body.id;
    var name = req.body.name;
    var evaluateClass = req.body.evaluateClass;
   if(req.session.user){
        var ids = req.session.user._id;
           var evaluate = {
               evaluateContent:content,
               evaluateImg:evaluateImg,
               userId:ids,
               goodId:id,
               userName:name,
               evaluateClass:evaluateClass
       }
        // console.log(evaluate);
        //实例化
       var evaluated = new Evaluate(evaluate);
        //   保存
       evaluated.save();
       res.json({error:0,message:'评价成功'});

   }
})
//获取到商品的评价
router.post('/getEvaluate',(req,res,next)=>{
    console.log(req.body.params.id)
    //商品的id
    var id = req.body.params.id;
    Evaluate.getAllEvaluate(id,(err,evaluates)=>{
        if(err){
            return res.json({error:1,message:'系统错误'})
        }
        console.log(evaluates);
        res.json({error:0,message:evaluates});
    })

})

module.exports = router;