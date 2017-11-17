

<template>
    <div class="showSearch">
     <div class="searching">
       <div class="search-top">
         <a href="">  <i class="fa fa-angle-left back"></i></a>
         <a href="">  <i class="fa fa-home home"></i></a>
         <button-tab v-model="demo1">
           <button-tab-item @on-item-click="consoleIndex()">{{ $t('Articles') }}</button-tab-item>
           <button-tab-item @on-item-click="consoleIndex()">{{ $e('Products') }}</button-tab-item>
         </button-tab>
       </div>
       <a href="#/searchPage"><input type="text" name="searchgood" class="searchgood" placeholder="搜索品牌或商品"></a>
       <i class="fa fa-search find"></i>
     </div>
      <div class="showGood">
        <div class="floatLeft">
          <ul class="aside" >
            <li :class="{'active' : ins === item }" :key="item"  v-for="(good,item) in arr" @click="select(item)" class="asideLi">
              <a href="#">{{good.bigClassifyName}}</a>
              <div class="belongToThis" :class="{'active' : ins === item }">
                <ul>
                  <span class="lick" :class="{'active' : ins === item }"> {{good.bigClassifyDescribe}}</span>
                  <li v-for="(smallGood,index) in good.smallClassify">
                    <a :href="smallGood.superLink" class="smallWrap">
                      <img class="smallimg"  :src="'/static'+  smallGood.img" alt="">
                      <span class="describe">{{smallGood.ClassifyName}}</span>
                  </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import { ButtonTab, ButtonTabItem, Divider } from 'vux'
export default{
    data(){
        return{
          demo1: 0,
          arr:[],
          ins:0,
        }
    },
  components: {
    ButtonTab,
    ButtonTabItem,
    Divider
  },
  mounted:function () {
        var that = this;
    this.$axios.get('user/getBigClassify').then((result)=>{
        console.log(result);
        if(result.status === 200){
         console.log('jiabng');
         this.arr = result.data.message;
        }
    }).catch((err)=>{
        console.log(err);
    })

  },
  methods: {
    consoleIndex () {
      console.log('click demo1', this.demo1)
      if(this.demo1 === 0){
          console.log('这是搜索商品页面')
//          this.$router.push('/search');
        location.reload();
      }
      if(this.demo1 === 1){
          location.href = 'https://h5.vip.com/list/mobile-search.html#brands'
      }
    },
    $t(){
        return '分类';
    },
    $e(){
        return '品牌'
    },
    select(item){
     this.ins = item;
    }
  },
}

</script>
<style scoped>
  .showSearch{

  }
  .searching{
    background:rgba(100,100,100,.1) ;
    padding-bottom: 10px;
  }
    .back{
        font-size: 30px;
        color:rgba(0,0,0,.8);
        margin-left: 5px;
        margin-top: 8px;
    }
    .home{
        float: right;
        margin-right: 5px;
        margin-top: 8px;
        font-size: 25px;
        color:rgba(0,0,0,.8);
    }
  .vux-button-group{
    width: 48%;
    position: absolute;
    top:10px;
    left: 85px;
    height: 25px;
  }
    .vux-button-group a{
      color:#555555;
      height: 25px;
      line-height: 25px;
    }
    .vux-button-group > a.vux-button-group-current {
      color: #FFF;
      background:#777777;
    }
  /*搜索商品*/
  .searchgood{
    display: block;
    width: 90%;
    margin: 0 auto;
    margin-top: 12px;
    border:solid 1px rgba(0,0,0,.2);
    height: 30px;
    text-align: center;

  }
.find{
  color:rgba(0,0,0,.2);
  position: absolute;
  top:60px;
  left: 95px;
}
/*展示商品*/
  .showGood{
    overflow: hidden;
  }
  .floatLeft{
    float: left;
  }
  /*侧边栏*/
  .aside{
    width: 80px;
  }
  .aside > li{
    text-align: center;
    line-height: 40px;
    height: 40px;
    list-style: none;
    padding-left: 8px;

   }

  /*.aside li:hover{*/
    /*border:none;*/
    /*border-left:solid 4px mediumvioletred;*/
  /*}*/
  .aside li.active{
    border:none;
    border-left:solid 4px mediumvioletred;
  }
  .aside li.active a{
    border:none;
  }
  /*.aside li:hover a{*/
    /*border:none;*/
  /*}*/
  .aside > li > a{
    color: #555555;
    font-size: 14px;
    border-bottom: solid 1px #999999;
    padding-bottom: 10px;
  }

/*侧边栏右侧*/
  .belongToThis.active{
    display: block;
  }
.belongToThis{
  position: absolute;
  width: 70%;
  left: 90px;
  top:110px;
  display: none;
}
.belongToThis ul{
  overflow: hidden;
}
.lick{
  display: block;
  margin: 0px;
  padding: 0px;
  font-size: 12px;
  margin-top: -10px;
  text-align: left;
  display: none;
}
  .lick.active{
    display: block;
  }
  .belongToThis ul li{
    float: left;
    width: 27%;
    list-style: none;
    /*border:solid 1px red;*/
    margin-right: 12.2px;
    height: 88px;
    margin-bottom: 20px;
  }
  .smallWrap{
    color: #333333;
    margin: 0px;
    padding: 0px;
  }
 .smallimg{
  display: block;
  width: 60.3px;
  height:65px;
   margin: 0px;
  }
  .describe{
    display:block;
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    margin-top: -5px;
  }
</style>
