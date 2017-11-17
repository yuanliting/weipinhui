
<template>
  <div class="goodDetail">

    <!--返回到上一页面-->
    <span class="back" @click="back()"><i class="fa fa-chevron-left Icon"></i></span>
    <!--返回到上一页面-->

    <!--大图片-->
    <img class="imgP" :src="'http://localhost:4000' + good.goodImg" alt="">
    <!--大图片-->

    <!--大图片下的字-->
    <p class="DetailDeTop">
      &nbsp; ￥{{good.goodPrice}}
      <span class="del"><del>￥{{good.originalPrice}}</del></span>
      <span class="del surround">  {{good.goodDis}}折</span>
      <i v-if="showH" class="fa fa-heart" style="color: rgba(255,0,100,.7)" @click="noCollection()"></i>
      <i v-else class="fa fa-heart-o" style="color: rgba(255,0,100,.7)" @click="collection()"></i>

    </p>
    <p class="DetailDeDown">
      &nbsp;{{good.goodName}}{{good.specification}}
    </p>
    <!--大图片下的字-->

    <!--优惠-->
    <div class="discount">
      <span class="surrounds">满减</span>
     <p class="detailDiscount"> 满199减30，上不封顶</p>
      <span class="surrounds">包邮</span>
      <p class="detailDiscount"> 超级VIP尊享无限次免邮</p>
      <span class="surrounds">唯品币</span>
      <p class="detailDiscount"> 购买最多可获得 46 个唯品币</p>
    </div>
    <!--优惠-->

    <!--选择商品的规格-->
    <div class="specification">
      <p class="Speci">规格</p>
      <span class="SpeciCircle">{{good.specification}}</span>
    </div>
    <!--选择商品的规格-->

    <!--选择配送地址-->
    <div class="address">
      <!--选地址的遮罩层未写-->
    <p>配送至</p>
      <p class="detailAddress">北京市北京市东城区东华门街道</p>
      <p class="explain">现在付款，最快明天送达</p>
    </div>
    <!--选择配送地址-->

    <!--配货说明-->
    <div class="Explain">
     <span><i class="fa fa-check-circle-o"></i> 次日达</span>
      <span><i class="fa fa-check-circle-o"></i> 唯品会发货</span>
      <span><i class="fa fa-check-circle-o"></i> 7天包退</span>
      <span><i class="fa fa-check-circle-o"></i> 退货返运费</span>

    </div>
    <!--配货说明-->

    <!--显示评价-->
    <div v-if="show9">
      <div v-transfer-dom>
        <popup v-model="show9" position="down" style="width: 100%;height: 100%;">
          <div class="hide">
          <p style="text-align: center;position: relative;margin-top: 10px;" >  所有评价 </p>
           <i class="fa fa-remove"  @click="closeN()" style="position: absolute;right: 10px;top:14px;"></i>
            <li v-for="(item,index) in evaluate" class="showEL">
              <div class="showEt" style="padding-left: 10px;">
                <div class="Eleft">
                  <p>
                  <p v-if="(item.userId.userName == '')" class="userName">{{item.userId.userPhone}}</p>
                  <p v-else="" class="userName">{{item.userId.userName}}</p>

                  <img class="evaluateImg" :src="'http://localhost:4000' + item.userId.userImg"    alt="">
                  </p>
                </div>
                <div class="Eright">
                  <p class="E1">{{item.evaluateContent}}</p>
                  <span v-if="(item.evaluateClass.length > 0)" class="E2" v-for="(item1,index1) in item.evaluateClass">{{item1}}</span>
                  <img class="E3" :src="'http://localhost:4000' + item.evaluateImg"  alt="">
                </div>
              </div>
            </li>
          </div>
        </popup>
      </div>
    </div>


    <div class="evaluate" v-if="(evaluate.length > 0 )">
      <a  style="float: right;font-size: 14px;" @click="see()">查看更多</a>
      <ul>
        <li v-for="(item,index) in evaluate" class="showEL">
        <div class="showE">
          <div class="Eleft">
            <p>
            <p v-if="(item.userId.userName == '')" class="userName">{{item.userId.userPhone}}</p>
            <p v-else class="userName">{{item.userId.userName}}</p>
            <img class="evaluateImg" :src="'http://localhost:4000' + item.userId.userImg"    alt="">
            </p>
          </div>
          <div class="Eright">
            <p class="E1">{{item.evaluateContent}}</p>
            <span v-if="(item.evaluateClass.length > 0)" class="E2" v-for="(item1,index1) in item.evaluateClass">{{item1}}</span>
            <img class="E3" :src="'http://localhost:4000' + item.evaluateImg"  alt="">
          </div>
        </div>
        </li>

      </ul>
    </div>
    <!--显示评价-->

    <!--承诺的图片-->
    <div class="promiseWrap">
      <img class="promise" src="/static/goods/1.png" alt="">
    </div>
    <!--承诺的图片-->

    <!--商品信息-->
    <div class="gooddetail">
    <p class="bigDetail">商品信息</p>
      <p>{{good.good_describe}}</p>
      <p>品牌名称: <span>{{good.brandName}}</span></p>
      <p>商品名称：<span>{{good.goodName}}</span></p>
      <p>产地: <span>{{good.yieldly}}</span></p>
      <p>商品有效期: <span> {{good.timeLimit}}</span></p>
      <p>规格: {{good.specification}}</p>
      <p>特点描述: <span v-for="(cate,index) in good.categorys">{{cate}}</span></p>
      <p>功效: <span>{{good.goodFunction}}</span></p>
      <p>适用 : <span>{{good.skin}}</span></p>
      <p>类型: <span>{{good.goodType}}</span></p>
    </div>
    <!--商品信息-->

    <!--返回到页面顶部-->
    <a  class="backTop" target="_self" v-if="showIcon1" href="#top"> <i class="fa fa-arrow-up tops"></i></a>
    <!--返回到页面顶部-->

    <!--底部加入购物车-->
    <div class="footerCart">
      <span class="IconCart" @click="cart()">
        <badge class=" infor " v-if="num != 0" :text="num" ></badge>
        <i class="fa fa-cart-plus cartI"></i>
      </span>
      <span class="shopping" @click="addCart(good._id)">
        加入购物车
      </span>
    </div>
    <!--底部加入购物车-->
  </div>
