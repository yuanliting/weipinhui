<template>
  <div>
    <header>
      <a href="#/user">  <i class="fa fa-angle-left back"></i></a>
      <slot name="fonts"></slot>
      <a href="#/">  <i class="fa fa-home home"></i></a>
    </header>
  </div>
</template>
<script>
  export default{
      data(){
          return{

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

  .home{
    float: right;
    margin-right: 5px;
    margin-top: 8px;
    font-size: 30px;
    color:rgba(0,0,0,.8);
  }
</style>
