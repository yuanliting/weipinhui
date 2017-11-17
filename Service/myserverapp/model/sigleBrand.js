
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');
const sigleBrandSchema = new Schema({
    //  单个品牌名字
    sigleBrandName:{
        type:String,
        ref:'Brand'
    },
//    单个品牌的标题
    brandTitle:{
        type:String,
        default:'管理员还没添加该品牌的内容呢'
    },
//    单个品牌图片
    sigleBrandImg:{
        type:String,
        default:'/images/user.png'
    },
//  单个品牌搞活动时间
    time:{
        type:Date,
        default:Date.now
    },
//    单个品牌的描述
    describe:{
        type:String,
        default:'精品卖场'
    },
//    品牌折扣
    brandDiscount:{
        type:Number,
        default:0
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
sigleBrandSchema.methods.create_time_before = function () {
    let time = moment(this.time).fromNow();
    return time;
}
var sigleBrand = mongoose.model('sigleBrand',sigleBrandSchema);
module.exports = sigleBrand;