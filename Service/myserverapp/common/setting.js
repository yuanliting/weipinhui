

// 描述用户相关信息及其权限
const User = require('../model/User');
const setting = {
    // 封装生成cookie的代码
    create_cookie:function(user,res){
        // 设置cookie信息  --- 对cookie进行再次加密
        let auth_token = `${user._id}$$$$`;
        // console.log(auth_token);
        res.cookie("yuan", auth_token,{
            signed:true, maxAge:1000 * 60 * 60 * 24 * 30, path:'/'
        }  )

    },
    // 封装生成session的代码
    // 通过浏览器端返回的cookie信息生成session
    // req.signedCookies 获取被签名的cookie
    // create_session:function(req, res, next){
    //     console.log('--------------');
    //     // console.log(req.signedCookies );
    //     if(req.session.user){
    //         console.log('user已设置');
    //         next();
    //     }else{
    //         console.log('user未设置');
    //         let auth_token = req.signedCookies["yuan"];
    //         // console.log('这是验证Session的');
    //         // console.log(auth_token);
    //         if(!auth_token){
    //             return next();
    //         }
    //         //split()将字符串分割成数组
    //         let auth = auth_token.split('$$$$');
    //         // console.log('这是分割后的cookie');
    //         // console.log(auth);
    //         let user_id = auth[0];
    //         User.findById({'_id':user_id}).exec((err,user)=>{
    //             if(err){
    //                 return res.end(err);
    //             }
    //             if(!user){
    //                 return res.end(err);
    //             }
    //             // console.log(' 这是session中' + user);
    //             req.session.user = user;
    //             next();
    //         })
    //     }


    // }
}
module.exports = setting;
