<template>
  <div class="shezhi">
    <mt-header title="设置">
      <mt-button icon="back" slot="left" @click.native="backUrl">返回</mt-button>
      <!--<mt-button icon="more" slot="right" @click="toPanda"></mt-button>-->
    </mt-header>
    <div class="sheZhi_box">
      <mt-cell title="账号与安全" @click.native="toRealName" style="margin-top: 10px">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-anquan icon_img"></i>
      </mt-cell>
      <mt-cell title="我的收货地址" @click.native="toSelectAddress" style="margin-top: 10px">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-dizhi1 icon_img" style="vertical-align: top"></i>
      </mt-cell>
      <div style="margin-top: 10px;border-bottom: 0px solid;">
      </div>
      <!--<mt-cell title="用户指南" @click.native="user_guide">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-yonghuzhinan icon_img" style="vertical-align: sub"></i>
      </mt-cell>-->
      <mt-cell title="给我们好评">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-good " style="padding: 5px"></i>
      </mt-cell>
      <mt-cell title="法律条款" @click.native="fa_lv">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-tiaokuan icon_img"></i>

      </mt-cell>
      <mt-cell title="关于我们">
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-guanyuwomen icon_img" style="vertical-align: top"></i>
      </mt-cell>
      <div style="margin-top: 10px">
      </div>
      <mt-cell title="检查更新">
        <span v-if="flag">
          <i class="iconfont icon-new" style="color: red ;margin-right: 120px;font-size: 30px"></i>
        </span>
        <span v-if="flag">  v1.02</span>
      <span v-else="flag">
           <i class="iconfont icon-right"></i>
         </span>
        <i slot="icon" class="iconfont icon-gengxin icon_img"></i>
      </mt-cell>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import {getStore,objIsNull} from "../../service/getData.js"
  export default{
    data: function () {
      return {
        flag: true
      }

    },
    props: [],
    components: {},
    methods: {
      toRealName: function () {
        let token = getStore("token");
        if(objIsNull(token)){
          Toast("请重新登录!")
          this.$router.replace("/login")
          return;
        }
        this.$router.push("/realName")
      },
      backUrl:function(){
        let url=getStore("selected")
        this.$router.replace("/ynz")
      },
      user_guide: function () {
        this.$router.push("/userGuideList")
      },
      fa_lv: function () {
        this.$router.push("/legalProvisions")
      },
      toSelectAddress(){
        this.$router.push("/addressList")
      }
    }
  }
</script>

<style scoped>
  @import "../../style/sheZhi.css";

  .icon_img {
    vertical-align: sub;
    font-size: 18px;
    padding: 5px;

  }
</style>
