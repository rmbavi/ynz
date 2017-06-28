<template>
  <div>
    <div id="head-box">
      <mt-header title="修改密码">
        <router-link to="/login" slot="left">
          <mt-button icon="back"> 返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="topImg">
      <img src="../../image/login_top_bc.png" width="100%" alt="">
    </div>
    <div class="pageTit">
      <span>修改密码</span>
    </div>
    <div class="bigInpSty" id="bigInpSty" style="margin-top: 5px">
      <div class="iconSty">
        <i class="icon iconfont icon-mobile icons"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入手机号码" type="tel" v-model="phone"/>
      </div>
    </div>

    <div class="bigInpSty" id="bigInpSty2">
      <div class="iconSty">
        <i class="icon iconfont icon-password icons"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入验证码" type="tel" v-model="yzm">
          <mt-button type="default" class="btn-yzm" @click.native="getYzm">{{yzmLabel}}</mt-button>
        </mt-field>
      </div>
    </div>

    <div class="bigInpSty" id="bigInpSty3">
      <div class="iconSty">
        <i class="icon iconfont icon-yaoshi icons"/>
      </div>
      <div class="inputSty">
        <mt-field placeholder="请输入密码" type="password" v-model="password"/>
      </div>
    </div>

    <mt-button type="default" class="sureBtn" @click.native="change" style="margin-top: 30px">修改</mt-button>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import {getYzm, change, removeStore, objIsNull} from "../../service/getData.js"
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
      getYzm(){
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
            if (res.errcode != "0") {
              that.tipMsg = "获取验证码失败，请稍后再试!"
              that.tip();
              return;
            }

            that.tipMsg = "验证码发送成功!"
            that.tip()
            absc = setInterval(that.times, 1000)
            that.geting = false
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
          that.times()
          clearInterval(absc)
          that.geting = true
        } else {
          that.yzmLabel--
        }
      },
      toLogin(){
        this.$router.replace("/login")
      },
      change: function () {
        let that = this
        if (objIsNull(that.phone)) {
          that.tipMsg = "请输入手机号码!"
          that.tip()
          return
        }
        if (objIsNull(that.yzm)) {
          that.tipMsg = "请输入验证码"
          that.tip()
          return
        }
        if (objIsNull(that.password)) {
          that.tipMsg = "请输入新密码"
          that.tip()
          return
        }
        let result = change(that.phone, that.yzm, that.password)
        result.then(function (res) {
          if (res.errcode != "0") {
            that.tipMsg = "系统繁忙,请稍后再试!"
            that.tip()
            return;
          }

          that.tipMsg = "修改成功,请重新登录!"
          that.tip()
          removeStore("token")
          that.$router.replace("/login")
        })
      },
    }
  }
</script>

<style scoped>
  @import "../../style/login.css";
</style>
