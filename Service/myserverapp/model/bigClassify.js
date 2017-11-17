
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bigClassifySchema = new Schema({
    bigClassifyName:{
        type:String
    },
    bigClassifyDescribe:{
        type:String
    },
    smallClassify:{
        type:Array,
        ref:'Classify'
    }

})
bigClassifySchema.statics = {
getAllbigClassify:(bigClassifyName,callback)=>{
    bigClassify.findOne({'bigClassifyName':bigClassifyName}).populate('Classify').then((bigClassifys)=>{
        callback(null,bigClassifys)
    }).catch((err)=>{
        callback(err);
    })
}
}
const bigClassify = mongoose.model('bigClassify',bigClassifySchema);
module.exports = bigClassify;