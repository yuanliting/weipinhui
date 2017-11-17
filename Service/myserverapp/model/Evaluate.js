
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./Brand');
const User = require('./User');
const EvaluateSchema = new Schema({
        //用户id
        userId:{
            type:String,
            ref:'User'
        },
    //用户名
    userName:{
        type:String,
        ref:'User'
    },
    //用户头像
    userPhoto:{
        type:String,
        ref:'User'
    },
    //被评论商品的id
    goodId:{
        type:String,
        ref:'Good'
    },
    //评论的内容
    evaluateContent:{
            type:String
    },
//    评论时间
    evaluateTime:{
        type:Date,
        default:Date.now
    },
//    评论图片
    evaluateImg:{
        type:String
    },
//评价的类型
    evaluateClass:{
            type:Array
    }

})
EvaluateSchema.statics = {
getAllEvaluate:(id,callback)=>{
    Evaluate.find({'goodId':id}).populate('userId goodId').then((evaluates)=>{
        callback(null,evaluates);
    }).catch((err)=>{
        callback(err);
    })
}
}
const Evaluate = mongoose.model('Evaluate',EvaluateSchema);
module.exports = Evaluate;