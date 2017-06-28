<template>
  <div>
    <mt-header title="消息">
      <mt-button icon="back" slot="left" @click.native="backUrl">返回</mt-button>
    </mt-header>
    <div class="msgBody">
      <div>
        <div class="head_time">
         <span>
           4月27日  17:38
         </span>
        </div>
        <div class="box">
          <div class="img_ke_fu">
            <img src="../../image/kefu.png" height="60" width="60" alt=""/>
          </div>
          <div class='qipao_1'>
            <div class='jianjiao_1'></div>
            [慧种订单]您购买的xxx，已由xxx接单了，正在安排发货
            [慧种订单]您购买的xxx，已由xxx接单了，正在安排发货
            [慧种订单]您购买的xxx，已由xxx接单了，正在安排发货
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
      <div>
        <div class="head_time">
         <span>
           4月27日  17:38
         </span>
        </div>
        <div class="box">
          <div class="img_ke_fu">
            <img src="../../image/kefu.png" height="60" width="60" alt=""/>
          </div>
          <div class='qipao_1'>
            <div class='jianjiao_1'></div>
            最新版本上线！
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
      <div>
        <div class="head_time">
         <span>
           4月27日  17:38
         </span>
        </div>
        <div class="box">
          <div class="img_ke_fu">
            <img src="../../image/kefu.png" height="60" width="60" alt=""/>
          </div>
          <div class='qipao_1'>
            <div class='jianjiao_1'></div>
            您已经认证成功，恭喜您！
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
    </div>
    <!--您已经认证成功，恭喜您！-->
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
      backUrl: function () {
        let url=getStore("selected")
        this.$router.replace("/"+url)
      }
    }
  }
</script>

<style scoped>
  @import "../../style/msg.css";
</style>
