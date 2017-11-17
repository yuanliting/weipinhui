
<template>
  <div>
      <a class="cartIcon" :href="'#/cart/'+id">
        <i class="fa fa-cart-plus cartIcons"></i>
        <badge class=" infor " v-if="num != 0" :text="num" ></badge>
      </a>
    <a  class="backTop" target="_self" v-if="showIcon1" href="#top"> <i class="fa fa-arrow-up tops"></i></a>
  </div>
</template>
<script>
  import { Badge} from 'vux';
  export default{
      data(){
          return{
            showIcon1:false,
            id:'',
            num:0
          }
      },
    components:{
      Badge:Badge,
    },
    mounted(){
          var that = this;
this.$axios.get('/user/checkUser').then((result)=>{
//    console.log(result);
    that.id = result.data.message._id;
//    console.log(that.id);
  that.num = result.data.message.cartListNum;
//  console.log('这是购物车里的商品的数量' + that.num);
}).catch((err)=>{
    console.log(err);
})
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

    }
  }
</script>
<style scoped>
  .cartIcon,.backTop{
    position: fixed;
    display: inline-block;
    background: rgba(0,0,0,.9);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 40;
    color: #ffffff;
  }
  .cartIcon{
    bottom: 20px;
    left: 20px;
  }
  .backTop{
    bottom: 20px;
    right: 20px;
  }
  .cartIcons,.tops{
    font-size: 27px;
    line-height: 50px;
    font-style: normal;
    color: #ffffff;
    z-index: 40;
    padding: 0px 12px;
  }
  .infor{
    position: absolute;
    left: 25px;
    top: 5px;
  }
</style>
