<template>
  <div style="overflow: hidden">

    <mt-header title="付款页面">
      <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
      <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
    </mt-header>
    <div class="cp">
      <img :src="head_img" :onerror="default_news_detail"/>
      <div class="cpfont"><h3 class="fontset">{{names}}<span>{{number}}(颗)</span></h3><h4>预计收益：{{yield}}</h4></div>
      <div class="canvas">
        <myCanvas message=0 linecolor=#ec6464 value=100 zt=已成熟></myCanvas>
      </div>
    </div>

    <div class="zegai"></div>

    <div class="rulestitle"><h1>代卖规则:</h1></div>

    <div class="rules">
      <ol>
        <li>这里介绍此类产品代卖的详细规则说明</li>
        <li>这里介绍此类产品代卖的详细规则说明</li>
        <li>这里介绍此类产品代卖的详细规则说明</li>
        <li>这里介绍此类产品代卖的详细规则说明</li>
      </ol>
    </div>


    <div class="sellPag_agree">
      <input type="checkbox" id="cbtest" @click="checksel" />
      <span style="font-size: 12px; ">同意《<a href="#">17种田服务协议</a>》</span>
      <mt-button type="default" class="sure_Btn" v-show="!isChecked" @click="getSell">托管代卖</mt-button>
       <mt-button type="default" class="sure_Btn" disabled v-show="isChecked">托管代卖</mt-button>
    </div>
</div>
</template>

<script>
  import {imgBaseUrl,default_news_detail,big_default_news_detail} from '../../config/env.js'
  import myCanvas from '../../components/progress.vue'
  import {createSell,getStore,objIsNull,spDetail} from '../../service/getData.js'
  import {Toast} from 'mint-ui'

  export default{
    data: function () {
      return {
        data:[],
        value: [],
        harves_modes:"",
        ids:"",
        token:"",
        head_img:"",
        number:"",
        names:"",
        isChecked:true,
        spdanwei:"",
        default_news_detail:default_news_detail,
        yield:"未知",
        commodity_ids:"",
      }
    },
    mounted(){
      let that=this
      that.data=that.$route.params
      console.log("that.data",that.data)
      that.ids=that.data.ids
      that.harves_modes=that.data.harves_modes
      that.head_img=that.data.head_img
      that.number=that.data.number
      that.names=that.data.names
      that.spdanwei=that.data.danwei
      that.commodity_ids=that.data.commodity_ids
      that.token=getStore("token")
      if(!objIsNull(that.token)){
        spDetail(that.commodity_ids,that.token).then(function(res){
          console.log("sp-res",res)
            if(!objIsNull(res.data.yield)){
              that.yield=res.data.yield/100+"%"
            }
          })
      }
    },
    props: [],
    components: {myCanvas: myCanvas},
    methods: {
      getSell(){
        let that=this
        createSell(that.ids,that.harves_modes,that.token).then(function(res){
          console.log("Sell--res",res)
          if(res.errcode=="0"){
            that.$router.push("/ynzdmcg")
          }else{
            Toast("系统繁忙,请稍后再试!")
          }
        })
      },
      checksel(){
        this.isChecked=!this.isChecked
      },
      backUrl(){
        if (!objIsNull(this.$route.params.ids)){
          this.$router.replace({name:"ripe",params:{ids:this.$route.params.ids}});
        }else {
          this.$router.go(-1)
        }

      }

    }
  }
</script>

<style lang="css" scoped>
  @import '../../style/ynzSellPage.css';
  input[type="checkbox"]{
    position: relative;
    top: 0px;
    left: 0px;
    height: 20px;
    width: 20px;
    margin: 0px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 2px;
    background-color: #ffc107;
    border: 1px solid #ffc107;
  }
</style>
