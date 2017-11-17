<template>
  <div class="footerCart">
    <span class="IconCart {'active' : show === 1 }" ><i class="fa fa-cart-plus cartI"></i></span>
    <span class="shopping" @click="btn()">加入购物车</span>
  </div>
</template>
<script>
export default{
    data(){
        return{
       show:0
        }
    },
  methods:{
        btn(){
         this.show = 1;
        }
  }
}
</script>
<style scoped>
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
  }
</style>
