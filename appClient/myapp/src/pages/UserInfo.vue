<script src="../../../../Service/myserverapp/routes/changeUserInfo.js"></script>
<template>
  <div class="userInfo">
    <header-bar>
      <span class="fonts" slot="fonts">更改用户信息</span>
    </header-bar>
    <ul class="content">
      <li class="contentLi">
        <p class="p1">用户名：{{name}} <i class="fa fa-angle-right one" @click="btn1()"></i></p>
      </li>
      <li class="contentLi">
        <p class="p1">
          更改头像 &#x3000;
          <img class="userPhoto" :src="'http://localhost:4000' + user.userImg" alt="">
          <i class="fa fa-angle-right one" @click="btn3()"></i></p>
      </li>

    </ul>

    <div v-transfer-dom>
      <popup v-model="show1" position="right">
        <div style="width: 320px;">
          <div class="top">
            <p class="title">更改你的用户名</p>
            <i class="fa fa-close closed" @click="close()"></i>
          </div>
          <div>
            <form action="">
              <input class="inp1" type="text" placeholder="用户名" v-model="name">
              <button type="submit" class="sure1" @click="btn2()">确认</button>
            </form>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="show2" position="right">
        <div style="width: 320px;">
          <div class="top">
            <p class="title">更改你的头像</p>
            <i class="fa fa-close closed" @click="close()"></i>
          </div>
          <div>
            <form action="" ref="myform">
              <img v-for="i in files" :src="i" class="images" :key="i" >
              <input id="file" type="file" name="photo" accept="image/*"
                     @change="chooseImage($event)" multiple class="photo" style="margin-left: 30px;">
              <button class="sure1"  type="submit"  @click="give($event)" required>提 交</button>
            </form>
          </div>
        </div>
      </popup>
    </div>


  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar2.vue'
  import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux'
  export default{
    directives: {
      TransferDom
    },
      data(){
          return{
          name:'',
            show1: false,
            user:{},
            show2:false,
            imgs:'',
            files:[],
            productImage:[],
            photo:[]
          }
      },
    components:{
      HeaderBar,
      Popup,
      Group,
      Cell,
      XSwitch,
      Toast,
      XAddress,
      XButton
    },
    mounted(){
      this.$axios.get('/user/checkUser').then((result)=>{
        if(result.data.error == 0){
            if(result.data.message.userName == ''){
              this.name = result.data.message.userPhone;
            }else{
              this.name = result.data.message.userName;
            }
         this.user =  result.data.message;
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
      chooseImage(e){
        for(var i = 0;i< e.target.files.length;i++){
          this.productImage.push(e.target.files[i]);
          var url = URL.createObjectURL(e.target.files[i]);
          this.files.push(url);
        }
        console.log(this.files)
      },
      give(event){
        event.preventDefault();
        let myform = this.$refs.myform;
        let formData = new FormData(myform);
        if(this.photo.length < 0){
          this.photo = []
        }
        let config = {
          headers:{
            "Content-Type": "multipart/form-data"
          }
        };
//        发送更改头像的请求
        this.$axios.post('/user/changeUserP',formData,config).then((resData) =>{
          console.log(resData);
          if(resData.data.error == 0){
            alert(resData.data.message);
            this.show2 = false;
            location.reload();
          }
        })

      },
      btn1(){
      this.show1 = true;
      },
      close(){
        this.show1 = false;
        this.show2 = false;
      },
      btn2(){
//        发送更改用户名的请求
        var param = ({
            name:this.name
        })
        this.$axios.post('/user/changeUserN',{
            params:param
        }).then((resData) =>{
          console.log(resData);
          if(resData.data.error == 0){
            alert(resData.data.message);
            this.show1 = false;
            location.reload();
          }
        })
        this.show1 = false;

      },
      btn3(){
        this.show2 = true;
      }
    }
  }
</script>
<style scoped>
  .userInfo{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  header span{
    position: absolute;
    top:8px;
    left: 100px;
    font-size: 20px;
    color:rgba(0,0,0,.8);
  }
  .content{
    padding: 10px;
  }
  .contentLi{
    list-style: none;
    /*border:solid 1px red;*/
    position: relative;
  }
  .p1{
    overflow: hidden;
    /*border:solid 1px red;*/
    line-height: 40px;
  }
  .one{
    float: right;
    font-size: 22px;
    line-height: 40px;
  }
  .top{
    overflow: hidden;
    /*border:solid 1px red;*/
    line-height: 40px;
  }
  .title{
    float: left;
    width: 94%;
    text-align: center;
  }
    .closed{
      float: right;
      line-height: 40px;
      width: 6%;
  }
    .userPhoto{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top:5px;
    }
  .inp1{
    border: solid 1px rgba(255,0,100,.5);
    line-height: 30px;
    width: 80%;
   margin-left: 25px;
    padding-left: 10px;
    color:rgba(255,0,100,.5);
    margin-top: 20px;
  }
  .sure1{
    border: solid 1px rgba(255,0,100,.5);
    line-height: 30px;
    width: 20%;
    margin-left: 25px;
    text-align: center;
    background-color: #ffffff;
    margin: 0 auto;
    color:rgba(255,0,100,.5);
    border-radius: 20px;
    margin-left: 120px;
    margin-top: 40px;
  }
  .images{
    width: 100px;
    height: 100px;
    margin-left: 100px;
    border-radius: 50%;
  }
</style>
