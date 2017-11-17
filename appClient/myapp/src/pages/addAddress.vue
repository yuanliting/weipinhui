<template>
  <div class="waitReceving">
    <!--添加收货地址-->
    <div v-if="show">
      <header-bar>
        <span class="fonts" slot="fonts">添加收货地址</span>
      </header-bar>
      <div class="">
        <ul class="Setting">
          <li>
           收货人 <input id="userName" type="text" name="userName" v-model="userName">
          </li>
          <li>
            手机号 <input id="tel" type="text" name="tel" v-model="tel">
          </li>
          <li>
            收货时间
            <select name="goToTime" id="goToTime" v-model="goToTime">
              <option value="">收货时间不限</option>
              <option value="周六日/节假日收货">周六日/节假日收货</option>
              <option value="周一至周五收货">周一至周五收货</option>
            </select>
            <i class="fa fa-angle-right"></i>
          </li>
          <li>
            <group>
              <x-address id="value2"  @on-hide="logHide" :title="title" @on-show="logShow" v-model="valued" :list="addressData"
                         @on-shadow-change="onShadowChange"  placeholder="请选择" :show.sync="showAddress"></x-address>
            </group>
          </li>
          <li>
            详细地址<textarea name="" id="detailAddress" cols="28" rows="3" v-model="detailAddress">
               </textarea>
          </li>
        </ul>
      </div>

      <div class="details">
        <div class="bottomWrapSure">
          <p   @click="btn2()"> <span class="bottomAddSure">确定</span></p>
        </div>
      </div>

    </div>


    <!--修改地址-->
    <div v-else-if="showUpdate">
      <header-bar>
        <span class="fonts" slot="fonts">修改地址列表</span>
      </header-bar>
      <div>
        <ul class="Setting">
          <li>
            收货人 <input id="userNameC" type="text" :placeholder="change.name" name="userName" v-model="userName" >
          </li>
          <li>
            手机号 <input id="telC" type="text" :placeholder="change.tel" name="tel" v-model="tel">
          </li>
          <li>
            收货时间
            <select name="goToTime" id="goToTimeC" v-model="goToTime">
              <option value="">{{change.goToTime}}</option>
              <option value="收货时间不限">收货时间不限</option>
              <option value="周六日/节假日收货">周六日/节假日收货</option>
              <option value="周一至周五收货">周一至周五收货</option>
            </select>
            <i class="fa fa-angle-right"></i>
          </li>
          <li>

            <group>
              <x-address id="value2C" :title="title"  @on-hide="logHide" @on-show="logShow"  v-model="valued" :list="addressData"
                         @on-shadow-change="onShadowChange"  placeholder="请选择"  :show.sync="showAddress"></x-address>
            </group>
          </li>
          <li>
            详细地址<textarea   name="" id="detailAddressC" cols="28" rows="3" v-model="detailAddress">
               {{change.detailAddress}}
          </textarea>
          </li>
        </ul>
      </div>
      <div class="details">
        <div class="bottomWrap">
          <p  @click="btn3()"> <span class="bottomAdd">确定</span></p>
        </div>
      </div>
    </div>




  <!--显示地址-->
   <div v-else="">
     <header-bar>
       <span class="fonts" slot="fonts">收货地址列表</span>
     </header-bar>
     <div v-for="(add,index) in userAddress" class="YourAdd">
       <p class="addOne">{{add.name}} &#x3000;{{add.tel}}</p>
       <p class="addTwo">{{add.choose[0]}}&nbsp;{{add.choose[1]}}&nbsp;{{add.choose[2]}}&nbsp;{{add.detailAddress}}</p>
       <p class="addThree">{{add.goToTime}}</p>
       <span class="addFour" @click="delect(index)">删除</span><span @click="update(index)" class="addFive">修改</span>
     </div>
     <div class="details">
       <div class="bottomWrap">
         <p  @click="btn1()"> <span class="bottomAdd">添加收货地址</span></p>
       </div>
     </div>
   </div>



  </div>
