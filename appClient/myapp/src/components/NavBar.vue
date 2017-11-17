
<template>
  <div class="navTop">
   <nav>
     <ul class="navUl">
       <li id="lis"  :class="{'active' : ins === index }" v-for="(nav,index) in navs" @click="btn(nav.NavName,index)">
         <a class="navA" href="#/">{{nav.NavName}}</a>
         <span class="line"></span>
         <div class="parallelism" :class="{'active' : ins === index }">
           <ul>
             <banner-bar></banner-bar>
             <div class="parLiO" >
               <a href="#/">
                 <img class="smallImg" src="../assets/6.jpg" alt="">
               </a>
             </div>
             <div class="bannerB1">
               <a href="">
                 <img class="bannerb1" src="/static/bannerBottom/bannerB.jpg" alt="">
               </a>
             </div>
             <div class="bannerb2">
              <div class="baL">
                <img class="baL1" src="/static/bannerBottom/1.png" alt="">
              </div>
               <div class="baR" >
                 <ul >
                   <li v-for="(icon1,n) in arr">
                     <a href="">
                       <img :src="'/static/bannerBottom/' + icon1" alt="">
                     </a>
                   </li>
                 </ul>
               </div>
             </div>
             <div class="bannerb3">
              <ul>
                <li v-for="(icon2,m) in arr1">
                  <a href="">
                    <img class="ba3" :src="'/static/bannerBottom/' + icon2" alt="">
                  </a>
                </li>
              </ul>
             </div>
             <div class="bannerb3">

             </div>
             <img class="smallImg" src="/static/bannerBottom/14.jpg" alt="">
             <div v-if="chooseItem" class="BrandWrap">
               <li class="parLi" v-for="(brand,item) in brands">
                 <a class="under" :href="'#/goodpage/' + brand._id">
                   <img class="img" :src="'http://localhost:4000' + brand.brandImg" alt="">
                   <p class="decri"> &#x3000;{{brand.brandAction}}</p>
                   <p class="info">
                     &#x3000;<span>{{brand.brandDiscount}}折起</span>&#x3000;
                     {{brand.describe}} <i class="times" style="color: #999999 ">剩2天</i>
                   </p>
                 </a>
               </li>
             </div>
             <div v-if="(IndexBrand == ins)"  class="BrandWrap">
               <li class="parLi" v-for="(brand,item) in brandss">
                 <a class="under" :href="'#/goodpage/' + brand._id">
                   <img class="img" :src="'http://localhost:4000' + brand.brandImg" alt="">
                   <p class="decri"> &#x3000;{{brand.brandAction}}</p>
                   <p class="info">
                     &#x3000;<span>{{brand.brandDiscount}}折起</span>&#x3000;
                     {{brand.describe}} <i class="times" style="color: #999999 ">剩2天</i>
                   </p>
                 </a>
               </li>
             </div>
           </ul>
         </div>
       </li>

     </ul>

     <div class="clear"></div>
   </nav>

  </div>
