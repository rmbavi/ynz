<template>
    <div>
      <mt-header title="托管成功">
        <router-link to="myNz" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>


    <div class="zf">
    <div class="zftop">
      <img src="../../image/zf.png"/>
      <h2>恭喜你,托管成功！<br>Trusteeship success</h2>
    </div>
    </div>

    <div class="tipsall">
    <div class="tips">
        <img src="../../image/tips.png"/>
        <h2>提示</h2>
    </div>
    <div class="midfont">
        <h4>工作人员正在努力安排代卖,<br>大约在7个工作日处理完成,请耐心等待!</h4>
    </div>
    <!--<div class="downtips">-->
    <!--</div>-->
    </div>
  <div style="height: 10px;border-top: 1px solid #ececec"></div>
  <div class="tuo_guan_down">
  <mt-button type="default" class="chakanbtn" @click="toMyNz">返回我的农庄</mt-button>
  </div>

    </div>
</template>

<script>
  export default{
        data: function () {
            return{

            }
        },
        props: [],
        components: {},
        methods: {
          toMyNz(){
            this.$router.replace("/myNz")
          },
        },


  }
</script>

<style lang="css" scoped>
@import '../../style/ynzdmcg.css';
</style>
