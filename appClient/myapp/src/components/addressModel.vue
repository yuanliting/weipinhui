
<template>
    <div class="addressWrap" v-show="showModels">
    <div class="addressTop">
        <i class="fa fa-times close"  @click="closeBtn"></i>
    <p class="about"><i class="fa fa-rocket fast"></i> 选择收货地址，火速配送哦</p>
        <p class="area">我们猜您在</p>
        <li><a href="">{{defaultAddress}}</a></li>
    <ul v-for="(area,item) in addressArr">
        <p class="area">{{area.name}}</p>
        <li v-for="(province,index) in area.sub" @click="selected(province)">
            <a href="">{{province}}</a>
        </li>
    </ul>
    </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapState([
            'showModels',
            'addressArr',
            'defaultAddress'
        ])
    },
    methods:{
        closeBtn(){
//            console.log('点击了');
            this.$store.commit({
                type:'changeModels',
                value:false
            })
        },
        selected(province){
//            console.log(province);
            this.$store.commit({
                type:'changeModels',
                value:false
            })
                this.$store.commit({
                    type:'changeDefaultAddress',
                    value:province
                })
        }
    }
}
</script>
<style scoped>
    .addressWrap{
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10;

    }
    .addressTop{
        position: absolute;
        z-index: 12;
        width: 90%;
        height: 90%;
        background: #ffffff;
        top:25px;
        left:15px;
        overflow: hidden;
        margin-bottom: 1000px;
    }
    .close{
        position: absolute;
        right: 10px;
        top:10px;
        color:#999999;
    }
    .addressTop > .about{
        text-align: center;
        margin-top: 10px;
        color: deeppink;
        font-size: 14px;
    }
    .fast{
        font-size:20px;
    }
    ul{
        margin-top: 20px;
        overflow: hidden;

    }
    li{
        list-style: none;
        border-bottom: solid 1px rgba(0,0,0,.2);
        line-height: 45px;
        padding-left: 20px;

    }
    li a{
        color:#333333;
        font-size: 14px;
    }
    .area{
        background-color: rgba(0,0,0,.2);
        color: #777777;
        padding-left: 10px;
        font-size: 15px;
    }

</style>
