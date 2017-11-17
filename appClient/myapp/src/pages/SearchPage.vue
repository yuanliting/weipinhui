
<template>
  <div>
   <header>
     <a href="#/search">  <i class="fa fa-angle-left back"></i></a>
     <input type="text" v-model="name" name="searchgood" class="searchgood" placeholder=" 大家正在搜索：连衣裙">
     <a class="search"   @click="search($event)">搜索</a>
   </header>
    <div v-if="show" class="searchFont">
      <!--应该整成动态的-->
      <p class="small">最近搜索 <span class="delect" @click="de()"> 清空</span></p>
      <ul v-if="(select1.length > 0)">
        <li>
          <a  style="margin-left: 10px;" v-for="(m,n) in select1[0].searchContent">{{m}} </a>
        </li>
      </ul>
    </div>
    <div class="searchFont">
      <p class="small">热门搜索</p>
      <ul>
        <li>
          <a href="#/">卡姿兰</a>
        </li>
        <li>
          <a href="#/goodpage/5a084abbb6150c37bc86ec0a">自然堂</a>
        </li>
        <li>
          <a href="#/goodpage/5a083939ea08b93374c59c4b">阿芙</a>
        </li>
        <li>
          <a href="#/">连衣裙</a>
        </li>
        <li>
          <a href="#/">牛仔裤</a>
        </li>
      </ul>
    </div>
    <div v-if="goods.length > 0">
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
    <div v-show="none"  style="padding: 0px 10px;">
      <h2 style="color: #999999;text-align: center">没有该商品</h2>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{
      show:true,
            name:'',
            goods:[],
            select:{},
            select2:[],
            select1:[],
            id:'',
            none:false
          }
      },
    mounted(){
      this.$axios.get('/user/searchC').then((result)=>{
        if(result.data.error === 0){
            this.select1 = result.data.message;
        }
      }).catch((err)=>{
        console.log(err);
      })
    },
    methods:{
          search(ev){
            ev.preventDefault();
        var param = ({
            name:this.name
        })
        this.$axios.post('/user/searchG',{
            params:param
        }).then((result)=>{
            console.log(result);
            if(result.data.error == 0){
            this.goods = result.data.message;
            console.log('这是搜索到的'+this.goods)
            if(this.goods.length == 0){
                this.none = true;
            }
            }
        }).catch((err)=>{
            console.log(err);
        })
          },
      de(){
              this.show = false;
//              将该用户的最近搜索删除
        this.$axios.get('/user/searchRemove').then((result)=>{
        }).catch((err)=>{
          console.log(err);
        })

      },

    }
  }
</script>
<style scoped>
  header{
    text-align: center;
    width: 100%;
    /*border:solid 1px red;*/
    overflow: hidden;
  }
  .back{
    width: 8%;
    float: left;
    font-size: 35px;
    color:rgba(0,0,0,.8);
    margin-top: 8px;
    text-align: center;
  }
  .searchgood{
    float: left;
    display: inline-block;
    width: 75%;
    margin: 0 auto;
    margin-top: 12px;
    border:solid 1px rgba(0,0,0,.2);
    height: 30px;
    text-align: left;
    padding-left: 10px;
    /*border:solid 1px red;*/
  }
  .search{
    float: left;
    width: 10%;
    margin-top: 12px;
    color:rgba(0,0,0,.8);
    text-align: center;
    margin-left: 5px;
    /*border:solid 1px red;*/
  }
  .searchFont{
    padding: 10px 10px;
  }
  ul{
    overflow: hidden;
  }
  li{
    list-style: none;
  float: left;
    margin-left: 10px;
  }
  li > a{
    border: solid 1px rgba(100,100,100,.4);
    display: inline-block;
    padding: 0px 5px;
    font-size: 12px;
    color:rgba(0,100,255,.6);
    border-radius: 2px;
    /*width: 20%;*/
  }
  .small{
    font-size: 14px;
    overflow: hidden;
  }
  .delect{
   float: right;
    color: rgba(0,0,0,.7);
  }
  /*显示搜索到的商品*/
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
</style>
