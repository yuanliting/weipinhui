const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify');
//收藏集合
const Collection = require('../model/Collection');
//收藏商品
router.post('/collectionGood',(req,res,next)=>{
    console.log( req.body);
    var idG = req.body.params.id;
    console.log(idG);
    if(req.session.user){
        var idU = req.session.user._id;
        console.log('这是用户的id ' + idU)

        Collection.findCollection(idU,idG,(err,collection)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            // console.log(collection);
            if(!collection){
                var collection = ({
                            UserId:idU,
                            GoodId:idG
                        })
                        var colections = new Collection(collection);
                        colections.save();
                        res.json({error:0,message:'收藏商品成功'})
            }else{
                res.json({error:0,message:'该商品已收藏'})
            }
        })
    }
})
//取消收藏
router.post('/noCollectionGood',(req,res,next)=>{
    // console.log('这是取消的'+req.body);
    var idG = req.body.params.id;
    if(req.session.user){
        var idU = req.session.user._id;
        //    采用多条件查找，然后找到删除
        Collection.removeCollection(idU,idG,(err,collection)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            res.json({error:0,message:'商品取消收藏成功'})
        })


    }
})
//在商品查找用户收藏的商品
router.post('/findCollection',(req,res,next)=>{
    console.log(req.body.params)
    var idG = req.body.params.id;
    if(req.session.user){
        var idU = req.session.user._id;
        // console.log('这是用户的id ' + idU)
        Collection.findCollection(idU,idG,(err,collection)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            // console.log(collection);
            res.json({error:0,message:collection});
        })
    }
})
//在收藏商品的页面，查找用户所有的收藏的商品
router.get('/findAllCollection',(req,res,next)=>{
    if(req.session.user){
        var id = req.session.user._id;
        Collection.findCollectionById(id,(err,collection)=>{
            if(err){
                return res.json({error:1,message:'系统错误'});
            }
            var ids = [];
            collection.forEach((item,index)=>{
                ids.push(item.GoodId)
            })
        //    多条件查找多个商品
            Good.findGoods(ids,(err,Goods)=>{
                if(err){
                    return res.json({error:1,message:'系统错误'});
                }
              res.json({error:0,message:Goods});
            })

        })
    }
})
module.exports = router;