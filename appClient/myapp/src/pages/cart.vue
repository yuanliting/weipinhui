

<template>
  <div class="waitReceving">
    <header>
      <a href="#/user">  <i class="fa fa-angle-left back"></i></a>
      <span> 确认订单 </span>
      <a href="#/">  <i class="fa fa-home home"></i></a>
    </header>

    <div class="details" v-if="user">
    <p class="PutHeart">&#x3000; 你正在安全购物环境中，请放心购买</p>
      <p class="changeAdd"><i class="fa fa-angle-right chan" @click="show()" v-model="show9"></i></p>
      <div v-transfer-dom>
        <popup v-model="show9" position="right">
          <div class="hide">
            <ul>
              <p class="title">选择收货地址 <i class="fa fa-remove" @click="close()"></i></p>
              <p class="line"></p>
              <li v-for="(item,index) in user.addressList">
                <input type="radio" @click="btn1(index)" class="check">
                <p class="One">{{item.name}} &#x3000; {{item.tel}}</p>
                <p class="Two">{{item.choose[0]}} {{item.choose[1]}} {{item.choose[2]}} {{item.detailAddress}}</p>
                <p class="Three">{{item.goToTime}}</p>
              </li>
            </ul>
          </div>
        </popup>
      </div>
      <div v-if="address">
        <div class="showAddress"  @click="show()">
          <p class="One oneN">{{address.name}} &#x3000; {{address.tel}}</p>
          <p class="Two">{{address.choose[0]}} {{address.choose[1]}} {{address.choose[2]}} {{address.detailAddress}}</p>
          <p class="Three second">{{address.goToTime}}</p>
        </div>
      <!--要修改的部分-->

       <div v-if="showL">
         <div v-transfer-dom>
           <popup v-model="showL" position="down" style="width: 100%;height: 40%;">
             <div class="hide">
               配送详情 <i class="fa fa-remove"  @click="closeN()"></i>
             </div>
           </popup>
         </div>
       </div>


        <p v-else  class="Five" @click="see()">一个包裹，最快可在两天后送达  <i class="fa fa-angle-right look" ></i></p>


      <div class="content"  v-if="showGood">
        <p class="self"> &#x3000; 唯品自营 &#x3000;&#x3000;  全选 <span title="false" class="choose2" @click="choose2($event)"></span>&#x3000; </p>

       <div  class="commodity" >
         <ul class="showGoodUl" v-for="(good,index) in goods">
           <li class="showGoodLi">
             <div class="imgWrap">
               <a :href="'#/goodDetail/' + good._id"><img class="img" :src="'http://localhost:4000' + good.goodImg" alt=""></a>
             </div>
             <div class="right">
            <p class="rightOne">{{good.goodName}} &#x3000; <span class="side">￥{{good.goodPrice}}</span></p>
              <p class="rightTwo"> {{good.specification}}  <del class="side" style="color: rgba(0,0,0,.4);font-size: 13px;">￥125</del></p>
             <p class="rightThree">  {{good.brandName}}专场</p>
               <p class="rightFour">{{good.specification}}</p>
              <p class="rightSix">
                <span class="ku"><i class="fa fa-minus minus" @click="minus(index)"></i>
                <span class="numB">{{good.goodNum}}</span>
                <i class="fa fa-plus add" @click="add(index)"></i></span>
                <i class="fa fa-remove delectNow  side"  @click="remove(index)" style="color: rgba(0,0,0,.4);font-size: 16px;"></i>
              </p>
               <span title="false"  class="choose1" @click="choose(index,good._id,$event)" :key="(index)"></span>
             </div>
           </li>
         </ul>
        <div class="pay">
          <span class="price">￥{{total}}</span>
          <p style="float: left;margin-top: 5px;">&#x3000;&#x3000;免邮费</p>
        </div>
       <div class="payButtom">
         <p  style="overflow: hidden;margin-top: 20px;">
           <span style="float: left">&#x3000;&#x3000;订单金额</span>
           <span style="float: right;margin-right: 10px;">￥{{total}}</span>
         </p>
       </div>

        <div class="lastWrap">
          <p class="lastOne">还需支付: <span style="color: deeppink">￥{{total}}</span></p>
          <p class="lastTwo">金额小于11或大于1500，暂不支持</p>
          <div class="modeled" v-if="show2">
            <span class="first">货到付款</span>
            <span  class="secondN" @click="pay()">在线支付</span>
          </div>
        </div>
       </div>
      </div>

        <div v-else style="margin-left: 10px;margin-top: 10px;padding-bottom: 10px;">
         你还没有购买商品
          <a href="#/">去抢购吧</a>
        </div>

      </div>

      <div v-else>
        <p class="One">请添加你的收货地址</p>
      </div>
    </div>

    <div class="details" v-else>
      <img class="withOut" src="../assets/2.png" alt="">
      <p class="withOutD"> 暂无商品</p>
    </div>



  </div>
