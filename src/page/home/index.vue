<template lang="html">
  <div>
    <!-- 头部导航 -->
    <div id="head-box">
      <mt-header  title="云农庄">
        <mt-button slot="left" @click.native="toMenu">
          <i class="iconfont icon-personal" style="font-size:20px;"></i>
        </mt-button>
        <!--<mt-button slot="right" @click.native="toMsg">
          <i class="iconfont icon-iconfontfoot02copy" style="font-size:20px;"></i>
        </mt-button>-->
      </mt-header>
      <!--<div @click="toManua" class="mint-header-title" style="position:absolute;top:0px;left:20%;width:60%;text-align:center;color:#fff;font-size:14px;height: 46px;line-height:46px">
          {{addressPosition}}
        </div>-->
    </div>
    <!-- 功能切换面板 -->
    <!--<mt-navbar v-model="selected" class="navbar-plan">
      <mt-tab-item id="shenbian" @click.native="toPage">身边事</mt-tab-item>
      <mt-tab-item id="nongjiale" @click.native="toPage">农家乐</mt-tab-item>
      <mt-tab-item id="ynz" @click.native="toPage">云农庄</mt-tab-item>
      <mt-tab-item id="banshi" @click.native="toPage">办事</mt-tab-item>
      <mt-tab-item id="huiyang" @click.native="toPage">慧种慧养</mt-tab-item>
    </mt-navbar>-->
    <!-- 正文主体 -->
    <div id="index-main" style="top:45px">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="left" class="leftMenu">
      <div id="menuleft">
        <div id="menu_user_into">
          <div id="edit_info">
            <i icon="picture_in_picture" />
          </div>
          <div id="user_head_img" style="padding-top:30px; padding-left:20px;">
            <div class="head_img">
              <img :src="imgUrl" width="60" height="60" alt="" @click="toPersonal" :onerror="defaultHeader"/>
            </div>
            <div class="head_user" style="padding-top:25px; padding-left:78px">
              <span style="display: inline-block;margin-bottom: -2px;top: 2px;margin-left: 2px">{{name}}</span><br>
              <!--<i class="icon iconfont icon-dizhi" style="color: #999999;font-size:18px; vertical-align: top; " />
              <span @click="toSelectAddress" style="position: relative;left: -2px;top: 0px;font-size: 12px;color: #66501d;">{{address}}</span>-->
            </div>
            <div class="edit_box" @click="toEditDatum">
              <i class="icon iconfont icon-23" style="font-size: 20px;position: relative;top: 3px;left: 1px;color: #f8b31f;"></i>
            </div>
          </div>
        </div>
        <div style="" id="menu_box">
          <ul>
            <!--<li @click="toOrder" style="color: #c5c5c5;"><i class="icon iconfont icon-dingdan"></i>我的订单</li>
            <li @click="toMyWallet"><i class="icon iconfont icon-qianbao"></i>我的钱包</li>-->
            <li @click="nz"><i class="icon iconfont icon-999999"></i>我的农庄</li>
            <li @click="shezhi"><i class="icon iconfont icon-shezhi" style="font-size: 17px"></i> 系统设置</li>
            <li @click="toKefu"><i class="icon iconfont icon-kefu" style="font-size: 16px"></i> 客服服务</li>
            <li @click="tuichu"><i class="icon iconfont icon-tuichu"></i>退出登录</li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {setStore,getStore,removeStore,objIsNull,getCustomer} from "../../service/getData.js"
import service from '../../config/service.js'
import {imgBaseUrl,defaultHeader} from '../../config/env.js'

let menuArray=["/shenbian","/nongjiale","/ynz","/banshi","/huiyang"]

