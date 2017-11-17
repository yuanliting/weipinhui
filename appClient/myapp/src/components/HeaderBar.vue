<script src="../store.js"></script>
<template>
    <div>
        <address-model></address-model>
<div class="header">
<div class="header-left">
    <a href="#/"><span class="logo">唯品会</span></a>
    <a class="address" href="#/">{{defaultAddress}} <i class="fa fa-chevron-down addressIcon" @click="select"></i></a>
    &nbsp;<a href="#/search"><input id="searchs" class="search" type="text" value="面膜" name="search" @click="search()"></a>
    <i class="fa fa-search find"></i>
    <a href="#/user">&nbsp; <i class="fa fa-user-o user" ></i></a>
</div>

</div>
    </div>

</template>

<script>
import addressModel from './addressModel.vue'
import {mapState} from 'vuex';
    export default {
        components: {
            addressModel:addressModel,
        },
        data () {
            return {
            showModels:false
            }
        },
        computed:{
            ...mapState([
                'showModel',
                'defaultAddress'
            ])
        },
        methods:{
            select(){
//             选地址的模态框   显示
            this.$store.commit({
                type:'changeModels',
                value:true
            })
            },
          search(){
          }

        }
    }
</script>

<style scoped>
.header{
    background-color: #ffffff;
    height: 45px;
    width: 100%;
    overflow: hidden;
    position: fixed;
}
    .header-left{
        float: left;
        margin: 0px;
        padding: 0px;
    }
    .logo{
        width: 60px;
        height: 45px;
        line-height: 45px;
        display: inline-block;
        margin-left: 10px;
        color:deeppink;
        font-size: 19px;
    }
    .address{
        line-height: 45px;
        color:#555555;
        font-size: 15px;
        margin-left: 1px;
        display: inline-block;
    }
    .addressIcon{
        font-weight: 400;
        color:#777777;
    }
    .search{
        line-height: 45px;
        padding: 0px;
        height: 25px;
        display: inline-block;
        width: 140px;
        border:none;
        background-color: rgba(0,0,0,.1);
        border-radius: 20px;
        text-align: center;
        color:rgba(0,0,0,.2);
        position: relative;
    }
    .find{
        color:rgba(0,0,0,.1);
        position: absolute;
        left: 175px;
        top:17px;
    }
    .user{
        font-size: 24px;
        color:rgba(0,0,0,.7);
    }
</style>
