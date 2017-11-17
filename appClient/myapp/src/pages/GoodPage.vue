

<template>
  <div >
<div v-for="sigled in sigle">
  <div class="top" >
    <a href="">  <i class="fa fa-angle-left back"></i></a>
    <span class="TopcCenter">{{sigled.brandTitle}}</span>
    <a href=""> <i class="fa fa-share-square-o share"></i></a>
  </div>
  <div class="bigImgWrap" >
    <img class="bigImg":src="'http://localhost:4000' + sigled.sigleBrandImg" alt="">
    <div class="aboveWrap">
      <span class="surround" v-for="sm in small"><img class="aboveimg" :src="'http://localhost:4000' + sm.sigleBrandImg" alt=""></span>
      <div class="font" style="text-align: center;">
        <p style="text-align: center;margin: 0px;"> <span class="collDe" ><i class="fa fa-heart collection"></i>75.2万收藏</span></p>
        <p class="lightColor" style="text-align: center;margin: 0px;">{{sigled.describe}}</p>
      </div>
    </div>
  </div>
  <div class="select">
    <tab :line-width="1" custom-bar-width="60px" active-color="deeppink">
      <tab-item selected @on-item-click="onItemClick">首页</tab-item>
      <tab-item @on-item-click="onItemClick">全部商品</tab-item>
      <tab-item @on-item-click="onItemClick">限时抢购</tab-item>
    </tab>
    <p class="discounts"> &#x3000; 满199减30，上不封顶</p>
    <div v-if="selectItem === 0">
      <div>
        <ul class="homeUl">
          <li class="homeLi" v-for="(good,index) in arr1">
            <a href="">
              <img class="homeImg" :src="`/static/goods/homeImg/${good}` " alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selectItem === 1">
      <div class="allGoodsW">
        <tab :line-width="0" custom-bar-width="60px" active-color="deeppink">
          <tab-item selected @on-item-click="onItemClicks">
            价格
            <i title="true" class="fa fa-angle-up TopI" @click="selectUpPrice($event)"> </i>
            <!--<i v-if="show1"  class="fa fa-angle-up TopI TopPrice" @click="selectUpPrice(sigled.sigleBrandName)"> </i>-->
            <!--<i v-else  class="fa fa-angle-up TopI" @click="selectUpPrice()"> </i>-->
            <i title="false"  class="fa fa-angle-down  DownI" @click="selectDownPrice($event)"> </i>
            <!--<i v-if="show2"  class="fa fa-angle-down  DownI DownPrice" @click="selectDownPrice()"> </i>-->
            <!--<i v-else class="fa fa-angle-down DownI"></i>-->
          </tab-item>
          <tab-item @on-item-click="onItemClicks">
            折扣
            <i class="fa fa-angle-up TopI"></i>
            <i class="fa fa-angle-down DownI"></i>
          </tab-item>
          <tab-item @on-item-click="onItemClicks">
            筛选
            <i class="fa fa-hourglass-o"></i>
          </tab-item>
        </tab>
        <div v-if="selectItems === 0">
          <div class="goods">
            <ul class="goodUl">
              <li class="goodLi" v-for="(good,index) in goods">
                <a :href="'#/goodDetail/' + good._id">
                  <img class="goodImg" :src="'http://localhost:4000' + good.goodImg" alt="">
                  <p class="topDe">
                    &nbsp; ￥{{good.goodPrice}}
                    <span class="del"><del>￥138</del></span>
                    <span class="del"> 5.7折</span>
                  </p>
                  <p class="downDe">
                    &nbsp;{{good.goodName}}{{good.specification}}
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="selectItems === 1">
          <discount-good></discount-good>
        </div>
        <div v-if="selectItems === 2">
          <select-bar></select-bar>
        </div>
      </div>
    </div>
    <div v-show="selectItem === 2">
      <h1>这是限时抢购</h1>
    </div>
  </div>
  <icon-bar></icon-bar>
</div>
  </div>
