<template>
    <div>
      <div id="menu_user_into">
        <div id="edit_info">
          <i icon="picture_in_picture" />
        </div>
        <div id="user_head_img" style="padding-top: 20px; padding-left: 40px;">
          <div class="head_img">
            <img src="../../image/touxiang.jpg" width="60" height="60" alt="" @click="toPersonal"/>
          </div>
          <div class="head_user" style="margin-top: 10px; margin-left: 10px">
            <span style="display: inline-block;margin-bottom: 2px">王小姐</span><br>
            <i class="icon iconfont icon-weizhi" style="font-size:18px; vertical-align: bottom; position:relative;left:-2px;" />
            <span style="position: relative;top: -2px;font-size: 12px">广州市广州市广州市</span>
          </div>

          <div class="edit_box" @click="toEditDatum">
            <i class="icon iconfont icon-edit" style="font-size: 25px;"></i>
          </div>
        </div>
      </div>
      <div style="" id="menu_box">
        <ul>
          <li @click="toOrder" class="selected"><i class="icon iconfont icon-order"></i>我的订单</li>
          <li @click="toMyWallet"><i class="icon iconfont icon-qianbao"></i>我的钱包</li>
          <li @click="toKefu"><i class="icon iconfont icon-icfeedbackkefu"></i>客服服务</li>
          <li><i class="icon iconfont icon-shezhi"></i>系统设置</li>
        </ul>
      </div>

      <!--<div style="position: relative">-->
        <!--<div class="topImg">-->
          <!--<img src="../../image/personal_top_bg.png" width="105%" alt="">-->
        <!--</div>-->
        <!--<div class="edit_box">-->
          <!--<i class="icon iconfont icon-edit" style="font-size: 25px;"></i>-->
        <!--</div>-->
        <!--<div class="pageTit">-->
          <!--<span>欢迎登录</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>
</template>

<script>
    export default{
        data: function () {
            return {

            }
        },
        props: [],
        components: {

        },
        methods: {
          toKefu: function () {
            this.$router.push("/customerService");
          },
          toEditDatum: function(){
            this.$router.push("/editDatum");
          },
          toMyWallet: function(){
            this.$router.push("/myWallet");
          },
          toOrder: function () {

          }
        }
    }
</script>

<style scoped>

</style>
