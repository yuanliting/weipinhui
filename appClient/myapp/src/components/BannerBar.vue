<template>
  <div class="banner">
    <swiper auto>
      <swiper-item :key="index" v-for="(img,index) in images" style="margin-bottom: 0px;">
        <a href="#/"><img class="photo" :src="'../static/banner/' + img " alt=""></a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'vux'
 const images =['b1.jpg','b2.jpg','b3.jpg','b4.jpg','b5.jpg'];
  export default{
      data:function () {
        return{
        images
        }
      },
    components: {
      Swiper,
      SwiperItem,
    },
    methods:{
    }
  }
</script>
<style>
.banner{
  margin-top: -160px;
  width: 100%;
  height: 135px;
}
.photo{
  width: 100%;
}
  .vux-swiper{
    height: 130px;
  }
.vux-slider > .vux-indicator, .vux-slider .vux-indicator-right {
  position: absolute;
  right: 15px;
  top:95px;
}
</style>
