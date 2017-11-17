<template>
  <div class="collection">
    <header-bar>
      <span class="fonts" slot="fonts">收藏的商品</span>
    </header-bar>

    <div v-if="(goods.length > 0)">
      <div class="goods">
        <ul class="goodUl">
          <li class="goodLi" v-for="(good,index) in goods">
            <a :href="'#/goodDetail/' + good._id">
              <img class="goodImg" :src="'http://localhost:4000' + good.goodImg" alt="">
            </a>
              <p class="topDe">
                &nbsp; ￥{{good.goodPrice}}
                <span class="del"><del>￥{{good.originalPrice}}</del></span>
                <span class="del"> {{good.goodDis}}折</span>
                <i v-if="showH" class="fa fa-heart" style="color: rgba(255,0,100,.7)" @click="noCollection(good._id)"></i>
              </p>
              <p class="downDe">
                &nbsp;{{good.goodName}}{{good.specification}}
              </p>

          </li>
        </ul>
      </div>
    </div>

    <div v-else>
     <p class="none"> 你没有收藏的商品</p>
    </div>

  </div>
</template>
<script>
  import HeaderBar from '../components/HeaderBar2.vue'
  export default{
      data(){
          return{
          goods:[],
            showH:true,
            idG:''
          }
      },
    components:{
      HeaderBar
    },
    mounted(){
    this.$axios.get('/user/findAllCollection').then((result)=>{
        console.log(result);
        if(result.data.error == 0){
            this.goods = result.data.message;
        }
    }).catch((err)=>{
        console.log(err);
    })
    },
    methods:{
      noCollection(idG){
        console.log(idG);
        this.idG = idG;
        if(this.idG){
//        发送取消收藏的请求
          var param = ({
            id:this.idG
          })
          this.$axios.post('/user/noCollectionGood',{
            params:param
          }).then((result)=>{
            if(result.data.error == 0){
              alert(result.data.message);
              location.reload()
            }
          }).catch((err)=>{
            console.log(err);
          })

        }
      },
    }
  }
</script>
<style scoped>
  .collection{
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
  /*收藏的商品*/
  .goodUl{
    overflow: hidden;
  }
  .goodLi{
    width: 38%;
    float: left;
    list-style: none;
    margin-top: 10px;
    background: #ffffff;
    margin-left: 6px;
    height: 280px;
    margin-right: 27px;
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
  .none{
    text-align: center;
    padding-top: 130px;
    padding-bottom: 300px;
  }
</style>
