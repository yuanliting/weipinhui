<template>
  <div class="payPage">
    <div class="top">
      <span class="pageName">唯品会收银台</span>
    </div>
    <group style="padding: 0px;margin-top: -20px;">
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">
         <p> 放弃支付吗？</p>
          已提交的订单需在30分钟内完成支付，
          不然就会被取消订单哦~
        </p>
      </confirm>
    </div>

    <div style="width: 100%;background-color: #FBF9FE;">
      <div style="width: 70%;padding: 20px;margin: 0 auto;">
          <step v-model="step2" background-color='#fbf9fe'>
            <step-item :title="$e()" ></step-item>
            <step-item :title="$g()"></step-item>
          </step>

      </div>
    </div>

    <div class="same">
      <p class="money">订单金额  <span style="color: deeppink">￥{{total}}</span></p>
      <p class="warn">订单提交成功，请在<span style="color: deeppink;font-size: 13px;font-weight: 600;">30:00</span>内完成付款</p>
    </div>

    <div class="select">
     <ul class="selectUl">
       <li class="selectLi">
         <checklist  :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>
       </li>
     </ul>
    </div>

    <div class="fixed">
        <div class="btn_wrap" v-if="fu">
          <a @click="pay()"><x-button type="primary" @click.native="nextStep" >付款</x-button></a>
        </div>
        <div class="btn_wrap" v-else="">
          <x-button type="primary" @click.native="nextStep" >付款</x-button>
        </div>
    </div>

  </div>
</template>
<script>
  import { Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom,
    Step, StepItem, XHr,Checklist } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch,
      XButton,
      Step,
      StepItem,
      XHr,
      Checklist
    },
    data () {
      return {
        show: false,
        step2: 0,
        cartList:[],
        fullValues: [],
        labelPosition: '',
        error: '',
        commonList: [ '唯品金融','银行卡支付', '微信支付', '支付宝' ],
        checklist001: [],
        id:'',
        fu:false
      }
    },
    mounted(){
    this.$axios.get('/user/checkUser').then((result)=>{
//        console.log(result);
        if(result.data.error == 0){
            this.cartList =  result.data.message.cartList;
            this.id = result.data.message._id;
        }
    }).catch((err)=>{
        console.log(err);
    })
    },
    computed:{
      total(){
        //    计算购物车的商品的总价格
        var price = 0;
        var num = 0;
        var to = 0;
        this.cartList.forEach((item,index)=>{
          price = item.goodPrice;
          num = item.goodNum;
          to += price * num;
        })
        return to;
      },
    },
    methods: {
      change (val, label) {
        console.log('change', val, label)
       if(val.length != 0){
           this.fu = true;
       }
      },
      pay(){
          this.$axios.get('/user/ordered').then((result)=>{
              console.log(result);
          }).catch((err)=>{
              console.log(err);
          })
        this.$router.push({path:'/waitReceving/'+ this.id})
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
//        console.log('on confirm')
//        if (msg) {
//          alert(msg)
//        }
      },
      onHide () {
       this.$router.push({path:'/waitPay/' + this.id});

      },
      onShow () {
        console.log('on show')
      },
      showPlugin () {
        this.$vux.confirm.show({
          title: 'Title',
          content: 'Content',
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          },
          onCancel () {
            console.log('plugin cancel')
          },
          onConfirm () {
            console.log('plugin confirm')
          }
        })
      },
      nextStep () {
        this.step2 ++
      },
      $t(){
          return '选择退出'
      },
      $e(){
          return '提交订单'
      },
      $g(){
          return '付款'
      },

    }
  }
</script>

<style scoped>
.payPage{
 background-color: #eeeeee;
}
  .top{
    background-color: white;
    padding-top: 10px;
    margin: 0px;
  }
  .pageName{
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-bottom:10px ;
  }
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
.same{
  background-color: #FBF9FE;
  padding-bottom: 1px;
}
  .money{
    text-align: center;
  }
  .warn{
    font-size: 14px;
    text-align: center;
    color: rgba(0,0,0,.8);
    padding-bottom: 15px;
  }
  .select{
    background-color: #ffffff;
  }
  .selectUl{

  }
  .selectLi{
    height: 45px;
    line-height: 45px;
    border-bottom: solid 1px rgba(100,100,100,.2);
  }
  .fixed{
    position: fixed;
    bottom: 10px;
    width: 100%;
  }
</style>
