const express = require('express');
const router = express.Router();
const Brand = require('../model/Brand');
const Good = require('../model/Good');
const User = require('../model/User');
const setting = require('../common/setting');
const bigClassify = require('../model/bigClassify')
/* GET home page. */
router.post('/addAddress',function (req,res,next) {
    console.log(req.body);
    var name = req.body.params.userName;
    var tel = req.body.params.tel;
    var goToTime = req.body.params.goToTime;
    var detailAddress = req.body.params.detailAddress;
    var choose = req.body.params.choose;
    var address = ({
        name:name,
        tel:tel,
        goToTime:goToTime,
        detailAddress:detailAddress,
        choose:choose
    })
if(req.session.user){
    var id = req.session.user._id;
    console.log(id);
    User.findById({'_id':id}).then((user)=>{
        user.addressList.push(address);
        user.save();
        //更新
        req.session.user = user;
        // console.log(user);
        res.json({error:0,message:'地址保存成功'});
    }).catch((err)=>{
        return res.json({error:1,message:'系统错误'});
    })
}else{
    res.json({error:1,message:'请先登录'});
}
})
module.exports = router;
