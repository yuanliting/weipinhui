<template>
  <div class="waitReceving">
    <header-bar>
      <span class="fonts" slot="fonts">待收货订单</span>
    </header-bar>
    <!--如果有订单-->
    <div v-if="show">
      <div>
         <p v-if="show1" style="font-size: 15px;margin-top: 10px;"> &#x3000; 订单号:171111101857735 &#x3000;<span style="color: darkgoldenrod">待审核订单</span></p>
         <p v-else style="font-size: 15px;margin-top: 10px;"> &#x3000; 订单号:171111101857735 &#x3000;<span style="color: darkgoldenrod">订单已审核</span></p>
        <ul class="showUl" v-for="(orderReceving,index1) in orderRecevings">
          <li class="showLi" v-for="(good,index2) in orderReceving.goods">
            <div class="imgWrap">
              <img :src="'http://localhost:4000' + good.goodImg" alt="">
            </div>
            <div class="left">
              <p>{{good.goodName}} {{good.specification}}￥{{good.goodPrice}}</p>
              <p>{{good.brandName}}专场</p>
              <p>尺码{{good.specification}} <i class="fa fa-remove float" style=" font-size: 12px; color: rgba(100,100,100,.5)"> {{good.goodNum}}</i>   </p>
            </div>
            <a  class="look" :href="'#/flowPage/' + good._id + '/' + index1">物流详情</a>
          </li>
        </ul>

      </div>
    </div>


   <div v-else>
     <div class="details">
       <img class="withOut" src="../assets/2.png" alt="">
       <p class="withOutD"> 暂无待收货订单</p>
     </div>
   </div>
  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar2.vue'
  export default{
    data(){
      return{
         id:'',
        show:false,
        orderRecevings:[],
        show1:true,
      }
    },
    components:{
      HeaderBar
    },
    mounted(){
      this.$axios.get('/user/checkUser').then((result)=>{
//        console.log(result);
        if(result.data.error == 0){
          this.id = result.data.message._id;
          if(result.data.message.orderReceving.length != 0){
            console.log(this.id);
            this.orderRecevings = result.data.message.orderReceving;
            this.show = true;
            setTimeout(function () {
              this.show1 = false;
            },9000)
          }
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    updated(){

    },
    methods:{

    }
  }
</script>
<style scoped>
  .waitReceving{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
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
    margin-left: 90px;
    color:rgba(0,0,0,.6);
    margin-top: -20px;
    padding-bottom: 300px;
  }
  .showUl{
    border-top:solid 1px rgba(100,100,100,.2);
    margin-top: 10px;
    position: relative;
  }
  .showLi{
    overflow: hidden;
    /*border:solid 1px red;*/
    padding-bottom: 10px;
  }
  .imgWrap{
    float: left;
    height: 70px;
    width: 60px;
    /*border: solid 1px red;*/
    margin-left: 20px;
  }
  .imgWrap img{
    height: 70px;
    width: 60px;
  }
  .left{
    float: left;
    padding: 5px;
    font-size: 15px;
    position: relative;
  }
  .float{
    position: absolute;
    top:61px;
    right: 10px;
  }
  .look{
   float: right;
    padding: 4px 8px;
    border: solid 1px rgba(100,100,100,.6);
    margin-right: 10px;
    margin-top: 10px;
    font-size: 14px;
    color:rgba(100,100,100,.9);
  }
</style>
