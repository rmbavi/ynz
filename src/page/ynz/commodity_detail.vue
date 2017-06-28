<template>
    <div>
      <mt-header fixed title="详情">
        <router-link to="/ynz" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
      </mt-header>

      <div style="background-color: #eeeeee; height: 4px;margin-top: 46px"></div>
      <div v-show="!loadingon">
      <div style="padding: 10px " >
        <div style="float: left; width: 150px;">
          <img :src="detailImg(detail.head_img)" width="100%" height="150" :onerror="default_news_detail">
        </div>
        <div class="train_cp_content">
          <div class="train_cp_content_title">{{detail.names}}</div>
          <div>价格：<span class="train_cp_content_number">{{price}}</span> 元/{{unit}}</div>
          <div>成果收集：{{fanyi(detail.harves_modes)}}</div>
          <div>代卖收益率：{{yield}} %</div>
          <div>培育时间：{{detail.train_time}}天</div>
        </div>
        <div style="clear: both"></div>
      </div>
      <div>
        <mt-cell title="选择数量">
          <div class="input-number_box">
            <span class="input-number-decrement" style="border-radius:5px 0px 0px 5px" @click="reduce_buyNumber">–</span>
            <input class="input-number" type="text" min="1" max="10" v-model="buy_number">
            <span class="input-number-increment"  style="border-radius:0px 5px 5px 0px" @click="add_buyNumber">+</span>
          </div>
        </mt-cell>
      </div>
      <div class="total_money">
        <mt-cell title="总价">
          <span style="font-size: 14px; color: #ec6464; margin-right: 10px">￥ {{total}}</span>
        </mt-cell>
      </div>
      <div style="padding: 10px; padding-top: 15px">
        <input type="checkbox" id="cbtest" style="" checked="ischeck" @click="changeCheck"/>
        <span style="font-size: 12px; ">同意《<a href="#">17种田服务协议</a>》</span>
        <mt-button type="default" class="sureBuyBtn" v-show="!ischeck" @click="topay">下单支付</mt-button>
        <mt-button type="default" class="sureBuyBtn" disabled v-show="ischeck">下单支付</mt-button>
      </div>

      <div style="background-color: #eeeeee; height: 4px"></div>
      <div class="content_title">产品详细介绍</div>
      <div class="pl_content_text" style="padding: 10px; font-size: 12px" v-html="detail.details">
        <!--{{detail.details}}-->
      </div>
      </div>
      <!--<mt-checklist v-model="checkValue" :options="options" value="[0,1]"></mt-checklist>-->
      <div v-show="loadingon">
            <load></load>
        </div>
    </div>
</template>

<script>
import {getStore,objIsNull,spDetail,createOrder} from "../../service/getData.js"
import {imgBaseUrl,default_news_detail} from '../../config/env.js'
import {Toast} from 'mint-ui'
import {fanyi} from '../../service/unit.js'
import  load from '../../components/load.vue'
import {monitorReturn} from '../../service/monitor'

  export default{
        data: function () {
            return{
              ids:"",
              detail:[],
              price:0.00,
              yield:0.00,
              buy_number:1,
              ischeck:false,
              total:0.00,
              names:"",
              head_img:"",
              default_news_detail:default_news_detail,
              unit:"",
              loadingon:true,
              csTime:"",
            }
        },
        mounted(){
          monitorReturn(false,"ynz")
          let that=this
          that.ids=that.$route.params.ids
          console.log("ids",that.ids)
          if(!objIsNull(that.ids)){
              let token = getStore("token")
              console.log("token",token)
              spDetail(that.ids,token).then(function(res){
                console.log("spDetail-res",res)
                if(res.errcode=="0"){
                  that.detail=res.data
                  that.price=(parseFloat(that.detail.price)/100).toFixed(2)
                  that.yield=(parseFloat(that.detail.yield)/100).toFixed(2)
                  that.total=parseFloat(that.price*that.buy_number).toFixed(2)
                  that.names=that.detail.names
                  that.fanyiUnit(that.detail.unit)
                  that.csTime=that.matureTime(that.detail.create_time)
                  that.loadingon=false
                }else{
                  Toast("系统繁忙,请稍后再试!")
                  that.loadingon=false
                }
              })
          }
        },
        props: [],
        components: {
          load: load
        },
        methods: {
          detailImg(url){
            this.head_img=(imgBaseUrl+url)
            return imgBaseUrl+url
          },
          add_buyNumber(){
            console.log(this.buy_number+"buy_number--------")

            this.buy_number+=1
            this.total=parseFloat(this.price*this.buy_number).toFixed(2)
          },
          reduce_buyNumber(){
            if(this.buy_number>1){
              this.buy_number-=1
              this.total=this.price*this.buy_number
            }
          },
          changeCheck(){
            this.ischeck=!this.ischeck
          },
          topay(){
            let that=this
            let token=getStore("token")
           
            if(that.buy_number>0){
              // createOrder(that.ids,that.buy_number+"",token).then(function(res){
              //   console.log("orderRes",res)
              //   if(res.errcode=="0"){
              //   }
              // })
              that.$router.replace({name:"orderDetail",params:{buy_number:that.buy_number,total:that.total,names:that.names,head_img:that.head_img,
                commodityIds:that.ids,unit:that.unit,csTime:that.csTime}})
            }else{
              Toast("购买数量小于1")
            }  
        },

          fanyi(mode){
            if(mode=="1"){
              return "收货"
            }else if(mode=="2"){
              return "代卖"
            }else{
              return "收货,代卖"
            }
          },
          fanyiUnit(unitss){
             this.unit=fanyi(unitss)
          },
          matureTime(time){
                let data1=new Date().getTime();
                let timestamp2 = Date.parse(new Date(time));
                let date3=data1-timestamp2
                let days=Math.floor(date3/(24*3600*1000))
                return 100-days
            }
        }
    }
</script>

<style lang="css" scoped>
  @import "../../style/inputNumber.css";
  .check-box{
    border: 1px solid;
    height: 20px;
    width:20px;
    /*position: relative;*/
    display: inline-block;
  }
  input[type="checkbox"]{
    position: relative;
    left: 0px;
    top: 0px;
    height: 20px;
    width: 20px;
    margin: 0px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 2px;
    background-color: #ffc107;
    border: 1px solid #ffc107;
  }
  .content_title{
    color: #f8b31f; font-size: 12px; padding: 10px 10px;
    border-top: 1px solid #f5f5f5; border-bottom: 1px solid #f5f5f5
  }
  .sureBuyBtn{
    width: 100%;
    background-color: #f8b31f;
    color:#ffffff;
    font-size: 14px;
    margin-top: 10px;
  }

</style>
