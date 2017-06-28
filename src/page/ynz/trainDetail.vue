<template>
    <div>
      <mt-header fixed title="养山羊">
        <router-link to="/myNz" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
      <div style="background-color: #eeeeee; height: 4px;margin-top: 46px"></div>
      <div style="padding: 10px  ;border-bottom: 1px solid #ececec">
        <div style="float: left; width: 150px;">
          <img :src="head_img" width="100%" height="150" :onerror="big_default_news_detail">
        </div>
        <div  class="train_cp_content">
          <div class="train_cp_content_title" >{{names}}</div>
          <div>数量：<span class="train_cp_content_number">{{datas.number}}</span>{{danwei(datas.unit)}}</div>
          <div>成果收集：{{harves_modes}}</div>
          <div>代卖收益率：{{yield}}%</div>
          <div>培育时间：{{train_time}} 日</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div>
        <div class="train_progress">
          培养进度( <span style="font-size: 14px;color: #45c01a">90</span>%)
          <mt-progress :value="90" :bar-height="20"></mt-progress>
        </div>
        <div class="train_but">
          <mt-button size="large">培育中</mt-button>
        </div>
      </div>
      <div class="train_detail">
        产品详细介绍
      </div>
      <div class="train_detail_content" v-html="details">
      </div>
    </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  import { Progress } from 'mint-ui';
  import {objIsNull,getStore,getOrderInfo} from '../../service/getData.js'
  import {fanyi} from '../../service/unit.js'
  import {imgBaseUrl,default_news_detail,big_default_news_detail} from '../../config/env.js'

    export default{
        data: function () {
          return{
            ids:"",
            token:"",
            datas:[],
            yield:0.00,
            head_img:"",
            names:"",
            harves_modes:"",
            train_time:"",
            details:"",
            daimai:false,
            shiwu:false,
            big_default_news_detail:big_default_news_detail,
          }
        },
        mounted(){
          let that=this
          that.ids=that.$route.params.ids
          console.log("ids",that.ids)
          that.token=getStore("token")
          if(!objIsNull(that.token)&&!objIsNull(that.ids)){
            that.getOrderInfoDetail()
          }
        },
        props: [],
        components: {},
        methods: {
          getOrderInfoDetail(){
            let that=this

            getOrderInfo(that.ids,that.token).then(function(res){
              console.log("token",that.token)
              console.log("---res---",res)
              if(res.errcode=="0"){
                  that.datas=res.data
                  that.yield=parseFloat(res.data.commodity.yield/100).toFixed(2)
                  that.head_img=imgBaseUrl+res.data.commodity.imgs
                  that.names=res.data.commodity.names
                  that.harves_modes=res.data.commodity.harves_modes
                  that.train_time=res.data.commodity.train_time
                  that.details=res.data.commodity.details
                  let harves_modes=res.data.commodity.harves_modes
                  if(harves_modes=="1"){
                    that.shiwu=true
                  }else if(harves_modes=="2"){
                    that.daimai=true
                  }else{
                    that.shiwu=true
                    that.daimai=true
                  }
              }else{
                Toast("系统繁忙,请稍后再试!")
              }
            })
          },
          danwei(unit){
            return fanyi(unit)
          },
          getImg(url){
            return imgBaseUrl+url
          }
        }
    }
</script>

<style>
  @import "../../style/trainDetail.css";
</style>
