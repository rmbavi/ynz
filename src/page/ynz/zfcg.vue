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


    <div class="cg">
      <img src="../../image/dg.png"/>
      <h2>成功支付认领以下产品</h2>
    </div>

    <div class="cp">
      <img :src="head_img"/>
      <div class="cpfont"><h3>{{names}}</h3><h4>购买数量：<span>{{buy_number}}</span> {{danwei}}</h4></div>
      <div class="canvas"><myCanvas></myCanvas></div>
    </div>


  <div class="down">
  <mt-button type="default" class="chakanbtn" @click="toMyNz">查看我的农庄</mt-button>
  </div>

    </div>
</template>

<script>
import myCanvas from '../../components/progress.vue'
  export default{
        data: function () {
            return{
              buy_number:0,
              danwei:"",
              head_img:"",
              names:"",
            }
        },
        mounted(){
          this.buy_number=this.$route.params.buy_number
          this.names=this.$route.params.names
          this.danwei=this.$route.params.danwei
          this.head_img=this.$route.params.head_img
        },
        props: [],
        components: {myCanvas:myCanvas},
        methods: {
          toMyNz(){
            this.$router.replace('/myNz')
          }
        }
    }
</script>

<style lang="css" scoped>
.zftop{
  margin: 0 auto;
  width: 270px;
  height: 250px;
  text-align: center;
  overflow: hidden;
}
.zftop img{
  width:7em;
  margin-top: 30%;
    float: left;
}
.zftop h2{
  float: left;
  margin-top: 40%;
  font-size: 18px;
  color: #45c01a;
}
.zf{
    border-bottom: 1px solid #f7f7f7;
}
.cg{
  width: 100%;
  height: 3em;
  border-bottom: 1px solid #f7f7f7;
}
.cg img{
  width: 2.5em;
  height: 2.5em;
  margin-top: 0.2em;
  float: left;
}
.cg h2{
  margin-top: 1.2em;
  margin-left: 0.5em;
  font-size: 12px;
  color: #45c01a;
  float: left;
  height: 2.5em;
}
.cp{
  width:100%;
  position: relative;
  height: 6em;
  border-bottom: 1px solid #f7f7f7;
}
.cp img{
  margin-left: 0.5em;
  position: absolute;
  left: 0;
  width: 6em;
  height: 6em;
}
.cpfont{
  margin-top: 10px;
  position: absolute;
  left: 6.5em;
  color: #666666;
}
.cpfont h3{
  font-size: 14px;
}
.cpfont h4{
  line-height: 5px;
  font-size: 12px;
}
.cpfont span{
  color: #008ad5;
  font-size: 14px;
}
.chakanbtn{
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #f8b31f;
  background: white;
  border: 1px solid #f8b31f;
}
.down{
  margin: 3em 0.5em 0 0.5em;
  text-align: center;
}
.canvas{
  margin-top: 0.5em;
  position: absolute;
  right: 0;
}
</style>
