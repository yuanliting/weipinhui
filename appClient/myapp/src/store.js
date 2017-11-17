import Vue from 'vue';
import Vuex from 'vuex';
//使用vuex
Vue.use(Vuex);
//创建仓库对象
const store = new Vuex.Store({
//    state:存储仓库中的数据以及初始值，当前的数据所有的组件都可以调用
    state:{

        showModels:false,
        addressArr:[
            {
                name:'华北地区',
                sub:['北京','天津','河北','山西','内蒙古']
            },
            {
                name:'华南地区',
                sub:['广东','广西','河南','湖北','湖南','海南']
            },
            {

            }
        ],
        defaultAddress:'河南',
        verifyCode:'获取验证码',
    //    搜索商品
        showSearch:false,
          num:0,
      num1:0,
      num2:1

    },
    mutations:{

        changeModels:function (state,data) {
           state.showModels = data.value;
        },
        changeDefaultAddress:function (state,data) {
          state.defaultAddress = data.value;
          console.log(state.defaultAddress);
        },
        changeVerifyCode:function (state,data) {
            state.verifyCode = data.value;
        },
        sendCode:function (state,data) {
            state.verifyCode = data.value;
        },
    //    搜索页面的显示
        changeSearch:function (state,data) {
            state.showSearch = data.value;
        },
      changeNum:function (state,data) {
        state.num = data.value;
      },
      getBrandName:function (state,data) {
        state.num1 = data.value
      }

    }
})
export default  store;
