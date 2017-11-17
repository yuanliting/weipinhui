
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');
const NavSelectSchema = new Schema({
    //分类名字
    NavName:{
        type:String,
        ref:'Brand'
    },
    //它以下的品牌
    brandNames:{
            type:Array,
        ref:'Brand'
    },
    time:{
        type:Date,
        default:Date.now
    }
})
NavSelectSchema.statics = {
    removeNavBrand:(name,callback)=>{
        NavSelect.findOne({'NavName':name}).then((navName)=>{
            callback(null,navName);
        }).catch((err)=>{
            callback(err);
        })
    },

}
NavSelectSchema.methods.create_time_ago = function () {
    let time = moment(this.time).endOf('hours').fromNow(true);
    return time;
}
var NavSelect = mongoose.model('NavSelect',NavSelectSchema);
module.exports = NavSelect;