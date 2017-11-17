
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./Brand');
const CollectionSchema = new Schema({
  //  用户的id
  UserId:{
      type:String,
      ref:'User'
  },
//    商品的id
    GoodId:{
        type:String,
        ref:'Good'
    }

})
CollectionSchema.statics = {

    removeCollectionById:(id,callback)=>{
        Collection.findOneAndRemove({UserId:id}).then((collection)=>{
            callback(null, collection)
        }).catch((err) => {
            callback(err);
        })
    },
    findCollectionById:(id,callback)=>{
        Collection.find({UserId:id}).then((collection)=>{
            callback(null, collection)
        }).catch((err) => {
            callback(err);
        })
    },
//    多条件查找
    findCollection:(idU,idG,callback)=>{
        Collection.findOne({'UserId':idU}).findOne({'GoodId':idG}).then((collection)=>{
            callback(null, collection)
        }).catch((err) => {
            callback(err);
        })
    },
    removeCollection:(idU,idG,callback)=>{
        Collection.findOneAndRemove({'UserId':idU,'GoodId':idG}).then((collection)=>{
            callback(null, collection);
        }).catch((err) => {
            callback(err);
        })
    }

}
const Collection = mongoose.model('Collection',CollectionSchema);
module.exports = Collection;