</template>
<script>
  import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'
  import HeaderBar from '../components/HeaderBar2.vue'
  export default{
    data(){
      return{
        title: '请选择所在地',
         id:'',
        show:false,
        userName:'',
        tel:'',
//        title2: '所在地址',
//        value2: ['天津市', '市辖区', '和平区'],
//        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data,
        showAddress: false,
        detailAddress:'',
        goToTime:'',
        Sure:false,
        userAddress:'',
        showAdd:false,
        change:'',
        showUpdate:false,
        valued:[],
        title:'所在地区',
        choose:[],
//       修改哪个收货
        item:0
      }
    },
    components: {
      Group,
      XAddress,
      XButton,
      Cell,
      HeaderBar
    },

    created(){
//          组件创建完成后获取数据
//      此时data已经被observed了
      this.fetchData()
    },
    mounted(){

    },
    watch:{
      // 如果路由有变化，会再次执行该方法
      '$route':'fetchData'
    },
    methods:{
      fetchData () {
        var id = this.$route.params.id;
//        console.log(id);
        this.$axios.get('/user/checkUser').then((result)=>{
          console.log(result);
          if(result.data.error === 0){
            this.id = result.data.message._id;
            this.userAddress = result.data.message.addressList;

          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      btn1(){
         this.show = true;
      },
      btn2(){
        var name = document.getElementById('userName');
        var telf = document.getElementById('tel');
        var goToT = document.getElementById('goToTime');
//        console.log('这是悬着'+this.choose);
        var detailAdd = document.getElementById('detailAddress');
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.userName == ''){
            alert("请输入收货人的姓名")
        }else if(this.tel == ''){
          alert("请输入手机号码");
        }else if(!reg.test(this.tel)){
          alert("手机格式不正确");
        }else if(this.detailAddress == ''){
            alert("请填写详细地址")
        }else if(this.choose === ''){
            alert("请选择省市区")
        }else{
            if(goToT.value == ''){
               this.goToTime = '收货时间不限'
            }else{
              this.goToTime = goToT.value
            }
          var param = ({
            userName:name.value,
            tel:telf.value,
            goToTime:this.goToTime,
            choose:this.choose,
            detailAddress:detailAdd.value,
          })
          this.$axios.post('/user/addAddress',{
            params:param
          }).then((result)=>{
            console.log(result);
            if(result.data.error === 0){
               this.show = false;
               location.reload();
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
      delect(index){
          var param = ({
              index:index
          })
        console.log(param);
        this.$axios.post('/user/removeAddress',{
            params:param
        }).then((result)=>{
            console.log(result);
            if(result.data.error == 0){
                location.reload();
            }
        }).catch((err)=>{
            console.log(err);
        })
      },
      update(index){
          console.log(index);
          this.item = index;
          var param = ({
              index:index
          })
        this.$axios.post('/user/findAddress',{
          params:param
        }).then((result)=>{
          console.log(result);
          if(result.data.error == 0){
          this.change = result.data.message;
         this.showUpdate = true;
          }
        }).catch((err)=>{
          console.log(err);
        })
      },
      btn3(){
        var telf = document.getElementById('telC');
        var goToT = document.getElementById('goToTimeC');
//        console.log('这是悬着'+this.choose);
        var detailAdd = document.getElementById('detailAddressC');
        var name = document.getElementById('userNameC');
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.userName == ''){
          alert("请输入收货人的姓名")
        }else if(this.tel == ''){
          alert("请输入手机号码");
        }else if(!reg.test(this.tel)){
          alert("手机格式不正确");
        }else if(this.choose == ''){
          alert("请填写详细地址")
        }else if(this.detailAddress == ''){
          alert("请选择省市区")
        }else{
          if(goToT.value == ''){
            this.goToTime = '收货时间不限'
          }else{
            this.goToTime = goToT.value
          }
          var param = ({
            userName:name.value,
            tel:telf.value,
            goToTime:this.goToTime,
            choose:this.choose,
            detailAddress:detailAdd.value,
            item:this.item
          })
//          console.log('这是要修改的索引值'+ this.item);
          this.$axios.post('/user/updateAddress',{
            params:param
          }).then((result)=>{
            console.log(result);
            if(result.data.error == 0){
              this.showUpdate = false;
            }
          }).catch((err)=>{
            console.log(err);
          })


        }
      },
      doShowAddress () {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) {
//        console.log(ids, names)
        this.choose = names;
//        console.log('12345678dvfsgvrvg'+ this.choose)
      },
      changeData () {
        this.value2 = ['430000', '430400', '430407']
      },
      changeDataByLabels () {
        this.value2 = ['广东省', '广州市', '天河区']
      },
      changeDataByLabels2 () {
        this.value2 = ['广东省', '中山市', '--']
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
//        console.log('on-hide', str)
      },
      logShow (str) {
//        console.log('on-show')

      },
      value(){

      }
    }
  }
</script>
<style scoped>
  .waitReceving{
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
/*底部添加地址span*/
  .details{
    height: 500px;
    width: 100%;
  }
  .bottomWrap{
    text-align: center;
  }
  .bottomAdd{
    display:inline-block;
    width: 80%;
    line-height: 35px;
    border: solid 1px rgba(100,100,100,.6);
    text-align: center;
    margin-top: 20px;
    color:rgba(100,100,100,.9) ;
  }
  .bottomWrapSure{
    text-align: center;
    margin-top: 40px;
  }
  .bottomAddSure{
    display:inline-block;
    width: 80%;
    line-height: 35px;
    border: solid 1px rgba(200,200,200,.1);
    text-align: center;
    margin-top: 20px;
    color:rgba(100,100,100,.5) ;
    background: rgba(100,100,100,.2);
  }
  .bottomAddSure.active{
    background: deeppink;
    color: #ffffff;
  }
  /**/
  .Setting > li{
    line-height: 45px;
    width: 94%;
    border-bottom: solid 1px rgba(100,100,100,.2);
    padding-left: 10px;
    margin-left: 10px;
    list-style: none;
  }
  .Setting > li input{
   line-height: 45px;
    width: 75%;
    border:none;
    font-size: 18px;
    color: rgba(0,0,0,.7);
    font-style: normal;
  }
  .Setting > li select{
    line-height: 45px;
    width: 60%;
    border:none;
    font-size: 16px;
    color: rgba(0,0,0,.7);
    font-style: normal;
  }
  .Setting > li i{
    font-size: 20px;
    margin-top: 2px;
    line-height: 40px;
    margin-left: 18px;
    color: rgba(0,0,0,.3);
  }
  .Setting > li:nth-child(3){
    border: none;
    line-height: 55px;
    margin-top: 14px;
  }
  .Setting > li:nth-child(4){
    padding-left: 0px;
  }
  .vux-popup-picker-select{
    color: #999999;
  }
  .Setting > li{
    line-height: 50px;
    text-align:center;
  }
  .Setting > li textarea{
    width: 74%;
    border: none;
  }
/*用户地址的样式*/
  .YourAdd{
    font-size: 14px;
    padding: 12px 12px;
    border-bottom: solid 1px rgba(100,100,100,.1);
    overflow: hidden;
  }
  .addOne{
    font-weight: 600;
    color: rgba(0,0,0,.8);
  }
  .addTwo{
color:rgba(0,0,0,.7) ;
  }
  .addThree{
    color:rgba(0,0,0,.7) ;
    margin-top: 5px;
  }
  .addFour,.addFive{
     float: right;
    margin-left: 28px;
    color: cornflowerblue;
  }
  .vux-popup-picker-select > span{
    font-size: 12px;
  }

</style>
