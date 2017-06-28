<template>
  <div>
    <mt-header title="客服中心">
      <mt-button icon="back" slot="left" @click.native="backUrl">返回</mt-button>
    </mt-header>
    <div style="text-align: center; padding-top: 50px">
      <img src="../../image/kefu.png" width="128px" height="128px"><br>
      <span style="font-size: 14px; color: #999999; margin-top:20px;">客服热线</span><br>
      <mt-button type="primary"  @click.native="phoneCall" id="call_but">
        <i class="iconfont icon-dianhua"> 4006-86-4006</i>
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {
    getStore,
  } from '../../service/getData.js'
  export default{
    data: function () {
      return {}
    },
    props: [],
    components: {},
    methods: {
      phoneCall: function () {
        window.location.href = 'tel://0755637';
      },
      backBut: function () {
        this.$router.back(-1)
      },
      backUrl:function(){
        let url=getStore("selected")
        this.$router.replace("/ynz")
      }
    }
  }
</script>

<style scoped>
  #call_but {
    margin-top: 15px;
    color: #ffffff;
    font-size: 20px;
    line-height: 40px;
    height: 50px;
    padding-left: 20px;
    padding-top: 3px;
    padding-right: 20px;
    background-color: #ff7e00;
    border-radius: 20px;
  }

  .icon-dianhua{
    font-size:20px;
  }

</style>
