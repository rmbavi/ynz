<template>
    <div>
      <mt-header title="支付失败">
        <router-link to="/myNz" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
      </mt-header>


    <div class="zf">
    <div class="zftop">
      <img src="../../image/payFailure_fail.png">
      <h2>支付失败！<br>Payment failure</h2>
    </div>
    </div>

  <div class="down">
  <mt-button type="default" class="chakanbtn" @ckick="returnMyNz">返回我的农庄</mt-button>
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
          returnMyNz(){
            this.$router.replace("/payFailure")
          }
        }
    }
</script>

<style lang="css" scoped>
@import "../../style/payFailure.css";
</style>
