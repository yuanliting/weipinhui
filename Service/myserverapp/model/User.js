//这是用户集合
const mongoose = require('mongoose');
const db = require('./db');
const Brand = require('./Brand');
const Good = require('./Good');
const UserSchema = mongoose.Schema({
    //用户手机号
    userPhone:{
        type:Number
    },
    //用户名
    userName:{
        type:String
    } ,
    //用户头像
    userImg:{
      type:String,
        default:'/images/user.png'
    },
    //用户密码
    userPwd:{
        type:Number
    },
    //验证码
    verifyCode:{
        type:Number,
        ref:'Verify'
    },
    //用户身份证
    userCard:{
        type:Number
    },
    //用户信用
    userCredit:{
    userName:String,
        userCard:Number
    },
    //用户生日
    userBirthday:{
      type:String
    },
    //用户优惠券
    userDiscount:{
      type:String,
        ref:'Brand'
    },
    //用户唯品币
    vipCoin:{
      type:Number,
        default:0
    },
    //用户的零钱
    looseChange:{
      type:Number,
        default:0.00
    },
    //用户的唯品花
    VipFlower:{
        type:Number,
        default:0.00
    },
    //我的专属
    likesGood:{
        type:Array,
        ref:'Good'
    },
    //品牌收藏
    brandCollection:{
      type:Array,
        ref:'Brand'
    },
    //我的足迹
    history:{
      type:Array,
        ref:'Good'
    },
    //我的银行卡
    bankCard:{
        cardNum:Number,
        cardName:String
    },
    //商品收藏
    goodCollection:{
       type:Array,
        ref:'Good'
    },
    ///代付款订单
    ordering:{
      type:Array
    },
    //购物订单
    orderList:{
        type:Array
    },
    //待收货
    orderReceving:{
        type:Array
    },
    //购物车
    cartList:{
        type:Array,
        ref:'Good'
    },
    //购买时间
    buyTime:{
        type:Date,
        default:Date.now
    },
    //该用户的购物车的商品的数量
    cartListNum:{
      type:Number,
        default:0
    },
    //收货地址
    addressList:{
        type:Array,
        default:[
            {
                name:'原利婷',
                tel:'18236864545',
                goToTime:'周一至周五收货',
                detailAddress:'河南省焦作市',
                "choose":[
                    "河南省",
                    "郑州市",
                    "管城回族区"
                ]
            }
        ]
    }

})
UserSchema.statics = {
    findUserById:(id,callback)=>{
        User.findById({'_id':id}).then((user)=>{
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    },
    findAllUser:(callback)=>{
        User.find().then((user)=>{
            callback(null, user);
        }).catch((err) => {
            callback(err);
        })
    }
}
var User = mongoose.model('User',UserSchema);
module.exports = User;