</template>
<script>
  import { Badge,TransferDom, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData } from 'vux'
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
      XButton,
      Badge:Badge,
    },
      data(){
          return{
            good:'',
            showIcon1:false,
            show:0,
            hide:0,
            arr:[],
            num:0,
            id:'',
            ordering:[],
            evaluate:[],
            show1:false,
            idG:'',
            show9: false,
            showH:false

          }
      },
    computed:{
    },
    created(){
//          组件创建完成后获取数据
//      此时data已经被observed了
      this.fetchData();
      this.fetchData1()
    },
    watch:{
      // 如果路由有变化，会再次执行该方法
      '$route':'fetchData',
      '$route':'fetchData1'
    },
    mounted(){
      var that  = this;
        this.$axios.get('/user/checkUser').then((result)=>{
//            console.log(result);
          that.num = result.data.message.cartListNum;
          if(result.data.error === 0) {
            this.id = result.data.message._id;
            this.ordering = result.data.message.ordering
          }
        }).catch((err)=>{
            console.log(err);
        })


//      查找用户是否已收藏了该商品
    this.find();

      window.onscroll = (ev)=> {
        var height = ev.pageY;
        if(height > 759){
          this.showIcon1 = true;
        }else{
          this.showIcon1 = false;
        }
      }
    },
    methods:{
      log (str) {
        console.log(str)
      },
      back(){
        history.go(-1);
      },
      fetchData () {
        var id = this.$route.params.id;
//        console.log(id);
        this.$axios.get('/user/goodDetail/' + id).then((result)=>{
//          console.log(result);
          this.good = result.data.message;
        }).catch((err)=>{
          console.log(err);
        })
      },
      fetchData1 () {
        var id = this.$route.params.id;
        console.log(id);
        this.idG = id;
//        发送获取评价的请求
          var param = ({
              id:this.idG
          })
        this.$axios.post('/user/getEvaluate',{
        params:param
         }).then((result)=>{
          console.log(result);
          if((result.data.error == 0) && (result.data.message instanceof Array)){
            this.evaluate =  result.data.message;

          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      addCart(id){
          console.log(id);
      if(this.ordering.length > 0){
          alert('你还有订单未支付');
          this.$router.push({path:'/waitPay/' + this.id});
      }else{
        //          查询用户，并将商品添加至用户的代付款的数组中
        this.$axios.get('/user/addCart/' + id).then((result)=>{
          console.log(result);
          if(result.data.error === 0){
            alert(result.data.message);
            location.reload();
          }else{
            alert(result.data.message);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
      },
      cart(){
         this.$router.push({path:'/cart/'+ this.id});
      },
      closeN(){
          this.show9 = false;
      },
      see(){
        this.show9 = true;
      },
      collection(){
          if(this.id){
            this.showH = true;
//          发送收藏商品的请求
            console.log('这是商品的id' + this.idG);
            var param = {
              id:this.idG
            }
            this.$axios.post('/user/collectionGood',{
              params:param
            }).then((result)=>{
//              console.log(result)
              if(result.data.error == 0){
                alert(result.data.message);
              }
            }).catch((err)=>{
              console.log(err);
            })
          }

      },
      noCollection(){
       if(this.id){
         this.showH = false;
//        发送取消收藏的请求
         var param = ({
           id:this.idG
         })
         this.$axios.post('/user/noCollectionGood',{
           params:param
         }).then((result)=>{
           if(result.data.error == 0){
               alert(result.data.message);
           }
         }).catch((err)=>{
           console.log(err);
         })

       }
      },
//      这是查找用户是否已收藏了该商品
      find(){
          var param = {
              id:this.idG
          }
          this.$axios.post('/user/findCollection',{
              params:param
          }).then((result)=>{
//              console.log(result)
            if(result.data.message instanceof Object){
              this.showH = true;
            }else{
              this.showH = false;
            }
          }).catch((err)=>{
              console.log(err);
          })
      }
    }
  }
</script>
<style scoped>
  .badge-value {
    display: inline-block!important;
  }

  .backTop{
    position: fixed;
    display: inline-block;
    background: rgba(0,0,0,.9);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 40;
    color: #ffffff;
    cursor: pointer;
  }
  .backTop{
    bottom: 75px;
    right: 20px;
  }
  .tops{
    font-size: 27px;
    line-height: 50px;
    font-style: normal;
    color: #ffffff;
    z-index: 40;
    padding: 0px 12px;
  }
  .goodDetail{
    background: #ffffff;
  }
.imgP{
  width: 100%;
  height: 290px;
}
.del{
  font-size: 16px;
}
.surround{
  padding: 1px 8px;
  color: #ffffff;
  background: rgba(0,0,0,.7);
  border-radius: 5px;
  font-size: 12px;
}
  .DetailDeTop{
    font-size: 28px;
  }
  .DetailDeDown{
    font-size: 14px;
    color:rgba(0,0,0,.8) ;
    padding-left: 10px;
    margin-top: 10px;
  }
  .discount{
    border-top:dashed 1px rgba(0,0,0,.1) ;
    padding: 20px 15px 0px;
  }
  .surrounds{
    border:solid 1px rgba(0,0,100,.6);
    color: rgba(0,0,100,.6);
    border:solid 1px ;
    border-radius: 5px;
    font-size: 12px;
    /*padding: 1px 17px;*/
    display: block;
    width: 23%;
    text-align: center;
  }
  .detailDiscount{
    font-size: 15px;
    color:rgba(0,0,0,.8) ;
  }
  .specification{
    border:solid 1px rgba(0,0,0,.2);
    padding: 10px 10px;
  }
  .Speci{
    font-size: 20px;
    color:rgba(0,0,0,.8) ;
  }
  .SpeciCircle{
    display: block;
    width: 30%;
    border:solid 1px deeppink;
    text-align: center;
    margin-top: 10px;
    color: deeppink;
    border-radius: 6px;
  }
  .address{
    border-bottom:solid 1px rgba(0,0,0,.2);
    padding: 10px 10px;
  }
  .detailAddress{
    font-size: 14px;
    color:rgba(0,0,0,.7);
    margin-top: 10px;
  }
  .explain{
    font-size: 13px;
    color:rgba(0,0,0,.4);
    margin-top: 4px;
  }
  .Explain{
    border-bottom:solid 1px rgba(0,0,0,.2);
    padding: 10px 10px;
  }
  .Explain > span{
    display: inline-block;
    font-size: 14px;
    color:rgba(0,0,0,.5);
    /*border:solid 1px rgba(0,0,0,.9);*/
    padding: 0px 5px;
  }
  .Explain > span i{
    color: deeppink;
    font-size: 15px;
  }
  .promise{
    width: 80%;
    height: 100px;
  }
  .promiseWrap{
    border-bottom:solid 1px rgba(0,0,0,.2);
    padding: 25px 10px;
    text-align: center;
  }
  .gooddetail{
    border-bottom:solid 1px rgba(0,0,0,.2);
    padding: 25px 15px;
    font-size: 15px;
    color:rgba(0,0,0,.6);
    margin-bottom: 73px;
  }
  .gooddetail > p{
    margin-top: 10px;
  }
  .gooddetail > p > span{
    display: inline-block;
    text-align: center;
  }
  .bigDetail{
    font-size: 20px;
    color:rgba(0,0,0,.8);
  }
  /*底部购物车*/
  .footerCart{
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0px;
    border:solid 1px rgba(0,0,0,.1);
    line-height: 70px;
    background: #ffffff;
    padding-bottom: 2px;
    padding-left: 10px ;
  }
  .IconCart{
    display: inline-block;
    text-align: center;
    width: 24%;
    border:solid 1px rgba(0,0,0,.1);
    line-height: 45px;
    border-radius: 5px;
    cursor: pointer;
  }
  .IconCart.active{
    border:solid 1px rgba(255,0,200,.7);
  }
  .cartI{
    font-size: 26px;
    line-height: 40px;
  }
  .shopping{
    display: inline-block;
    width: 67%;
    color:#ffffff;
    background: deeppink;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }
  .infor{
    position: absolute;
    left: 50px;
  }
  /*返回到上一页*/
  .back{
    position: absolute;
    top:20px;
    background: rgba(0,0,0,.6);
    display: inline-block;
    padding: 0px 15px;
    text-align: center;
    border-radius: 50%;
    margin-left: 10px;
    line-height: 40px;
    font-size: 16px;
    color: #ffffff;
  }
  /*.Icon{*/
    /*color: #ffffff;*/
    /*font-size: 16px;*/
    /*margin-right: 2px;*/
    /*display: inline-block;*/
  /*}*/
  .evaluate{
    border-bottom:solid 1px rgba(100,100,100,.3);
    padding: 10px;
    height: 270px;
    overflow: hidden;
  }

  .evaluateImg{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .userName{
    font-size: 12px;
    color:rgba(100,100,100,.9);
  }
  .showEL{
    position: relative;
    list-style: none;
    overflow: hidden;
    border-bottom:solid 1px rgba(100,100,100,.3) ;
    padding-bottom: 20px;
    padding-top: 20px;
    width: 100%;
    /*border:solid 1px red;*/
  }
  .showE{
    overflow: hidden;

  }
  .Eleft{
    float: left;
    width: 30%;
  }
  .Eright{
    float: left;
    width: 70%;

  }
.E1{
  padding-left: 2px;
  margin-top: 0px;
  color:rgba(100,100,100,.9);
  font-size: 12px;
}
  .E2{
    display: inline-block;
    padding: 1px 5px;
    border:solid 1px rgba(100,100,200,.6);
    font-size: 10px;
    text-align: center;
    color: rgba(100,100,200,.9);
    border-radius: 5px;
    margin-top: -5px;
    margin-bottom: 5px;
  }
  .E3{
    display: block;
    width: 40px;
    height: 40px;
  }
</style>
