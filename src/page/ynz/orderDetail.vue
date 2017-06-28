<template>
    <div style="overflow: hidden;">

      <mt-header title="付款页面">
        <router-link to="/ynz" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
      </mt-header>
      <div class="all">
        <div class="content_pay">
          <div class="img_sp">
            <img :src="head_img" alt="" height="100" :onerror="default_news_detail">
          </div>
          <div class="content_text">
            <p class="name_sp">{{names}}</p>
            <span class="normal_text" style="margin-left:5px">购买数量</span>
            <span class="number_text">{{buy_number}}</span>
            <span class="normal_text">({{unit}})</span><br>
            <span class="normal_text" style="margin-left:5px">XX天后成熟</span>
          </div>
          <div class="pro_sp">
            <myCanvas message=50 linecolor=#36b302 value=50 zt=成长中></myCanvas>
          </div>

        </div>
        <div style="clear:both"></div>
        <div class="pay_money" style="padding:15px 5px">
          <div class="need_text" style="margin-left:15px">需支付金额</div>
          <div class="number_money" style="float: right;margin-right:10px">￥{{pay_number}}</div>
        </div>
        <div style="clear:both"></div>
        <div class="zhanwei"></div>
          <!--<div class="pay_method">
            <div class="method_text">
                <img src="../../image/pay_payicon.png" width="50" alt="" >
                <span>支付方式</span>
            </div>

            <div class="methods">
                <div class="method1">
                    <img src="../../image/yhk.png" width="50" alt="" >
                </div>
                <div class="method1">
                    <span class="ZFtextSty">钱包余额支付</span><br>
                    <span class="ZFintroduce">使用钱包支付,快速便捷</span>
                </div>
                <div class="method1" style="float:right">
                    <img :src="select" width="35" height="35" class="types yhk" @click="selecteda('yhk')">
                </div>
            </div>
          <div style="clear:both"></div>
            <div class="methods">
                <div class="method1">
                    <img src="../../image/wx.png" width="50" alt="">
                </div>
                <div class="method1 bigIcon">
                    <span class="ZFtextSty">微信支付</span><br>
                    <span class="ZFintroduce">使用微信支付,安全便捷</span>
                </div>
                <div class="method1 bigIcon" style="float:right">
                    <img :src="select" width="35" height="35" class="types wx" @click="selecteda('wx')">
                </div>
            </div>
          <div style="clear:both"></div>

            <div class="methods">
                <div class="method1">
                    <img src="../../image/zfb.png" width="50" alt="">
                </div>
                <div class="method1 bigIcon">
                    <span class="ZFtextSty">支付宝支付</span><br>
                    <span class="ZFintroduce">支持有支付宝,网银的用户使用</span>
                </div>
                <div class="method1 bigIcon" style="float:right" >
                    <img :src="select" width="35" height="35" class="types zfb" @click="selecteda('zfb')">
                </div>
            </div>
          </div>-->
            <div style="clear:both"></div>
          
            <!--<div class="zhanwei"></div>            -->
            <div style="position: relative;top:20px;width:100%;text-align:center;height:70px">
                <mt-button type="danger"style="width:90%;mergin-left:5%;font-size:16px" @click="pay">确定订单</mt-button>
            </div>
      </div>

      <!--遮掩层-->
      <div class="zheyan" v-show="loadingon">
            <mt-spinner type="fading-circle" :size="60" style="margin-top:50%;display:inline-block;"></mt-spinner>
      </div>

    </div>
</template>


<script>
  import { Spinner } from 'mint-ui';
  import {Toast} from 'mint-ui'
  import { Progress } from 'mint-ui';
  import myCanvas from '../../components/progress.vue'
  import selected from '../../image/selected.png'
  import select from '../../image/select.png'
  import {imgBaseUrl,default_news_detail,} from '../../config/env.js'
  import {fanyi} from '../../service/unit.js'
  import {createPay,getStore,objIsNull,createOrder} from '../../service/getData.js'
  export default{
        data: function () {
            return{
                value:50,
                select:select,
                selected:selected,
                pay_type:"0",//0代表银行卡 1代表微信 2代表支付宝
                buy_number:0, //购买数量
                names:"", //商品名称
                danwei:"", //商品单位
                pay_number:0, //支付的金额
                head_img:"",
                order_ids:"",
                message:50, //进度条 (100-message)%
                data:[],
                default_news_detail:default_news_detail,
                unit:"",
                commodityIds:"",//商品ids
                loadingon:false
            }
        },
        mounted(){
            let that=this
            that.loadingon=true
            that.data=that.$route.params
            that.names=that.data.names
            that.head_img=that.data.head_img
            that.buy_number=that.data.buy_number
            that.pay_number=that.data.total 
            that.unit=that.data.unit
            that.commodityIds=that.data.commodityIds
            that.loadingon=false
        },
        props: [],
        components: {
            myCanvas:myCanvas
        },
        methods :{
             selecteda:function(type){
                 console.log("type",type)
                 if(type=='wx'){
                     this.pay_type="1"
                     document.getElementsByClassName("wx")[0].setAttribute("src",this.selected)
                     document.getElementsByClassName("yhk")[0].setAttribute("src",this.select)
                     document.getElementsByClassName("zfb")[0].setAttribute("src",this.select)
                 }else if(type=='yhk'){
                     this.pay_type="0"
                     document.getElementsByClassName("yhk")[0].setAttribute("src",this.selected)
                     document.getElementsByClassName("wx")[0].setAttribute("src",this.select)
                     document.getElementsByClassName("zfb")[0].setAttribute("src",this.select)
                 }else if(type=='zfb'){
                     this.pay_type="2"
                     document.getElementsByClassName("zfb")[0].setAttribute("src",this.selected)
                     document.getElementsByClassName("yhk")[0].setAttribute("src",this.select)
                     document.getElementsByClassName("wx")[0].setAttribute("src",this.select)
                 }
             },
             getDanWei(util){
                 console.log("util",util)
                 let that=this
                 that.danwei=fanyi(util)
                 console.log("danwei",this.danwei)
             },
             pay(){
                 let that=this
                 let token=getStore("token")
                 if(objIsNull(token)){
                    Toast("登录信息失效,请重新登录!")
                    return
                 }
                 that.loadingon=true
                createOrder(that.commodityIds,that.buy_number+"",token).then(function(res){
                  console.log("orderRes",res)
                  if(res.errcode=="0"){
                    that.$router.replace({name:'pay',params:{order_ids:res.data.ids,total:that.pay_number,pay_model:"1"}})
                    that.loadingon=false
                  }else{
                    Toast("系统繁忙,请稍后再试!")
                    that.loadingon=false
                  }
                })


                    // createPay(that.order_ids,"1",that.pay_type,token).then(function(res){
                    //         if(res.errcode=="0"){
                    //             that.$router.replace({name:'paySuccess',params:{buy_number:that.buy_number,names:that.names,head_img:that.head_img,danwei:that.danwei}})
                    //         }else{
                    //             Toast("系统繁忙,请稍后再试!")
                    //         }
                    // })
             }
        }
    }
</script>

<style lang="css" scoped>
    @import '../../style/pay.css';
    .zheyan{
        width:100%;
        height:100%;
        margin:0 auto;
        position:absolute;
        top:0px;
        background-color:#000;
        opacity:0.3;
        text-align:center;
    }
</style>
