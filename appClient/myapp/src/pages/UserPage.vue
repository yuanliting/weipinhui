<script src="../assets/js/cookie.js"></script>
<template>
    <div class="peopleSelf">
       <div class="top">
           <a href="#/">  <i class="fa fa-angle-left back"></i></a>
           <a href="#/">  <i class="fa fa-home home"></i></a>
           <div class="user-non-login-info J-user-non-login-info" v-if="name">
           <div class="imgWrap">
             <img class="userPhoto" :src="'http://localhost:4000' + user.userImg" alt="">
           </div>
             <p class="member" style="font-size: 14px;">银牌会员</p>
               <p class="hide" style="font-size: 12px;">{{name}}</p>
           </div>
         <div class="user-non-login-info J-user-non-login-info" v-else>
           <a href="#/register">注册&#x3000; | &#x3000; </a>
           <a href="#/login">登录</a>
         </div>

       </div>
        <div class="money">
            <grid>
                <grid-item  :label="$t()">
                  <a class="icon" @click="btn2()"> <img class="img" slot="icon" src="../assets/money.jpg"></a>
                    <span  class="Describe" slot="label">{{ $t() }}</span>
                  <badge class=" infor " v-if="show1" :text="num1" ></badge>
                </grid-item>
                <grid-item  :label="$e()">
                  <a  class="icon" @click="btn3()"> <img class="img" slot="icon" src="../assets/money.jpg"></a>
                    <span class="Describe" slot="label">{{ $e() }}</span>
                  <badge class=" infor " v-if="show2" :text="num2" ></badge>
                </grid-item>
                <grid-item  @on-item-click="onItemClick">
                  <a class="icon"  @click="btn4()"><img class="img" slot="icon" src="../assets/money.jpg"></a>
                    <span class="Describe" slot="label">{{ $f() }}</span>
                  <badge class=" infor " v-if="show3" :text="num3" ></badge>
                </grid-item>
            </grid>
        </div>
<div class="user-menu" >
   <ul class="menuUl">
     <li class="menuLi">
       <a  @click="btn1()">收货地址 <i class="fa fa-angle-right right"></i></a>
     </li>
     <li  class="menuLi">
       <a @click="btn5()">修改信息 <i class="fa fa-angle-right right"></i></a>
     </li>
     <li  class="menuLi">
       <a @click="btn6()">我的收藏 <i class="fa fa-angle-right right"></i></a>
     </li>
   </ul>
</div>
      <a href="#/user" class="logout" v-if="name" @click="logout()">退出登录</a>
    </div>
</template>
<script>
    import { Grid, GridItem, GroupTitle, CellBox, CellFormPreview, Badge } from 'vux'
    export default{
        data(){
            return{
          name:'',
              id:'',
              show1:false,
              show2:false,
              num1:0,
              show3:false,
              num2:0,
              num3:0,
              user:{}
            }
        },
        components: {
            Grid,
            GridItem,
            GroupTitle,
            CellFormPreview,
            CellBox,
            Badge
        },
      mounted(){

      this.$axios.get('/user/checkUser').then((result)=>{
          if(result.data.error === 0){
              this.name = result.data.message.userPhone;
              this.id = result.data.message._id;
              this.user = result.data.message;
              if(result.data.message.ordering.length > 0){
                  this.show1 = true;
                  this.num1 = 1;
              }
              if(result.data.message.orderReceving.length > 0){
                this.show2 = true;
                this.num2 = result.data.message.orderReceving.length;
              }
            if(result.data.message.orderList.length > 0){
              this.show3 = true;
              this.num3 = result.data.message.orderList.length;
            }
          }
      }).catch((err)=>{
          console.log(err);
      })
      },
        methods: {
          //获取cookie
          getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') c = c.substring(1);
              if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
          },
            onItemClick () {
                console.log('on item click')
            },
            $t(){
              return '待付款';
            },
         $e(){
              return '待收货';
          },
            $f(){
             return '全部订单';
            },
            $collect(){
                return '我的收藏';
            },
            $history(){
                return '购物车历史';
            },
            $browse(){
                return '浏览历史';
            },
            $money(){
                return '零钱';
            },
          $address(){
                return '收货地址'
          },
            moneys(){
                console.log('点击了');
            },
          logout(){
                this.$axios.get('/user/logout').then((result)=>{
                  console.log(result);
                  location.reload();
                }).catch((err)=>{
                    console.log(err);
                })
          },
          btn1(){
            var _this = this;
              if(this.name == ''){
                setTimeout(function () {
                  _this.$router.push({path:'/login'})
                },1000)
              }else{
                setTimeout(function () {
                  _this.$router.push({path:'/addaddress/' + _this.id})
                },1000)
              }
          },
          btn2(){
            if(this.name == ''){
              this.$router.push({path:'/login'})
            }else{
              this.$router.push({path:'/waitPay/' + this.id});
            }
          },
          btn3(){
            var _this = this;
            if(this.name == ''){
              setTimeout(function () {
                _this.$router.push({path:'/login'})
              },1000)
            }else{
              setTimeout(function () {
                _this.$router.push({path:'/waitReceving/' + _this.id})
              },1000)
            }
          },
          btn4(){
            var _this = this;
            if(this.name == ''){
              setTimeout(function () {
                _this.$router.push({path:'/login'})
              },1000)
            }else{
              setTimeout(function () {
                _this.$router.push({path:'/ordered/' + _this.id})
              },1000)
            }
          },
          btn5(){
            var _this = this;
            if(this.name == ''){
              setTimeout(function () {
                _this.$router.push({path:'/login'})
              },1000)
            }else{
              setTimeout(function () {
                _this.$router.push({path:'/userInfo' })
              },1000)
            }
          },
          btn6(){
            var _this = this;
            if(this.name == ''){
              setTimeout(function () {
                _this.$router.push({path:'/login'})
              },1000)
            }else{
              setTimeout(function () {
                _this.$router.push({path:'/collection' })
              },1000)
            }
          }

        },
      path5(){
          var _this = this;
          setTimeout(function () {
            _this.$router.push({path:'/addaddress'})
          },2000)
      }
    }