</template>
<script>
  import '../assets/jquery'
  import BannerBar from './BannerBar.vue'
  const arr = ['2.png','3.png','4.png','5.png','6.png','7.png'];
  const arr1 = ['8.png','9.png','10.png','11.png','12.png','13.png','14.png']
  export default{
      data(){
          return{
            navs:'',
            ins:0,
            arr,
            arr1,
            brands:[],
            chooseItem:true,
            IndexBrand:0,
            brandss:[],
            num:0
          }
      },
    mounted(){
      var that = this;
      this.$axios.get('/user/findNav').then((result)=>{
        console.log(result);
        if(result.data.error === 0){
            that.navs = result.data.message;
        }
      }).catch((err)=>{
        console.log(err);
      })
    this.get();
      var n = 0
//      加载更多
      $(document).on('scroll',window,function () {
//          html总高度
        var height = $(this).height();
//        console.log(height)
//        窗口高度
        var screenHeight = $(window).height();
//        距离文档顶部的高度
        var scrollTop = $(window).scrollTop();
        if(scrollTop + screenHeight > height - 10){
            n++;
          this.$axios.get('/user/allBrand/?page=' + n).then(function(result){
            if(result.data.error === 0){
              var brandN = result.data.message;
              brandN.forEach(function(data){
                that.brands.push(data);
              })
            }
          }).catch((err)=>{
            console.log(err);
          })

        }
      })

    },
    components:{
      BannerBar:BannerBar
    },
    methods:{
      btn(name,index){
        this.ins = index;
        if(name == '今日推荐'){
          this.chooseItem = true;
        }else{
          this.chooseItem = false;
        }
        this.IndexBrand = this.ins;
//        发送请求
        this.$axios.get('/user/chooseBrand/' + name).then((result)=>{
          console.log(result);
          if(result.data.error === 0){
//          获得了一个包括所有品牌的数组
            this.brandss = result.data.message;
            if(name == '今日推荐'){
                this.brands = this.brandss;
            }
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      get(){
        this.$axios.get('/user/allBrand' ).then((result)=>{
          console.log(result);
          if(result.data.error === 0){
//          获得品牌的数组
            this.brands = result.data.message;
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>
<style scoped>
  .navTop{
    background: #ffffff;
  }
  nav{
background: #ffffff;

  }
.navUl{
  width: 747px;
  height: 50px;
  position: absolute;
  top:40px;
  background: #ffffff;
}
.clear{
  overflow: hidden;
}
  .navUl > li{
    float: left;
    list-style: none;
    height: 45px;
    text-align: center;
    line-height: 45px;
    /*border:solid 1px red;*/
    background-color: rgba(0,0,0,.7);
  }
.navUl > li:first-child{
  padding-left: 20px;
}
.navUl > li a{
  color:rgba(300,300,300,.8);
  font-size: 15px;
  height: 35px;
  display: inline-block;
}
.navUl > li.active .navA{
  border-bottom: solid 2px deeppink;
}
.navUl > li:last-child span{
  border: none;
}
 .line{
    margin-top: 5px;
    height: 30px;
    border-right: 1px solid rgba(300,300,300,.2);
    margin: 0px 20px;
  }
  /*每个导航所对应的内容*/
  .parallelism{
    width: 320px;
    position: absolute;
    top:205px;

    left: 0px;
    display: none;
  }
  .parallelism.active{
    width: 320px;
    display: block;
  }
  .parLi{
    list-style: none;
    width: 320px;
    position: relative;
  }
  .parLiO{
    list-style: none;
    width: 320px;
    position: relative;
    height: 30px;
  }
  parLi .under{
    width: 100%;
    height: 120px;
  }
.img{
  width: 320px;
  height: 120px;
  margin: 0px;
  padding:0px;
}
  .decri{
    width: 320px;
    position: absolute;
    display: block;
    color: #444444;
    font-size: 14px;
    text-align: left;
    background: rgba(300,300,300,.6);
    height: 20px;
    line-height: 20px;
    margin-top: -36px;
    z-index: 20;
  }
  .info{
    color:rgba(0,0,0,.8) ;
    text-align: left;
    border-bottom:solid 1px rgba(0,0,0,.2);
    margin: 0px;
    padding:0px;
    height: 30px;
    line-height: 30px;
    margin-top: -17px;
    background: rgba(300,300,300,.6);
  }
  .info > span{
    color: deeppink;
  }
  .times{
   font-style: normal;
    font-size: 13px;
    position: absolute;
    right: 10px;
  }
  .smallImg{
    width: 320px;
    height: 35px;
    margin-top: -30px;
  }
  .bannerB1{
    list-style: none;
    width: 320px;
    position: relative;
    height: 60px;
  }
  .bannerb1{
    width: 320px;
    height: 60px;
    /*margin-top: -30px;*/
  }
  .bannerb2{
    height: 300px;
    background: url("http://a3.vimage1.com/upload/flow/2017/11/06/95/15099596587265.jpg") no-repeat ;
    background-size: 100% 100%;
  }
  .bannerb3{
    background-image: url('http://a2.vimage1.com/upload/flow/2017/11/06/128/15099596616685.jpg');
    background-size: 100% 100%;
    height: 110px;
  }
  .baL{
    float: left;
  }
  .baL1{
    width: 120px;
    height: 300px;
  }
  .baR{
    float: left;
    width: 60%;
  }
  .baR > ul{
    margin: 0px;
    padding: 0px;
    overflow: hidden;
  }
  .baR > ul > li{
    list-style: none;
    margin: 0px;
    padding: 0px;
    float: left;
    /*margin-right: 8px;*/
    /*border:solid 1px red;!**!*/
    width: 40%;
    height:100px;
  }
  .baR > ul > li:nth-child(2n){
    margin-left: 28px;
  }
  .baR > ul > li a{
    display: inline-block;
    width: 80px;
    height:100px;
  }
  .baR > ul > li a > img{
    width: 80px;
    height:100px;
    margin: 0px;
    padding: 0px;
  }
  .bannerb3{

  }
  .bannerb3 > ul{
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    top:370px;
  }
  .bannerb3 > ul > li{
    list-style: none;
    margin: 0px;
    padding: 0px;
    float: left;
    width: 32%;
    height:100px;
    /*border:solid 1px red;*/
    margin-bottom: 10px;
  }
  .bannerb3 > ul > li > a{
    display: inline-block;
    width: 80px;
    height:100px;
  }
 .ba3{
   width: 80px;
   height:100px;
   margin: 0px;
   padding: 0px;
 }
  .BrandWrap{
    margin-bottom: 50px;
  }
</style>
