
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');
const sigleBrandSmallSchema = new Schema({
    //  单个品牌名字
    sigleBrandName:{
        type:String,
        ref:'Brand'
    },
//    单个品牌的小图片
    sigleBrandImg:{
        type:String,
        default:'/images/user.png'
    }
})
sigleBrandSmallSchema.methods.create_time_before = function () {
    let time = moment(this.time).fromNow();
    return time;
}
var sigleBrandSmall = mongoose.model('sigleBrandSmall',sigleBrandSmallSchema);
module.exports = sigleBrandSmall;