</template>
<script>
//  import PriceGood from '../components/PriceGood.vue';
  import DiscountGood from '../components/DisountGood.vue';
  import SelectBar from '../components/SelectBar.vue'
  import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux';
  const arr1 = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg',
    '6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg',
    '12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg',
  '18.jpg','19.jpg','20.jpg'];
  import IconBar from '../components/IconBar.vue'
  import {mapState} from 'vuex';
  export default{
    components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Swiper,
      SwiperItem,
      IconBar:IconBar,
//      PriceGood:PriceGood,
      DiscountGood:DiscountGood,
      SelectBar:SelectBar
    },
      data(){
          return{
          selectItem:0,
            arr1,
            selectItems:0,
//            show1:false,
//            该品牌顶部图片及标题
            sigle:[],
            small:[],
//            show2:true,
            num11:1,
            goods:[],
            name:'',
            brandName:'',
            num:0,
            id:''
          }
      },
    computed:{
      ...mapState([
        'num1'
      ]),
    },
    created(){
//          组件创建完成后获取数据
//      此时data已经被observed了
      this.fetchData();
      this.fetchData1();
    },
    watch:{
      // 如果路由有变化，会再次执行该方法
      '$route':'fetchData',
      '$route':'fetchData1',
//      '$route':'get',
    },
    mounted(){

    },
    updated(){
//      this.get();
    },
    methods:{
      fetchData () {
        var id = this.$route.params.id;
        this.id = id;
        console.log(id);
//        获取到该品牌的顶部图片及标题
        this.$axios.get('/user/sigleBrand/' + id).then((result)=>{
      console.log(result)
          this.sigle = result.data.message;
      this.small = result.data.small;
        }).catch((err)=>{
          console.log(err);
        })
      },
      fetchData1 () {
        var id = this.$route.params.id;
        console.log(id);
//        获取到该品牌的名字
        this.$axios.get('/user/brand/' + id).then((result)=>{
          if(result.data.error === 0){
            this.goods = result.data.message;
//            this.goods.forEach((item,index)=>{
//              this.brandName = item.brandName;
//            })
          }
        }).catch((err)=>{
          console.log(err);
        })

      },
      get(){
        this.num = this.$store.state.num1
        var param  = ({
          num:this.num,
          brandName:this.brandName
        })
        console.log(param)
        this.$axios.post('/user/upPrice',{
          params:param
        }).then((result)=>{
          console.log(result);
        }).catch((err)=>{
          console.log(err);
        })
      },
      onItemClick (index) {
        console.log('on item click:', index)
        if(index === 1){
          this.selectItem = 1;
        }else if(index === 2){
          this.selectItem = 2;
        }else{
          this.selectItem = 0;
        }
      },
      onItemClicks (index) {
        console.log('on item clicks:', index)
        if(index === 1){
          this.selectItems = 1;
        }else if(index === 2){
          this.selectItems = 2;
        }else{
          this.selectItems = 0;
        }
      },
      selectUpPrice(ev){
          console.log(ev);
          ev.preventDefault();

//        this.$store.commit({
//          type:'getBrandName',
//          value:this.num11
//        })
        if(ev.target.title == 'true'){
          $(ev.target).attr('title',false);
          $(ev.target).removeClass('TopPrice');
        this.fetchData1();
        }else{
          $(ev.target).addClass('TopPrice');
          $(ev.target).attr('title',true);
          console.log('1234567');
          var param = ({
              sort:1,
            id:this.id
          })
          this.$axios.post('/user/sortZ',{
              params:param
          }).then((result)=>{
              console.log(result);
            if(result.data.error === 0){
              this.goods = result.data.message;
            }
          }).catch((err)=>{
              console.log(err);
          })

        }
      },
      selectDownPrice(ev){
//        console.log('你点击了价格')
        if(ev.target.title == 'true'){
          $(ev.target).attr('title',false);
          $(ev.target).addClass('DownIPrice');
          var param = ({
            sort:-1,
            id:this.id
          })
          this.$axios.post('/user/sortZ',{
            params:param
          }).then((result)=>{
            console.log(result);
            if(result.data.error === 0){
              this.goods = result.data.message;
            }
          }).catch((err)=>{
            console.log(err);
          })
        }else{
          $(ev.target).attr('title',true);
          $(ev.target).removeClass('DownIPrice');
          this.fetchData1();
        }
      }
    }
  }
