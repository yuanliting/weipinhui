
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
 moment.locale('zh-cn');
const BrandSchema = new Schema({
    //  品牌名字
    brandName:{
        type:String,
        ref:'Good'
    },
//    品牌图片
    brandImg:{
        type:String,
        default:'/images/user.png'
    },
//  品牌搞活动时间
    time:{
        type:Date,
        default:Date.now
    },
//    品牌的描述
    describe:{
        type:String,
        default:'白鹿语女装专场'
    },
//    品牌折扣
    brandDiscount:{
        type:String,
        default:0
    },
//    该品牌属于什么类型
    brandType:{
       type:String
    },
//    该品牌是什么活动的
    brandAction:{
      type:String
    },
//    被收藏
    collectioned:{
        type:Boolean,
        default:false
    },
//    品牌优惠券
    discount:{
        type:Number
    }
})
// BrandSchema.methods.create_time_before = function () {
//     let time = moment(this.time).fromNow();
//     return time;
// }
BrandSchema.statics = {
    removeBrandById: (id, callback) => {
        Brand.findByIdAndRemove({'_id': id}).then((brand) => {
            callback(null, brand)
        }).catch((err) => {
            callback(err);
        })
    },
    findAllBrands: (callback) => {
        Brand.find().then((brands) => {
            callback(null, brands)
        }).catch((err) => {
            callback(err);
        })
    },
    findBrandById: (id,callback) => {
        Brand.findById({'_id':id}).then((brand) => {
            callback(null, brand)
        }).catch((err) => {
            callback(err);
        })
    },
    findBrandByName:(name,callback)=>{
        Brand.find({brandType:name}).then((brands) => {
            callback(null,brands)
        }).catch((err) => {
            callback(err);
        })
    }
}
var Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;