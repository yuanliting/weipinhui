
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./Brand');
const GoodSchema = new Schema({
  //  商品的品牌
  brandName:{
      type:String,
      ref:'Brand'
  },
    //商品名字
    goodName:{
      type:String
    },
//    商品原价
    originalPrice:{
        type:Number
    },
//    商品价格
    goodPrice:{
      type:Number
    },
//    折扣
    goodDis:{
        type:String
    },
//    商品图片
    goodImg:{
      type:String,
        default:'/images/user.png'
    },
//  商品搞活动时间
    start_time:{
        type:Date,
        default:Date.now
    },
//    商品的描述
    good_describe:{
      type:String,
        default:'经典时尚，女士圆领运动套头卫衣,休闲系列'
    },
//    商品属于什么系列的
    categorys:{
      type:Array
    },
//    被收藏
    collectioned:{
      type:Boolean,
        default:false
    },
//    被转发、分享
    share:{
      type:Boolean,
        default:false
    },
//    该商品的评价
    eavluate:{
      type:Array
    },
//    商品优惠券
    discount:{
      type:Number
    },
//   商品尺码
    size:{
      type:String
    },
//商品产地
    yieldly:{
      type:String
    },
//    商品材质
    texture:{
      type:String
    },
//    流行元素
    fashion_element:{
      type:String
    },
//    衣长
    clothes_length:{
      type:String
    },
    //风格
    style:{
      type:String
    },
//版型
good_model:{
      type:String
},
//薄厚
thickness:{
      type:String
},
//适合季节
Season:{
      type:String
},
//领型
collar_type:{
      type:String
},
//袖长
outside_sleeve:{
      type:String
},
//适合人群
Crowd:{
      type:String
},
//功能
functioned:{
    type:String
},
//款式
design:{
      type:String
},
//适合项目
project:{
    type:String
},
//商品功能
    goodFunction:{
      type:String
    },
//    适合皮肤
    skin:{
        type:String
    },
    //商品类型
    goodType:{
        type:String
    },
//    商品的有效期
   timeLimit:{
       type:String
    },
//    商品规格
    specification:{
        type:String
    },
//    该商品的详细页面
    detail:{
        type:String
    },
//    商品的数量
    goodNum:{
      type:Number,
        default:1
    },
//    是否被选择
    choose:{
      type:Boolean,
        default:false
    }
})
GoodSchema.statics = {
    findGoodByName:(name,callback)=>{
        Good.find({brandName:name}).then((goods)=>{
            callback(null, goods)
        }).catch((err) => {
            callback(err);
        })
    },
    removeGoodById:(id,callback)=>{
        Good.findByIdAndRemove({'_id':id}).then((good)=>{
            callback(null, good)
        }).catch((err) => {
            callback(err);
        })
    },
    findGoodById:(id,callback)=>{
        Good.findById({'_id':id}).then((good)=>{
            callback(null, good)
        }).catch((err) => {
            callback(err);
        })
    },
//    //    多条件查找多个商品
    findGoods:(ids,callback)=>{
        Good.find({'_id':{$in:ids}}).then((Goods)=>{
            callback(null,Goods);
        }).catch((err) => {
            callback(err);
        })
    }
}
const Good = mongoose.model('Good',GoodSchema);
module.exports = Good;