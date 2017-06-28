<template>
    <div>
      <mt-header title="支付成功">
        <router-link to="/myNz" slot="left">
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


    <!--<div class="cg">
      <img src="../../image/dg.png"/>
      <h2>成功支付认领以下产品</h2>
    </div>

    <div class="cp">
      <img :src="head_img"/>
      <div class="cpfont"><h3 class="fontset"></h3><h4>购买数量：<span></span> ({{danwei}})</h4></div>
      <img src="../../image/sy.jpg" :onerror="default_news_detail"/>
      <div class="cpfont" style="margin-left: 0px"><h3 class="fontset">{{names}} (Sheep)</h3><h4>购买数量：<span>{{buy_number}}</span> (只)</h4></div>
      <div class="canvas"><myCanvas message=50 linecolor=#36b302 value=50 zt=成长中></myCanvas></div>
    </div>-->


  <div class="down">
  <mt-button type="default" class="chakanbtn" @click="toMyNz">查看我的农庄</mt-button>
  </div>

    </div>
</template>

<script>
import myCanvas from '../../components/progress.vue'
import {fanyi} from '../../service/unit.js'
import {imgBaseUrl,default_news_detail} from '../../config/env.js'

  export default{
        data: function () {
            return{
              names:"",
              danwei:"",
              head_img:"",
              buy_number:"",
              default_news_detail:default_news_detail,
            }
        },
        mounted(){
          this.names=this.$route.params.names
          this.buy_number=this.$route.params.buy_number
          this.head_img=this.$route.params.head_img
          this.danwei=this.$route.params.danwei
        },
        props: [],
        components: {myCanvas:myCanvas},
        methods: {
          toMyNz(){
            this.$router.replace("/myNz")
          }
        }
    }
</script>

<style lang="css" scoped>
  @import "../../style/zfcg.css";
</style>
