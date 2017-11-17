
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./Brand');
const User = require('./User');
const SearchSchema = new Schema({
    //用户id
    userId:{
        type:String,
        ref:'User'
    },
    //搜索的内容
    searchContent:{
        type:Array
    },
//    搜索时间
    searchTime:{
        type:Date,
        default:Date.now
    },
})
SearchSchema.statics = {
    getUserAllSearch:(id,callback)=>{
        Search.find({'userId':id}).populate('userId').then((searchs)=>{
            callback(null,searchs);
        }).catch((err)=>{
            callback(err);
        })
    },
    removeUserAllSearch:(id,callback)=>{
        Search.findOneAndRemove({'userId':id}).populate('userId').then((searchs)=>{
            callback(null,searchs);
        }).catch((err)=>{
            callback(err);
        })
    },
}
const Search = mongoose.model('Search',SearchSchema);
module.exports = Search;