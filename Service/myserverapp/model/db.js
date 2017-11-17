
const mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/WenPinHui');
 var db = mongoose.connection;
 db.on('error',function () {
     console.log('数据库链接失败了');
 })
db.once('open',function () {
    console.log('数据库链接成功');
})
module.exports = db;
