<template>
    <div>
        <div class="topImg">
          <img src="../../image/login_top_bc.png" width="100%" alt="">
        </div>
        <div class="pageTit">
          <span>欢迎登录</span>
        </div>
      <div class="bigInpSty" id="bigInpSty" style="margin-top: 5%">
        <div class="iconSty">
          <i class="iconfont icon-shouji icons"/>
        </div>
        <div class="inputSty">
          <mt-field placeholder="请输入手机号码" type="tel" v-on:click.native="focuse" v-model="phone"/>
        </div>
      </div>

      <div class="bigInpSty" id="bigInpSty2" style="margin-top: 5px">
        <div class="iconSty">
          <i class="iconfont icon-ad80-copy icons" style="vertical-align: sub"/>
        </div>
        <div class="inputSty">
          <mt-field placeholder="请输入验证码" type="tel" v-model="yzm">
            <mt-button type="default" class="btn-yzm" @click.native="getyzmfn">{{yzmLabel}}</mt-button>
          </mt-field>
        </div>
      </div>
      <div class="forgetdiv">
        <span class="forget" @click="toChange">忘记密码 ?</span>
      </div>
      <mt-button type="default" class="sureBtn" @click.native="login">登录</mt-button>
      <div class="nologin">
        <span class="forget" @click="toIndex">暂不登录</span>
      </div>
      <span class="spans" style="">还没有账号?赶紧去注册一个</span>
      <span class="toRegister" @click="toRegister">新用户注册</span>

    </div>
</template>

<script type="text/javascript">
  import { Toast } from 'mint-ui';
  import {getYzm,sendLogin,setStore,getStore,objIsNull} from "../../service/getData.js"
  var absc=""
    export default{
        data: function () {
            return{
              phone:"",
              yzm:"",
              yzmLabel:"获取验证码",
              tipMsg:"",
              geting:true,
              res:""
            }
        },
        mounted:function(){
          let token=getStore("token")
          if (token!=null){
            this.$router.replace("/index")
          }
        },
        props: [],
        components: {},
        methods: {
          focuse:function(){
          },
          focuse2:function(){
          },
          getyzmfn(){
            let that=this
            if (that.geting){
              if (objIsNull(that.phone)){
                that.tipMsg="请输入手机号码"
                that.tip()
                return;
              }
              getYzm(that.phone).then(function(data){
               if (data.errcode!="0"){
                 that.tipMsg="获取验证码失败,请稍后再试!"
                 that.tip()
               }else{
                 that.tipMsg="验证码发送成功,请留意你的手机!"
                 that.tip()
                 absc=setInterval(that.times,1000)
                 that.geting=false
               }
              })
            }else{
              that.tipMsg="请在"+that.yzmLabel+"秒后再获取!"
              that.tip()
            }
          },
          tip(){
            Toast({
              message: this.tipMsg,
            });
          },
          times(){
            let that=this
            if (that.yzmLabel=="获取验证码"){
              this.yzmLabel=60;
              this.yzmLabel=60;
            }else if(that.yzmLabel==1){
              that.yzmLabel="获取验证码"
              clearInterval(absc)
              that.geting=true
            }else{
              that.yzmLabel--
            }
          },
          toRegister(){
            this.$router.replace("/register")
          },
          toIndex(){
            this.$router.replace("/ynz")
          },
          toChange(){
            this.$router.replace("/changePass")
          },
          login(){
            console.log("logining.........................")
            let that=this
            if (objIsNull(that.phone)){
              that.tipMsg="请输入手机号码"
              that.tip()
              return
            }
            if (objIsNull(that.yzm)){
              that.tipMsg="请输入验证码"
              that.tip()
              return
            }
            try{
              let loginRes=sendLogin(that.phone,that.yzm)
              loginRes.then(function(res){
                console.log("loginres",res)
                if(res.errcode=='44005'){
                  that.tipMsg="用户名和密码错误!"
                  that.tip()
                  return;
                }else if(res.errcode=='44006'){
                  that.tipMsg="该手机号没有注册!"
                  that.tip()
                  return;
                }else if (res.errcode=="44003") {
                  that.tipMsg="验证码错误!"
                  that.tip()
                  return;
                }else if (res.errcode!="0") {
                  that.tipMsg="系统繁忙,请稍后再试!"
                  that.tip()
                  return;
                }
                else{
                  setStore("token",res.token)
                  that.$router.replace("/ynz")
                }
              })
            }catch (e){
              that.tipMsg="系统繁忙,请稍后再试!"
              that.tip()
            }

          }

        }
    }
</script>

<style scoped>
@import "../../style/login.css";
</style>
