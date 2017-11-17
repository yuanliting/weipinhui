
<template>
  <div class="evaluate">
    <header>
      <a :href="'#/ordered/' + id">  <i class="fa fa-angle-left back"></i></a>
     <span>评价</span>
    </header>
    <div class="content">
      <form action="" ref="myform">
        <textarea  name="content" id="content" cols="35" rows="5" v-model="content" required>
         </textarea>
        <img v-for="i in files" :src="i" class="images" :key="i">
        <input id="file" type="file" name="photo" accept="image/*"
               @change="chooseImage($event)" multiple class="photo">
        <span v-if="select1.length > 0">点击取消标签：</span>
        <span class="one" v-for="(m,n) in select1" @click="cancle(m)">{{m}}</span>
      <p class="choose">
        选择标签：
        <button  v-for="(item,index) in arr" v-model="select" @click="btn1($event)" :key="index">{{item}}</button>
      </p>
        <input type="checkbox" v-model="name" class="" @click="btn()"> 匿名评价
        <button type="submit" class="give" @click="give($event)" required>提 交</button>
      </form>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{
          id:'',
           name:'',
            content:'',
            imgs:'',
            files:[],
            productImage:[],
            index1:0,
            index2:0,
            ids:'',
            names:'',
            arr:[
                '保湿',
              '便宜',
              '易吸收',
              '活肤',
              '面料好',
              '很合身',
              '正品'
            ],
            select:{},
//            select2:'',
            select2:[],
            select1:[],
            photo:[]

          }
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
        this.id = this.$route.params.id;
        this.index1 = this.$route.params.index1;
        this.index2 = this.$route.params.index2;
        console.log(id);
        this.id = id;
        this.$axios.get('/user/checkUser').then((result)=>{
          console.log(result);
          if(result.data.error === 0){
            this.ids =  result.data.message._id;
            this.names = result.data.message.userPhone;
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      chooseImage(e){
//        this.productImage = event.target.files;
//        console.log(event.target.files)
        for(var i = 0;i< e.target.files.length;i++){
          this.productImage.push(e.target.files[i]);
          var url = URL.createObjectURL(e.target.files[i]);
          this.files.push(url);
        }
        console.log(this.files)
      },
      give(event){
//          console.log('点击了')
        event.preventDefault();
        let myform = this.$refs.myform;
        console.log('这是表单的内容' + myform);
        let formData = new FormData(myform);
        formData.append('id',this.id);
        if(this.photo.length < 0){
            this.photo = []
        }
//        判断用户是否选择匿名
        if(this.name == ''){
          formData.append('name',this.names);
        }else{
          formData.append('name','');
        }
//        判断用户是否选择评价标签
        if(this.select1.length > 0){
          formData.append('evaluateClass',this.select1);
        }

        let config = {
          headers:{
            "Content-Type": "multipart/form-data"
          }
        };
//        发送评价的请求
        this.$axios.post('/user/evaluate',formData,config).then((resData) =>{
          console.log(resData);
          if(resData.data.error == 0){
              alert(resData.data.message);
           this.$router.push({path:'/ordered/' + this.ids})
          }
        })

      },
      btn(){
          console.log(this.name);
      },
      btn1(ev){

        ev.preventDefault();
        this.choose = ev.target.firstChild.data;
        this.select2.push(this.choose);

//        进行数组排重
        function unique(arr){
//            先排序
          var arr2 = arr.sort();
          var res = [arr2[0]];
          for(var i = 1;i < arr2.length; i++){
            if(arr2[i] !== res[res.length - 1]){
              res.push(arr2[i]);
            }
          }
          return res;
        }

        unique(this.select2);
        this.select1 = unique(this.select2);

        },
      cancle(m){
//          取消选择的标签
        console.log(m);
//        删除数组的某个字符串
        Array.prototype.remove = function(val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        this.select1.remove(m);
      }
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
    float: left;
    font-size: 35px;
    color:rgba(0,0,0,.8);
    margin-left: 5px;
    margin-top: 8px;
  }
  header span{
    display: inline-block;
    font-size: 18px;
    margin-top: 10px;
  }
  .content{
    margin: 13px;
  }
  textarea{
  padding: 10px;
    width: 93%;
  margin-bottom: 10px;
  }
  .photo{
    display: block;
    margin-bottom: 10px;
  }
  .give{
    display: block;
    width: 98%;
    margin: 10px auto;
   line-height: 35px;
    border: solid 1px deeppink;
    background-color: #ffffff;
    color:deeppink;
    font-size: 16px;
    border-radius: 5px;
  }
  .images{
    width: 100px;
    height: 100px;
  }
  .choose{
    margin-bottom: 10px;
    border: solid 1px rgba(255,0,100,.5);
    padding: 10px 10px;
    color:deeppink;
    border-radius: 10px;
  }
  .one{
    padding: 2px 5px;
    border:solid 1px rgba(255,0,100,.5);
    background-color: #ffffff;
    margin-left: 10px;
    margin-bottom: 10px;
    color:rgba(255,0,100,.5);
    border-radius: 5px;
    /*width: 15%;*/
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    display: inline-block;
  }
  .choose > button{
    padding: 2px 5px;
    border:solid 1px rgba(255,0,100,.5);
    background-color: #ffffff;
    margin-left: 10px;
    margin-bottom: 10px;
    color:rgba(255,0,100,.5);
    border-radius: 5px;
  }
</style>