</script>
<style scoped>
  /*<!--顶部-->*/
  .top{
    overflow: hidden;
  }
  .back{
    float: left;
    display: inline-block;
    font-size: 35px;
    color:rgba(0,0,0,.6);
    margin-top: 8px;
    width: 8%;
    text-align: center;
    line-height: 35px;
  }
  .share{
    float: left;
    display: inline-block;
    font-size: 28px;
    color:rgba(0,0,0,.6);
    width: 8%;
    margin-top: 8px;
    text-align: center;
    line-height: 35px;
  }
  .TopcCenter{
    float: left;
    display: inline-block;
    font-size: 18px;
    width: 82%;
    text-align: center;
    margin-top: 8px;
    line-height: 35px;
  }
  /*大图片*/
.bigImgWrap{
  margin: 0px;
  padding: 0px;
  position: relative;
}
  .bigImg{
    width: 100%;
    height: 150px;
    margin: 0px;
    padding: 0px;
  }
  .aboveWrap{
    /*position: absolute;*/
    width: 100%;
    background: rgba(200,200,200,.1);
    height: 135px;
    margin-top: -50px;
    z-index: 20;
  }
  .surround{
    display: block;
    width: 70px;
    height: 70px;
    border-radius:50% ;
    background: #FEFFFF;
    line-height: 70px;
    text-align: center;
    margin: 0px;
    padding: 0px;
    margin-left: 120px;
    position: absolute;
  }
  .aboveimg{
    width: 50px;
    height: 50px;
    border-radius:50% ;
    padding-top: 15px;
  }
  p{
    text-align: center;
    margin-top: 5px;
  }
  .font{
   position: absolute;
    top:178px;
    left: 110px;
  }
  .collDe{
    font-size: 12px;
    border:solid 1px rgba(200,200,200,.7);
    padding: 2px 8px;
    border-radius: 20px;
  }
  .collection{
    color: deeppink;
  }
  .lightColor{
    color: rgba(100,100,100,.5);
    font-size: 12px;
  }
  /*选择*/
  .discounts{
    font-size: 11px;
    color: rgba(100,100,100,.9);
    text-align: left;
    background: rgba(0,200,300,.1);
    margin: 0px;
    padding: 0px;
    line-height: 30px;
  }
  .homeUl > li:first-child{
    height: 160px;
  }
  .homeUl > li:nth-child(4),.homeUl > li:nth-child(7),
  .homeUl > li:nth-child(8) ,.homeUl > li:nth-child(10),
  .homeUl > li:nth-child(11), .homeUl > li:nth-child(15),
  .homeUl > li:nth-child(14) {
    height: 104px;
  }
  .homeLi{
    height: 100px;
  }
  .homeImg{
    display:block ;
    width: 100%;
    margin: 0px;
    padding: 0px;
  }
  /*筛选商品*/
  .allGoodsW{
    background: #eeeeee;
  }
  .TopI{
    font-size: 18px;
    position: absolute;
    top:8px;
    color: rgba(0,0,0,.6);
    cursor: pointer;
  }
  .TopPrice{
    font-size: 18px;
    position: absolute;
    top:8px;
    color: deeppink;
    cursor: pointer;
  }
  .DownI{
    position: absolute;
    top:16px;
    font-size: 18px;
    color: rgba(0,0,0,.6);
    cursor: pointer;
  }
  .DownIPrice{
    position: absolute;
    top:16px;
    font-size: 18px;
    color: deeppink;
    cursor: pointer;
  }
/*价格商品*/
  .goodUl{
    overflow: hidden;
  }
  .goodLi{
    width: 45%;
    float: left;
    list-style: none;
    margin-top: 10px;
    background: #ffffff;
    margin-left: 10px;
    height: 280px;
  }
  .goodImg{
    width: 140px;
    height: 170px;

  }
  .topDe{
    color: rgba(0,0,0,.8);
  }
  .del{
    font-size: 12px;
    color: #999999;
  }
  .downDe{
    font-size: 12px;
    color: rgba(0,0,0,.6);
    padding-left: 5px;
  }
</style>
