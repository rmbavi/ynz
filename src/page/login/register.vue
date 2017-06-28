<template>
  <div>
    <div class="topImg">
      <img src="../../image/login_top_bc.png" width="100%" alt="">
    </div>
    <div class="pageTit">
      <span>注册</span>
    </div>
    <div class="bigInpSty" id="bigInpSty" style="margin-top: 3%">
      <div class="iconSty">
        <i class="icon iconfont icon-shouji icons"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入手机号码" type="tel" v-model="phone"/>
      </div>
    </div>

    <div class="bigInpSty" id="bigInpSty2">
      <div class="iconSty">
        <i class="icon iconfont icon-ad80-copy icons" style="vertical-align: sub"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入验证码" type="tel" v-model="yzm">
          <mt-button type="default" class="btn-yzm" @click.native="getyzm">{{yzmLabel}}</mt-button>
        </mt-field>
      </div>
    </div>

    <div class="bigInpSty" id="bigInpSty3">
      <div class="iconSty">
        <i class="icon iconfont icon-suo icons"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入密码" type="password" v-model="password"/>
      </div>
    </div>
    <mt-button type="default" style="margin-top: 15px;" class="sureBtn" @click.native="register">注册</mt-button>

    <span class="spans">已有账号,赶紧去登录</span>
    <span type="default" class="toRegister" @click="toLogin">我要登录</span>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {getYzm, register, objIsNull} from "../../service/getData.js"
  var absc = ""
  export default{
    data: function () {
      return {
        phone: "",
        yzm: "",
        yzmLabel: "获取验证码",
        tipMsg: "",
        geting: true,
        password: ''
      }
    },
    props: [],
    components: {},
    methods: {
      getyzm(){
        let that = this
        if (!that.geting) {
          that.tipMsg = "请在" + that.yzmLabel + "秒后再获取!"
          that.tip()
          return;
        }

        if (objIsNull(that.phone)) {
          that.tipMsg = "请输入手机号码"
          that.tip()
          return;
        }

        try {
          let result = getYzm(this.phone)
          result.then(function (res) {
            if (res.errcode == "44004") {
              that.tipMsg = "此号码已被注册!"
              that.tip();
            } else if (res.errcode == "0") {
              that.tipMsg = "验证码发送成功!"
              that.tip()
              that.times()
              absc = setInterval(that.times, 1000)
              that.geting = false
            } else {
              that.tipMsg = "获取验证码失败,请稍后再试！"
              that.tip()
            }
          })
        } catch (e) {
          that.tipMsg = "系统繁忙,请稍后再试!"
          that.tip()
        }
      },
      tip(){
        Toast({
          message: this.tipMsg,
        });
      },
      times(){
        let that = this
        if (that.yzmLabel == "获取验证码") {
          this.yzmLabel = 60;
        } else if (that.yzmLabel == 1) {
          that.yzmLabel = "获取验证码"
          clearInterval(absc)
          that.geting = true
        } else {
          that.yzmLabel--
        }
      },
      toLogin(){
        this.$router.replace("/login")
      },
      register(){
        let that = this
        if (objIsNull(that.phone)) {
          that.tipMsg = "请输入手机号码!"
          that.tip()
          return
        }
        if (objIsNull(that.yzm)) {
          that.tipMsg = "请输入验证码!"
          that.tip()
          return
        }
        if (objIsNull(that.password)) {
          that.tipMsg = "请输入密码!"
          that.tip()
          return
        }

        let registerRes = register(that.phone, that.yzm, that.password)
        registerRes.then(function (res) {
          if(res.errcode =="44004"){
            that.tipMsg = "该手机号已被注册!"
            that.tip()
            return
          } else  if (res.errcode != "0") {
            that.tipMsg = "系统繁忙,请稍后再试!"
            that.tip()
            console.log("res", res)
          } else {
            that.tipMsg = "登录成功,请登录使用!"
            that.tip()
            that.$router.replace("/login")
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../style/login.css";
</style>
