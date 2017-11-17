var express = require('express');
var router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const multer = require('multer');
//单个品牌
const sigleBrand = require('../model/sigleBrand');
const sigleBrandSmall = require('../model/sigleBrandSmall');
//搜索集合
const Search = require('../model/recentlySearch');
router.post('/searchG',(req,res,next)=>{
    // console.log(req.body.params);
    var goodType = req.body.params.name;
    var find = RegExp(goodType,'i');
    Good.find({'goodType':find}).then((goods)=>{
        // console.log(goods);
        if(req.session.user){
            var id = req.session.user._id;
            Search.findOne({'userId':id}).then((search)=>{
              if(search){
                  search.searchContent.push(goodType);
                  //将数组排重
                      function unique(array){
                          var n = []; //一个新的临时数组
                    //遍历当前数组
                          for(var i = 0; i < array.length; i++){
                    //如果当前数组的第i已经保存进了临时数组，那么跳过，
                    //否则把当前项push到临时数组里面
                              if (n.indexOf(array[i]) == -1){
                                  n.push(array[i])
                              };
                          }
                          return n;
                      }
                  search.searchContent =  unique(search.searchContent);
                  search.save();
            }else{
                  var s = [];
                  s.push(goodType);
                  var b = ({
                      userId:id,
                      searchContent:s
                  })
                  var  searchN = new Search(b);
                  searchN.save();
              }

            }).catch((err)=>{
                console.log(err)
            })
        }
        res.json({error:0,message:goods});
    }).catch((err)=>{
        res.json({error:1,message:'系统错误'});
    })

})
//查找最近搜索的内容
router.get('/searchC',(req,res,next)=>{
    if(req.session.user){
        var id = req.session.user._id;
        Search.getUserAllSearch(id,(err,searchs)=>{
            if(err){
                return res.json({error:0,message:'系统错误'});
            }
            // console.log(searchs);
         res.json({error:0,message:searchs})
        })
    }
})
//删除最近搜索
router.get('/searchRemove',(req,res,next)=>{
    if(req.session.user){
        var id = req.session.user._id;
        Search.removeUserAllSearch(id,(err,searchs)=>{
            if(err){
                return res.json({error:0,message:'系统错误'});
            }
            // console.log(searchs);
            res.json({error:0,message:searchs})
        })
    }
})
module.exports = router;
