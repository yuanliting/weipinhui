import Vue from 'vue'
//vue的路由
import VueRouter from 'vue-router'
//该插件并没有用上
import VueResource from 'vue-resource';
//这个首页
import Home from '../components/HelloFromVux';
//用户页面
import UserPage from '../pages/UserPage.vue';
//登录页面
import LoginUser from '../pages/LoginUser.vue';
//注册页面
import RegisterUser from '../pages/RegisterUser.vue'
//登录页面，这是没有用了，只是之前的试用页面
import login from '../pages/login.vue';
//在首页点击查找后，跳转的页面
import SearchGood from '../pages/SearchGood.vue';
//购物车页面
import cart from '../pages/cart.vue';
//待付款页面
import WaitPay from '../pages/WaitPay.vue'
//待收货页面
import WaitReceving from '../pages/WaitReceving.vue';
//订单页面
import ordered from '../pages/ordered.vue';
//商品页面----该页面应该做成动态的---后期处理
import GoodPage from '../pages/GoodPage.vue'
//商品详情页面
import GoodDetail from '../pages/GoodDetail.vue'
//添加或修改收货地址
import addAddress from '../pages/addAddress.vue'
//支付页面
import PayPage from '../pages/PayPage.vue'
//物流详情页面
import FlowPage from '../pages/FlowPage.vue'
//搜索页面
import SearchPage from '../pages/SearchPage.vue';
//评价商品页面
import EvaluatePage from  '../pages/EvaluatePage.vue';
//修改用户信息
import UserInfo from '../pages/UserInfo.vue';
//进入收藏页面
import ColletionPage from '../pages/CollectionPage.vue'
//尝试全选，全不选


Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
    {
    path: '/',
    component: Home
},
    {
        path:'/user',
        component:UserPage
    },
    {
    path:'/login',
        component:LoginUser
    },
    {
        path:'/register',
        component:RegisterUser
    },
  {
    path:'/logins',
    component:login
  },
//  搜索商品
  {
    path:'/search',
    component:SearchGood
  },
  {
    path:'/cart/:id',
    component:cart
  },
  {
    path:'/waitReceving/:id',
    component:WaitReceving
  },
  {
    path:'/ordered/:id',
    component:ordered
  },
  {
    path:'/goodpage/:id',
    component:GoodPage
  },
  {
    path:'/goodDetail/:id',
    component:GoodDetail
  },
  {
    path:'/addaddress/:id',
    component:addAddress
  },
  {
    path:'/waitPay/:id',
    component:WaitPay
  },
  {
    path:'/payPage',
    component:PayPage
  },
  {
    path:'/flowPage/:id/:index1',
    component:FlowPage
  },
  {
    path:'/searchPage',
    component:SearchPage
  },
  {
  path:'/evaluate/:index1/:index2/:id',
    component:EvaluatePage
  },
  {
  path:'/userInfo',
  component:UserInfo
 },
  {
    path:'/collection',
    component:ColletionPage
  },

]

export default new VueRouter({
    routes
})
