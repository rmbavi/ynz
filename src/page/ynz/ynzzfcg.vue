<template>
    <div>
      <mt-header title="支付成功">
        <router-link to="" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
      </mt-header>


    <div class="zf">
    <div class="zftop">
      <img src="../../image/zf.png"/>
      <h2>恭喜你,支付成功！<br>Payment success</h2>
    </div>
    </div>

    <div class="tipsall">
    <div class="tips">
        <img src="../../image/tips.png"/>
        <h2>提示</h2>
    </div>
    <div class="midfont">
        <h4>工作人员正在努力安排采摘,<br>并通过冷链物流配送到您手上,请耐心等待!</h4>
    </div>
    <div class="downtips">
    </div>
    </div>

  <div class="down">
  <mt-button type="default" class="chakanbtn">返回我的农庄</mt-button>
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
        methods: {}
    }
</script>

<style lang="css" scoped>
@import "../../style/ynzzfcg.css";
</style>
