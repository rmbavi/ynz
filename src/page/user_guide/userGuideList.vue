<template>
  <div>
    <mt-header fixed title="用户指南">
      <mt-button icon="back" slot="left" @click.native="back_but">返回</mt-button>
      <!--<mt-button icon="more" slot="right" @click="toPanda"></mt-button>-->
    </mt-header>
    <div class="user_guide_content">
      <h4>1、登录</h4>
      <span>进入登录页面，在APP登录页先输入手机号码，获取验证码 验证通过后进入身边事省市县镇村系统定位(查看附近的人发布最新的身边事)。</span>
      <img src="../../image/user_guide_image/menu.png" width="100%" height="100%">
      <h4>2、切换面板到农家乐</h4>
      <span>可以展示最新、政府、农业、搞笑新闻内容。</span>
      <span>点击新闻内容 可以查看新闻详情、可以发表评论新闻。</span>
      <img src="../../image/user_guide_image/newsList.png" width="100%" height="100%">
      <h4>3、用户基本信息</h4>
      <span>弹出左侧菜单栏（我的订单、我的钱包、客服服务、系统设置、退出登录。</span>
      <span> 点击大头像可以认证用户名信息，右侧图标可以编辑用户基本信息。</span>
      <img src="../../image/user_guide_image/left_menu.png" width="100%" height="100%">
      <img src="../../image/user_guide_image/edit.png" width="100%" height="100%">
      <img src="../../image/user_guide_image/renzheng1.png" width="100%" height="100%">
      <img src="../../image/user_guide_image/renzheng2.png" width="100%" height="100%">
      <h4>4、发布信息</h4>
      <span>菜单身边事地图定位界面，点击右下方按钮可以选择发布身边事、可以查看用户发布的身边事信息</span>
      <img src="../../image/user_guide_image/menu.png" width="100%" height="100%">
      <img src="../../image/user_guide_image/publish.png" width="100%" height="100%">
      <img src="../../image/user_guide_image/myPublish.png" width="100%" height="100%">
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
      back_but: function () {
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  @import "../../style/userGuide.css";
</style>
