<template>
  <div class="Folw">
    <header-bar>
      <span class="fonts" slot="fonts">物流详情</span>
    </header-bar>
    <div class="empty"></div>
    <div class="details">
      <p>物流公司  &#x3000; 华东江苏品骏</p>
      <p>物流电话  &#x3000;  <span style="color: cornflowerblue;">18236864545</span> </p>
      <p>送到时间  &#x3000;  预计11月17日送达</p>
    </div>
    <div class="action">
      <p>活动期间，部分订单送达时效稍有延长，我们将尽快安排发货和配送，请留意最新的物流信息</p>
    </div>
    <div class="empty"></div>
    <p class="numb">运单编号  &#x3000; 171111101857725</p>
    <div class="Folws">
      <flow orientation="vertical" style="height:250px;margin-bottom: 100px;">
        <flow-state state="1" :title="$a('Paid')" is-done></flow-state>
        <flow-line is-done></flow-line>

        <flow-state state="2" :title="$b('Shipped')" is-done></flow-state>
        <flow-line :tip="$e('In progress')"></flow-line>

        <flow-state state="3" :title="$c('Delivered')"></flow-state>
        <flow-line></flow-line>

        <flow-state state="4" :title="$d('Done')"></flow-state>
      </flow>
      <a  class="sured"  @click="sure()">确认收货</a>
    </div>

  </div>
</template>
<script>
  import { Flow, FlowState, FlowLine } from 'vux'
import HeaderBar from '../components/HeaderBar2.vue'
  export default{
      data(){
          return{
          id:'',
            show:false
          }
      },
    components: {
      Flow,
      FlowState,
      FlowLine,
      HeaderBar
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
//          从路径上获取该商品的id
        var id = this.$route.params.id;
        console.log(id);
        this.id = id;
        this.$axios.get('/user/checkUser').then((result)=>{
          console.log(result);
          if(result.data.error === 0){
            this.id =  result.data.message._id;
//            this.address = this.user.addressList[0];
//            if(this.user.ordering.length != 0){
//              this.showGood = true;
//              this.goods = this.user.ordering;
//            }else{
//              this.showGood = false;
//            }
          }

        }).catch((err)=>{
          console.log(err);
        })
      },
      sure(){

        this.sure = true;
        var id = this.$route.params.id;
        var index = this.$route.params.index1;
        console.log('申请啊我不发' + id)
        console.log('这是索引值' + index)
        this.$axios.get('/user/sureOrdered/' + id + '/' + index).then((result)=>{
            console.log(result);
           if(result.data.error == 0){
               alert(result.data.message);
             this.$router.push({path:'/ordered/' + id})
           }
        }).catch((err)=>{
            console.log(err);
        })
      },
          $a(){
              return '打包'
          },
      $b(){
        return '出仓库'
      },
      $c(){
        return '发货'

      },
      $d(){
          return '到站'
      },
      $e(){
          return '派送中'
      }


  }
  }
</script>
<style scoped>
  .Folw{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;

  }
  /*header{*/
    /*text-align: center;*/
    /*width: 100%;*/
    /*!*border:solid 1px red;*!*/
    /*overflow: hidden;*/
  /*}*/
  /*.back{*/
    /*float: left;*/
    /*font-size: 35px;*/
    /*color:rgba(0,0,0,.8);*/
    /*margin-left: 5px;*/
    /*margin-top: 8px;*/
  /*}*/
  .fonts{
    float: left;
    margin-left: 100px;
   font-size: 18px;
    margin-top: 10px;
  }
  /*.home{*/
    /*float: right;*/
    /*margin-right: 5px;*/
    /*margin-top: 8px;*/
    /*font-size: 30px;*/
    /*color:rgba(0,0,0,.8);*/
  /*}*/
  .details{
    width: 100%;
    padding: 10px;
    font-size: 13px;
    color: rgba(100,100,100,.9);
  }
  .action{
    /*width: 100%;*/
    padding: 0px 10px 0px 10px;
    font-size: 12px;
    color: rgba(100,100,100,.8);
    background-color:rgba(100,100,100,.1) ;
    margin: 0px 10px 5px 10px;
  }
  .empty{
    background-color:rgba(100,100,100,.1) ;
    width: 94%;
    margin: 0 auto;
    height: 10px;
    margin-top: 10px;
  }
  .numb{
    font-size: 12px;
    color: rgba(0,0,0,.7);
   padding-bottom: 10px;
    border-bottom: solid 1px rgba(100,100,100,.2);
    width: 94%;
    margin: 0 auto;
    margin-top: 10px;
  }
  .Folws{
    margin-top: -20px;
  }

  .sured{
    display: inline-block;
    width: 90%;
    border:solid 1px deeppink;
    position: fixed;
    bottom: 30px;
    text-align: center;
    z-index: 10;
    margin-left: 15px;
    line-height: 40px;
    color: #ffffff;
    background: deeppink;
  }
</style>
