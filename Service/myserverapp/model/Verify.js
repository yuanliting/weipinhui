//正式验证码集合
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VerifySchema = new Schema({
    //分类的父级ID
    parentId:{
        type:Number,
        default:0
    },
    //分类名称
    name:Number
})
const Verify = mongoose.model('Verify',VerifySchema);
module.exports = Verify;