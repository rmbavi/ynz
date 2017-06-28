<template>
  <div style="overflow: hidden">
    <mt-header fixed title="提交订单">
      <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
      <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
    </mt-header>



    <div style="margin-top: 50px"></div>

    <div class="selectAddress" @click="selectAddress" v-if="defaultAddress==null">
      <p>选择收货地址</p>
      <i class="iconfont icon-right"></i>
    </div>
    <!--<div class="manageAddress">-->
      <!--<p>管理收货地址</p>-->
    <!--</div>-->
    <div style="position: relative;" v-else>
      <div class="submit_address" @click="selectAddress">
        <div class="submit_left">
          <div class="left_icon">
          <i class="iconfont icon-dizhi1"></i>
          </div>
        </div>
        <div class="submit_mid">
          <div class="mid_Top">
            <span class="top_left">收货人: {{defaultAddress.names}}</span>
            <span class="top_right">{{defaultAddress.phone}}</span>
          </div>
          <div class="mid_Dow">
            <div class="dow_font_syk">
              <p class="dow_font">{{defaultAddress.province_name}} {{defaultAddress.city_name}} {{defaultAddress.detailed}}</p>
            </div>

        </div>
        </div>
        <div class="submit_right">
          <div class="right_icon">
          <i class="iconfont icon-right"></i>
          </div>
        </div>
      </div>
        <img src="../../image/downline.png" style="height:5px;width:100%;" />
    </div>

    <div style="height:20px;width:100%;background:#f7f7f7;"></div>


    <div class="cp">
      <img src="../../image/sy.jpg" :onerror="default_news_detail"/>
      <!--<div class="cpfont"><h3 class="fontset"><span>10(颗)</span></h3><h4>预计收益：300斤核桃</h4></div>-->
      <!--<img src="../../image/sy.jpg"/>-->
      <div class="cpfont"><h3 class="fontset">{{names}}  <span>{{number}}({{spdanwei}})</span></h3><h4>预计收益：{{shou_huo_yield}}</h4></div>
      <div class="canvas" style=" right: -8px">
        <myCanvas message=0 linecolor=#ec6464 value=100 zt=已成熟></myCanvas>
      </div>
    </div>


      <div class="sjfy2">
        <h1>收集费用(单位:元)</h1>
      </div>
      <div class="glfy" v-for="(feesItem,index) in feesItemList">
        <h1>{{feesItem.item_name}}</h1>
        <h2>{{returnFloatMonry(feesItem.cost)}}</h2>
      </div>


      <div class="zjfy">
        <h1>总计费用:</h1>
        <h2>¥ {{returnFloatMonry(total)}}</h2>
      </div>

      <div class="downbtn">
        <mt-button type="primary" class="chakanbtn" @click="getSell">提交订单</mt-button>
      </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {imgBaseUrl,default_news_detail,big_default_news_detail} from '../../config/env.js'
  import myCanvas from '../../components/progress.vue'
  import {getStore,getFeesItem,objIsNull,createSell,getTop,spDetail} from '../../service/getData.js'
  export default{
    data: function () {
      return {
        data:[],
        default_news_detail:default_news_detail,
        value: [],
        harves_modes:"",
        ids:"", //订单ids
        token:"",
        head_img:"",
        number:"",
        names:"",
        isChecked:true,
        spdanwei:"",
        commodity_ids:"", //商品的ids
        feesItemList:[],
        total:0,
        defaultAddress:[],
        shou_huo_yield:"未知"
//        is_default:
      }
    },
    mounted(){
      let that=this
      console.log("that.$route.params",that.$route.params)
      that.data=that.$route.params
      that.ids=that.data.ids
      that.commodity_ids=that.data.commodity_ids
      that.harves_modes=that.data.harves_modes
      that.head_img=that.data.head_img
      that.number=that.data.number
      that.names=that.data.names
      that.spdanwei=that.data.danwei
      that.token=getStore("token")
      console.log("that.commodity_ids",that.commodity_ids)
      console.log("that.token",that.token)
      if(!objIsNull(that.token)&&!objIsNull(that.commodity_ids)){
        that.shiwu()
        spDetail(that.commodity_ids,that.token).then(function(res){
          console.log("sp-res",res)
          if(!objIsNull(res.data.shou_huo_yield)){
            that.shou_huo_yield=res.data.shou_huo_yield
          }
        })
      }
      getTop(that.token).then(function(res){
           console.log("defaultAddressRes",res)
          if(res.errcode=="0"){
              that.defaultAddress=res.data
           }
        })
    },
    props: [],
    components: {myCanvas: myCanvas},
    methods: {
      shiwu(){
        let that=this
        console.log("that.commodity_ids",that.commodity_ids)
        console.log("that.token",that.token)
        getFeesItem(that.commodity_ids,"1",that.token).then(function(res){
            console.log("----res",res)
            if(res.errcode=="0"){
              that.feesItemList=res.feesItemList
              for(let i=0;i<that.feesItemList.length;i++){
                that.total+=that.feesItemList[i].cost
              }
            }
        })
      },
      returnFloatMonry(mon){
        return parseFloat(mon/100).toFixed(2)
      },
      getSell(){
        let that=this
        createSell(that.ids,that.harves_modes,that.token).then(function(res){
          console.log("Sell--res",res)
          if(res.errcode=="0"){
            that.$router.replace({name:'pay',params:{order_ids:res.data.ids,total:parseFloat(that.total/100).toFixed(2)+"",pay_model:"2"}})
            // that.$router.replace("/myNz")
          }else{
            Toast("系统繁忙,请稍后再试!")
          }
        })
      },
      selectAddress(){
        console.log("this.$route.params",this.$route.params)
        this.$router.replace( {name:"selectShouHuoAddress",params:{tiJiaoCommodity:this.$route.params}})
      },
      //返回
      backUrl(){
        if (!objIsNull(this.$route.params.ids)){
          this.$router.replace({name:"ripe",params:{ids:this.$route.params.ids,commodity_ids:this.$route.params.commodity_ids}});
        }else {
          this.$router.go(-1)
        }

      }
    }
  }
</script>

<style lang="css" scoped>
  @import "../../style/ynzssw.css";
  @import "../../style/addressList.css";
</style>
