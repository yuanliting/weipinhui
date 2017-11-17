
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClassifySchema = new Schema({
ClassifyName:{
    type:String
},
    delongTo:{
    type:String
    },
    superLink:{
    type:String
    },
    img:{
    type:String,
        default:'/images/package2.jpg'
    },
    describe:{
    type:String,
    default:'斜挎包'
}
})
const Classify = mongoose.model('Classify',ClassifySchema);
module.exports = Classify;