</template>
<script>
  import { TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux';
  export default{
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Group,
      Cell,
      XSwitch,
      Toast,
      XAddress,
      XButton
    },
      data(){
          return{
            addressData: ChinaAddressData,
            user:'',
            show9: false,
            address:'',
            n:0,
            showL:false,
            goods:[],
            showGood:false,
            index:0,
            id:'',
            show2:false
          }
      },
    created(){
//          组件创建完成后获取数据
//      此时data已经被observed了
      this.fetchData()
    },
    watch:{
      // 如果路由有变化，会再次执行该方法
      '$route':'fetchData'
    },
    methods:{
      fetchData () {
        var id = this.$route.params.id;
        console.log(id);
        this.$axios.get('/user/checkUser').then((result)=>{
        console.log(result);
         if(result.data.error === 0){
            this.user =  result.data.message;
           this.address = this.user.addressList[0];
          if(this.user.cartListNum != 0){
            this.showGood = true;
            this.goods = this.user.cartList;
          }else{
            this.showGood = false;
           }
         }

        }).catch((err)=>{
          console.log(err);
        })
      },
      close(){
        this.show9 = false;
      },
     btn1(index){
       this.show9 = false;
       console.log(index);
         this.address = this.user.addressList[index];
     },
      show(){
        this.show9 = true;
      },
      see(){
     this.showL = true;
      },
      closeN(){
        this.showL = false;
      },
      remove(index){
//      console.log(id);
//      发送删除的请求
        var param = ({
            index:index
        })
        this.$axios.post('/user/removeGood',{
            params:param
        }).then((result)=>{
            console.log(result);
            if(result.data.error == 0){
                location.reload()
            }
        }).catch((err)=>{
            console.log(err);
        })
      },
      minus(index){
//      console.log(index);
//      发送减少该商品的数量的请求
        var param = ({
          index:index
        })
        this.$axios.post('/user/minusGood',{
            params:param
        }).then((result)=>{
          console.log(result);
          if(result.data.error == 0){
            location.reload()
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      add(index){
        //      发送增加该商品的数量的请求
        var param = ({
          index:index
        })
        this.$axios.post('/user/addGood',{
          params:param
        }).then((result)=>{
          console.log(result);
          if(result.data.error == 0){
            location.reload()
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      choose(index,id,ev){
          this.index = index;
          this.id = id;
        if(ev.target.title == 'true'){
            $(ev.target).attr('title',false);
            $(ev.target).removeClass('active');
          this.show2 = false;
          var param = {
            index:this.index,
            id:this.id
          }
          this.$axios.post('/user/chooseCartList',{
            params:param
          }).then((result)=>{
            console.log(result);
          }).catch((err)=>{
            console.log(err);
          })
        }else{
          $(ev.target).attr('title',true);
          $(ev.target).addClass('active');
          this.show2 = true;
          var param = {
              index:this.index,
            id:this.id
          }
          this.$axios.post('/user/chooseCartList',{
              params:param
          }).then((result)=>{
              console.log(result);
          }).catch((err)=>{
              console.log(err);
          })
        }
      },
      choose2(ev){
        if(ev.target.title == 'true'){
          $(ev.target).attr('title',false);
          $(ev.target).removeClass('active');
          $('.choose1').removeClass('active');
          this.show2 = false;
          this.$axios.get('/user/chooseAllCartList').then((result)=>{
            console.log(result);
          }).catch((err)=>{
            console.log(err);
          })
        }else{
          $(ev.target).attr('title',true);
          $(ev.target).addClass('active');
          $('.choose1').addClass('active');
          this.show2 = true;
        this.$axios.get('/user/chooseAllCartList').then((result)=>{
            console.log(result);
        }).catch((err)=>{
            console.log(err);
        })
        }
      },
      pay(){
        if(this.show2 == true){
          //    发送一下订单信息
          console.log('进去')
          var param = ({
            'address':this.address
          })
          this.$axios.post('/user/ordering',{
            params:param
          }).then((result)=>{
            console.log(result);
          if(result.data.error == 0){
            this.$router.push({path:'/payPage'})
          }
          }).catch((err)=>{
            console.log(err);
          })
        }else{
           alert('请选择你要买的商品')
        }
      },
    },
    computed:{
        total(){
//            计算购物车的商品的总价格
          var price = 0;
          var num = 0;
          var to = 0;
          this.goods.forEach((item,index)=>{
              price = item.goodPrice;
              num = item.goodNum;
              to += price * num;
          })
            return to;
        },
    }
  }
</script>
<style scoped>
  .waitReceving{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .back{
    font-size: 35px;
    color:rgba(0,0,0,.8);
    margin-left: 5px;
    margin-top: 8px;
  }
  .home{
    float: right;
    margin-right: 5px;
    margin-top: 8px;
    font-size: 30px;
    color:rgba(0,0,0,.8);
  }
  header{
    background:rgba(100,100,100,.1);
    height: 50px;
  }
  header span{
   position: absolute;
    top:8px;
   left: 110px;
    font-size: 20px;
    color:rgba(0,0,0,.8);
  }
  /*待收货*/
  .withOut{
    width: 130px;
    height: 130px;
    margin-top: 30px;
    margin-bottom: 10px;
    margin-left: 95px;
  }
  .withOutD{
    margin: 0px;
    font-size: 20px;
    margin-left: 120px;
    color:rgba(0,0,0,.6);
    margin-top: -20px;
   padding-bottom: 300px;
  }
  /*如果购物车里有商品*/
  .PutHeart{
    font-size: 13px;
    background: rgba(10,100,200,.1);
    padding: 4px 0px;
    color: rgba(0,0,0,.8);
  }
  /*隐藏的选地址的*/
  .hide{
    width: 320px;
    overflow: hidden;
    background-color: #fbf9fe;
    height: 100%;
  }
  /*.changeAdd{*/

  /*}*/
  .chan{
    position: absolute;
    right: 20px;
    top:110px;
    font-size: 28px;
    color:rgba(0,0,0,.6) ;
  }
  .title{
    overflow: hidden;
    margin-top: 10px;
    font-size: 18px;
    margin-left: 15px;
    padding-bottom: 10px;
  }
  .title i{
    float: right;
    margin-right: 10px;
    font-size: 26px;
    color: rgba(100,100,100,.8);

  }
  .line{
    border-bottom: solid 1px rgba(100,100,100,.2);
  }
.check{
  position: absolute;
  top:15px;
  left: 10px;
}
li{
  position: relative;
  padding-left: 30px;
}
.One{
  margin-top: 15px;
  color: rgba(0,0,0,.8) ;
  font-size: 15px;
}
  .Two{
    font-size: 15px;
    color: rgba(0,0,0,.9) ;
  }
  .Three{
    color: rgba(0,0,0,.6) ;
    font-size: 14px;
    margin-top: 2px;
  }
  .showAddress{
    background: rgba(100,105,155,.5);
    padding: 2px 10px 0px 15px;
  }
  .second{
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(0,0,0,.2);
  }
  .oneN{
    margin-top: 0px;
  }
  .Five{
    color:rgba(0,0,0,.6);
    font-size: 14px;
    margin-top: 5px;
    background: rgba(100,105,155,.5);
    margin: 0px;
  padding: 5px 0px 10px 15px;
  }
  .look{
    font-size: 30px;
    margin-left: 70px;
  }
  .self{
    line-height: 40px;
    padding-bottom: 2px;
    border-bottom: solid 1px rgba(0,0,0,.2);
    margin-bottom: 10px;
  }
  /*终于开始显示购物车里的商品了*/
  .commodity{
    padding: 0px;
    margin: 0px;
    margin-left: -15px;
  }
  .img{
    padding: 0px;
    margin: 0px;
    width: 75px;
    height:80px;
  }

  .showGoodLi{
    overflow: hidden;
    border-bottom: solid 1px rgba(100,100,100,.3);
    padding-bottom: 10px;
  }
  .imgWrap{
    float: left;
    width: 25%;
    /*border:solid 1px red;*/
    padding: 0px;
    margin: 0px;
  }
  .right{
    float: left;
    width: 70%;
    /*border:solid 1px red;*/
  }
  .rightOne{
    font-size: 15px;
    color: rgba(0,0,0,.9);
    position: relative;
  }
  .side{
   position: absolute;
    right: 0px;
  }
  .rightTwo{
    font-size: 15px;
    color: rgba(0,0,0,.9);
    position: relative;
  }
  .rightThree{
    font-size: 12px;
    color: rgba(0,0,0,.5);
  }
  .rightFour{
    font-size: 12px;
    color: rgba(0,0,0,.5);
  }
  .rightFive{

  }
.rightSix{
  font-size: 15px;
  color: rgba(0,0,0,.9);
  position: relative;
}
.ku{
  border: solid 1px rgba(100,100,100,.5);
  /*height: 20px;*/
  line-height: 22px;
}
  .minus,.add{
    padding: 0px 10px;
    color: rgba(100,100,100,.6);
    line-height: 20px;
  }
  .minus{
    border-right: solid 1px rgba(100,100,100,.5);
  }
  .add{
    border-left: solid 1px rgba(100,100,100,.5);
  }
 .numB{
   color: rgba(0,0,0,.7);
   display: inline-block;
   padding: 0px 10px;
 }
 .pay{
overflow: hidden;

 }
 .payButtom{
   margin-bottom: 200px;
   border-top:solid 1px rgba(100,100,100,.4);
   margin-top: 20px;
 }
  .price{
    display: inline-block;
   float: right;
    margin-right: 10px;
    margin-top: 5px;
  }
  .lastWrap{
    width: 100%;
    padding: 10px 5px 20px 25px;
    position: fixed;
    bottom: 0px;
    background-color: #ffffff;
    border-top:solid 1px rgba(100,100,100,.4);
  }
  .lastOne{
    text-align: center;
  }
  .lastTwo{
    font-size: 14px;
    color: rgba(100,100,100,.6);
    text-align: center;
  }
  .modeled{
    width: 100%;
   overflow: hidden;
  margin-bottom: -30px;
  }
  .modeled span{
   display: inline-block;
    line-height: 45px;
    width: 40%;
    text-align: center;
    margin-right: 0px;
    float: left;
    margin-top: 5px;
    margin-bottom: 20px;
  }
  .first{
    border:solid 1px rgba(100,100,100,.6);
   margin-right: 0px;
  }
  .secondN{
    margin-left: 40px;
    border:solid 1px deeppink;
    background: deeppink;
    color: white;
  }
  .choose1{
    position: absolute;
    border:solid 1px rgba(100,100,100,.3);
    padding: 5px;top:30px;
    border-radius: 50%;left: 15px
  }
  .choose1.active{
    position: absolute;
    border:solid 1px rgba(100,100,100,.3);
    padding: 5px;top:30px;
    border-radius: 50%;left: 15px;
    background: deeppink;
  }
  .choose2{
    border:solid 1px rgba(100,100,100,.5);
    padding: 5px;
    border-radius: 50%;
    line-height: 4px;
    display: inline-block;
  }
  .choose2.active{
    background: deeppink;
  }
</style>
