<template>
    <div style="overflow: hidden;">

      <mt-header title="付款页面">
        <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
        <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
      </mt-header>
      <div class="all">
        <!--<div class="content_pay">
          <div class="img_sp">
            <img :src="head_img" alt="" height="100" :onerror="default_news_detail">
          </div>
          <div class="content_text">
            <p class="name_sp">{{names}}</p>
            <span class="normal_text" style="margin-left:5px">购买数量</span>
            <span class="number_text">{{buy_number}}</span>
            <span class="normal_text">({{danwei}})</span><br>
            <span class="normal_text" style="margin-left:5px">XX天后成熟</span>
          </div>
          <div class="pro_sp">
            <myCanvas message=50 linecolor=#36b302 value=50 zt=成长中></myCanvas>
          </div>

        </div>-->
        <div style="clear:both"></div>
        <div class="pay_money" style="padding:15px 5px">
          <div class="need_text" style="margin-left:15px">需支付金额</div>
          <div class="number_money" style="float: right;margin-right:10px">￥{{total}}</div>
        </div>
        <div style="clear:both"></div>
        <div class="zhanwei"></div>
          <div class="pay_method">
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

            <div class="methods" v-show="false">
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
          </div>
            <div style="clear:both"></div>
            <div style="position: absolute;bottom:20px;width:100%;text-align:center;">
                <mt-button type="default" class="pay_btn" @click="pay">支付</mt-button>
            </div>
      </div>
      <div v-html="zfbresData" style="position:absolute;bottom:80px;left:0;right:0;top:300px;width:100%;">

      </div>

     <!--//遮掩层-->
      <div class="zheyan" v-show="paying">
            <mt-spinner color="#fff" type="snake" :size="60" style="margin-top:80%;display:inline-block;"></mt-spinner>
      </div>
<!--
        <zheyan class="zheyan" v-show="!paying"></zheyan>-->

    </div>
</template>


<script>
  import {Toast} from 'mint-ui'
  import { Progress } from 'mint-ui';
  import myCanvas from '../../components/progress.vue'
  import selected from '../../image/selected.png'
  import select from '../../image/select.png'
  import {imgBaseUrl,default_news_detail,} from '../../config/env.js'
  import {fanyi} from '../../service/unit.js'
  import {createPay,getStore,objIsNull,checkAccountMoney,pay,createAliPay} from '../../service/getData.js';
  import {zheyan} from '../../components/zheyan.vue'
 
  export default{
        data: function () {
            return{
                value:50,
                select:select,
                selected:selected,
                pay_type:"0",//0代表银行卡 1代表微信 2代表支付宝
                data:[],
                order_ids:"",
                total:"",
                myMonet:"",
                pay_model:"",
                paying:false,
                zfbresData:"",
            }
        },
        mounted(){
            let that=this
            let token=getStore("token")
            that.data=that.$route.params
            console.log("that.data",that.data)
            that.total=that.data.total
            that.order_ids=that.data.order_ids
            that.pay_model=that.data.pay_model
            if(!objIsNull(token)){
                checkAccountMoney(token).then(function(res){
                    console.log("res",res)
                    if(res.errcode=="0"){
                        // that.myMoney=
                    }
                })
            }
            //  const Alipay = require('alipay-node-sdk');
            //  const path = require('path');
            //  console.log()
        },
        props: [],
        components: {
            myCanvas:myCanvas,
            zheyan:zheyan
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
                 console.log("that.pay_type",that.pay_type)
                 that.paying=true
                 if(objIsNull(token)){
                    Toast("登录信息失效,请重新登录!")
                 }else{
                     
                     //创建支付批次
                    createPay(that.order_ids,that.pay_model,that.pay_type,token).then(function(res){
                        console.log("that.order_ids",that.order_ids)
                        console.log("that.pay_model",that.pay_model)
                        console.log("that.pay_type",that.pay_type)
                        console.log("token",token)
                        console.log("createPayres",res)
                        if(res.errcode=="0"){
                            if(that.pay_type=="0"){
                                //0是余额支付
                                // that.$router.replace({name:'paySuccess',params:{buy_number:that.buy_number,names:that.names,head_img:that.head_img,danwei:that.danwei}})
                                pay(res.data.ids,token).then(function(res){
                                    console.log("payres",res)
                                    if (res.errcode=="0") {
                                        Toast("支付成功!")
                                        that.paying=false
                                        that.$router.replace("/paySuccess")
                                    }else{
                                        Toast(res.errmsg)
                                        that.paying=false
                                    }
                                })
                            }else if(that.pay_type=="2"){
                             //2是支付宝支付
                             createAliPay(res.data.ids,token).then(function(res){
                                 console.log("zfbres",res)
                                 if(res.errcode=="0"){
                                     that.zfbredData=res.data
                                     cordova.plugins.alipay.payment(res.data,function success(e){
                                        console.log("successE",e)
                                        that.$router.replace('/paySuccess')
                                     },function error(e){
                                        console.log("errorE",e)
                                        that.$router.replace('/payFailure')
                                        
                                     });
                                 }
                                 that.paying=false
                                 
                             })
                            }else if(that.pay_type=="1"){
                             //1是微信支付
                            }
                        }else{
                            Toast("系统繁忙,请稍后再试!")
                            that.paying=false
                        }
                    })
                   

                 }
             },
            //返回
            backUrl(){
                this.$router.replace("/ynz");
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
