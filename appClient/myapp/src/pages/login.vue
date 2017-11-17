
<template>
 <div>
   <div>
     <p class="fl">
       <input  id="phone" name="phone" type="number" placeholder="手机号" v-model="phone"/>
       <button type="button" :disabled="disabled" @click="sendcode" class="btns" id="btn">{{verifyCode}}</button>
     </p>
     <p class="fl" style="margin-left: 20px;">
       <input type="password" id="code" placeholder="验证码" name="code" v-model="code"/>
     </p>
   </div>
   <input type="button" value="查询"  class="btns search" @click="query"/>
 </div>
</template>
<script>
import {mapState} from 'vuex';
  export default {
      data: function () {
          return {
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
                  '123456',
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
          query(){
//              验证码验证
              var phoneNum = document.getElementById('phone');
              var codeNum = document.getElementById('code');
              console.log('这是验证码' + this.num);
              if(codeNum.value == this.num){
                  console.log(phoneNum.value);
                  console.log(codeNum.value);
                  var param = {
                      phone:phoneNum.value,
                      code:codeNum.value
                  }
                  this.$axios.get('/user/logins',{
                      params:param
                  }).then(function (result) {
//                    console.log('点击了');
                      console.log(result);
                  }).catch(function(err){
                      console.log(err);
                  })

              }
          },

      }
  }
</script>
<style>

</style>