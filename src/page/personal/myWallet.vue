<template lang="html">
  <div>
    <mt-header title="我的钱包">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="qianbao_tab" style="border-bottom: 1px solid #e6e6e6; padding:2px 20px; background-color: #FFFFFF">
      <!-- 功能切换面板 -->
      <mt-navbar v-model="selected" class="navbar-plan">
        <mt-tab-item id="qianbao" @click.native="toPage" style="margin-right: 20px;"><i
          class="icon iconfont icon-qianbao"></i>钱包
        </mt-tab-item>
        <mt-tab-item id="daijinquan" @click.native="toPage" style="margin-left: 20px;"><i
          class="icon iconfont icon-btn_daijinquan"></i>代金券
        </mt-tab-item>
      </mt-navbar>
      <div style="clear: both"></div>
    </div>

    <!-- 正文主体 -->
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

  export default{
    data: function () {
      return {
        selected: "qianbao"
      }
    },
    props: [],
    components: {},
    methods: {
      tabClick: function () {
        console.log("00000000000000")
      },
      toPage: function (event) {
        this.$router.push("/" + this.selected);
      }
    }
  }
</script>

<style scoped>

</style>