export default {
  data() {
    return {
      transitionName:"",
      selected: "shenbian",
      popupVisible:false,
      name:'',
      address:"定位中",
      imgUrl:'',
      cityName:"定位中",
      defaultHeader:defaultHeader
    }
  },
  mounted:function(){
    let that=this
//    that.address=this.$store.state.addressInfo.city+""+this.$store.state.addressInfo.district
    let token=getStore("token")
    let customer=getStore("customer")
    if (objIsNull(token)){
        return;
    }

    if (customer==null){
      getCustomer(token).then(function(res){
        if (res.errcode!="0"){
          Toast("获取用户信息失败!")
        }else{
          setStore("customer",res.data)
          if (objIsNull(res.data.province_name) || objIsNull(res.data.city_name)){
            that.address="请完善个人信息"
          }else{
            that.address=res.data.province_name+" "+res.data.city_name
          }
          if (!objIsNull(res.data.nickname)){
            that.name=res.data.nickname
          }else{
            that.name=res.data.number+""
          }
          if(!objIsNull(res.data.head_image)){
            that.imgUrl=imgBaseUrl+res.data.head_image
          }
        }
      })
    }else{
      let customerJson=JSON.parse(customer)
      if (customerJson.nickname==null){
        that.name=customerJson.number+""
      }else{
        that.name=customerJson.nickname
      }
      if (!objIsNull(customerJson.head_image)){
        that.imgUrl=imgBaseUrl+customerJson.head_image+""
      }
    }
  },
  methods: {
    toManua:function(){
      this.$router.replace("/manualSelectAddress")
    },
    toPage: function(){
      setStore("selected",this.selected)
      this.$router.replace("/" + this.selected);
    },
    toMsg: function(){
      setStore("selected",this.selected)
      this.$router.replace("/msg");
    },
    toMenu: function(){
      setStore("selected",this.selected)
        this.popupVisible=true
    },
    toKefu: function () {
      setStore("selected",this.selected)
      this.$router.replace("/customerService");
    },
    toEditDatum: function(){
      setStore("selected",this.selected)
      let token = getStore("token");
      if(objIsNull(token)){
        Toast("请重新登录!")
        this.$router.replace("/login")
        return;
      }
      this.$router.replace("/editDatum");
    },

    toOrder: function () {
      /*this.$router.replace("/logistics");*/
    },
    toMyWallet: function(){
      this.$router.replace("/myWallet");
    },
    toKefu: function () {
      this.$router.replace("/customerService");
    },
    toPersonal:function(){
      setStore("selected",this.selected)
      this.$router.replace("/personal")
    },
    tuichu:function(){
      let that=this
      MessageBox.confirm('确定退出登录吗?').then(function(){
        removeStore("customer")
        removeStore("token")
        removeStore("selected")
        that.$router.replace("/login")
      });
    },
    shezhi:function(){
      this.$router.replace("/sheZhi")
    },
    nz:function(){
      setStore("selected",'ynz');
      this.$router.replace("/myNz")
    },
    toSelectAddress:function(){
      this.$router.replace("/manualSelectAddress")
    }
  },
  computed: {
    addressPosition(){
      // 经纬度
      console.log("计算属性，",this.$store.state.addressInfo)
      console.log("selected",getStore("selected"))
      if (getStore("selected")!=null){
        console.log("667")
        this.selected=getStore("selected")
      }
      if(objIsNull(this.$store.state.addressInfo.city)){
        return "定位中"
      }else{
        this.address=this.$store.state.addressInfo.city+""+this.$store.state.addressInfo.district
        return this.$store.state.addressInfo.city+","+this.$store.state.addressInfo.district
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log("beforeRouteUpdate-----------------------------------------")
       if (menuArray.indexOf(from.path) > menuArray.indexOf(to.path)) {
          this.transitionName = 'slide-right'
       } else {
          this.transitionName = 'slide-left'
       }
       next()
  }
}
</script>

<style lang="css" scoped>
  @import "../../style/menu.css";
  .child-view {
    position: absolute;
    width:100%;
    transition: all .4s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(320px, 0);
    transform: translate(320px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-320px, 0);
    transform: translate(-320px, 0);
  }
</style>