</script>
<style scoped>
    .peopleSelf{
        background-color:#ffffff;
    }
.back{
    font-size: 35px;
    color:rgba(0,0,0,.6);
    margin-left: 5px;
    margin-top: 8px;
}
.top{
    overflow: hidden;
    background:url('http://ms2-m.vipstatic.com/static/base/img/18435154.user-non-login-bg.png')0 0 no-repeat ;
   background-size: 100%;
    height: 175.234px;
    width: 100%;
}
    .home{
        float: right;
        margin-right: 5px;
        margin-top: 8px;
        font-size: 30px;
        color:rgba(0,0,0,.6);
    }
 .user-non-login-info {
    position: absolute;
    top: 18%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: .37333rem;
    color: #222;
}
 .imgWrap{
   width: 80px;
   height: 80px;
   margin-left: 5px;
   border-radius: 50%;
   border:goldenrod 3px solid;

 }
    .imgWrap img{
      width: 80px;
      height: 80px;
    }
    .member{
      color: #999999;
      margin-top: 2px;
    }
.user-non-login-info  a{
    font-size: 15px;
    color:rgba(0,0,0,.6);
}
/*付款*/
.money{
}
.grid-center {
    display: block;
    text-align: center;
    color: #666;

}
.img{
    width: 20px;
    height: 20px;
}
.grid{
    border:none;

}
.weui-grid{
    padding: 10px;
    height: 65px;
}
    .weui-grid__label > span{
        font-size: 12px;
        color:rgba(0,0,0,.6);
    }
    .user-menu{
      border-top:solid 1px rgba(100,100,100,.5);
      margin-top: 20px;
      padding: 0px;
    }
    .menuUl{
      margin-top: 20px;
      padding: 0px;
      margin: 0px;
      padding: 2px 15px;
    }
    .menuLi{
      width: 100%;
      height: 35px;
      line-height: 35px;
      list-style: none;
      font-size: 14px;
      border-bottom: solid 1px rgba(0,0,0,.1);
      position: relative;
    }
    .menuLi a{
      color: rgba(0,0,0,.6);
    }
    .right{
     position: absolute;
      right: 10px;
      top:10px;
      font-size: 18px;
    }
  /*退出登录*/
  .logout{
    text-align: center;
    color:rgba(0,0,0,.6);
    font-size: 17px;
    display:block ;
    cursor: pointer;
  }
  /*代付款的小图标*/
.icon{
  position: absolute;
  top:10px;
  left: 40px;
}
/*待付款图标下的字*/
  .Describe{
    position: absolute;
    top:47px;
    left: 30px;

  }
.infor{
  position: absolute;
  top:4px;
  z-index: 10;
  left:50px;
}
  .userPhoto{
    border-radius: 50%;
  }
</style>
