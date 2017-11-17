
<template>
    <div>
        <div class="top">
            <a href="#/user">  <i class="fa fa-times close"></i></a>
         <h1>唯品会</h1>
            <p class="describe">全 球 精 选 &nbsp; 正 品 特 卖</p>
        </div>
           <p class="input1">
             手机号&#x3000;
             <input class="phone"  type="text" name="phone" v-model="phone" id="phone" placeholder="请输入手机号" required>
           </p>
            <p class="verify">
                验证码&#x3000;
                <input class="verified"  type="password" id="code" name="verify" placeholder="请输入验证码"  v-model="code" required>
                <!--<a class="getVerify" @click="getVerify()" style="color: rgba(0,100,200,.8)">&#x3000;{{verifyCode}}</a>-->
              &#x3000;<button type="button" :disabled="disabled" @click="sendcode" class="btns" id="btn">{{verifyCode}}</button>
            </p>
            <button class="btn" @click="query">手机号登录</button>
        <p class="statement">
            若您输入的手机号未注册，将会进入注册流程。注册即视为同意 <a href="#/">《唯品会服务条款》</a>、
            <a href="#/">《隐私条款》等</a>
        </p>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import axios from 'axios';
//    引入cookie组件
//    import setCookie from '../assets/js/cookie';

    export default{
        data(){
            return{
              disabled:false,
              phone:'',
              code:'',
              formMess:{
                code:this.code,
                phone:this.phone
              },
              codes:[
                '123456',
                'cdesfw',
                '12345m',
                'gdbrfb',
                'wdv123',
                '2dwerg',
                '23erfg',
                '2defge'
              ],
              num:'',


            }
        },
        computed:{
            ...mapState([
                'verifyCode'
            ]),
        },
        components:{
        },
        mounted:function () {

        this.setCookie();
        },
        methods:{
          //验证手机号码部分
          sendcode(){
            var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if(this.phone==''){
              alert("请输入手机号码");
            }else if(!reg.test(this.phone)){
              alert("手机格式不正确");
            }else{
              this.disabled=true;
              if(this.disabled){
                var index = Math.floor((Math.random()*this.codes.length));
                this.num = this.codes[index];
                this.$store.commit({
                  type:'sendCode',
                  value:this.num
                })

              }
            }
          },
          //设置cookie
          setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            console.info(document.cookie);
          },
          query(){
//              验证码验证
            var phoneNum = document.getElementById('phone');
            var codeNum = document.getElementById('code');
            if(this.num != codeNum.value){
                alert('你输入的验证码不正确')
            }
//            console.log('这是验证码' + this.num);
            if(codeNum.value == this.num){
//              console.log(phoneNum.value);
//              console.log(codeNum.value);
              var param = {
                phone:phoneNum.value,
                code:codeNum.value
              }
              this.$axios.get('/user/login',{
                params:param
              }).then( (result) =>{
//                    console.log('点击了');
                console.log(result);
                if(result.data.error == 0){
                  //传入账号名，密码，和保存天数3个参数
//                  console.log(phoneNum.value);
                  this.setCookie(phoneNum.value,codeNum.value,7);
                  location.href = '/login#/user';
                }
                if(result.data.error == 1){
                  alert(result.data.message);
                  location.reload();
                }
              }).catch(function(err){
                console.log(err);
              })

            }
          },

        }
    }
</script>
<style scoped>
.top{
    width: 100%;
    height: 170px;
    background: rgba(100,100,100,.1);
    margin: 0px;
    padding: 0px;
}
.close{
    position: absolute;
    right: 10px;
    top:10px;
    color: rgba(0,0,0,.4);
    font-size: 22px;
}
    h1{
        margin: 0px;
        padding: 0px;
        color:deeppink;
        font-weight: 500;
        font-size: 40px;
        text-align: center;
        padding-top: 40px;
    }
    .describe{
        position: absolute;
        top:93px;
         margin: 0px;
        padding: 0px;
        text-align: center;
        left: 86px;
        color: rgba(0,0,0,.4);
        font-size: 14px;
    }
    .phone{
        width: 70%;
        height: 40px;
        border:none;
        background: #ffffff;
        line-height: 40px;
        font-size: 17px;
        font-size: 14px;
    }
    .input1{
        width: 100%;
        padding-left: 15px;
        background: #ffffff;
        height: 40px;
        border-bottom:solid 1px  rgba(100,100,100,.2);
    }
    .verify{
        width: 100%;
        padding-left: 15px;
        background: #ffffff;
        height: 40px;
        border-bottom: solid 1px rgba(100,100,100,.2);
    }
    .verified{
        width: 35%;
        height: 40px;
        border:none;
        background: #ffffff;
        line-height: 40px;
        font-size: 17px;
        font-size: 14px;
        border-right: solid 1px rgba(100,100,100,.2);
    }
    .btn{
        width: 90%;
        height: 40px;
        margin-left: 15px;
        margin-top: 30px;
        background-color: deeppink;
        color:rgba(255,255,255,.5);
        font-size: 17px;
        border: none;
        border-radius: 8px;
    }
    .statement{
        padding-top: 12px;
        letter-spacing: .02rem;
        font-size: 12px;
        color: #98989f;
        width: 90%;
        margin: 0 auto;
    }
    .statement > a{
        color:rgba(0,100,500,.8)
    }
</style>
