<template>
  <div>
    <mt-header title="">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <i class="iconfont icon-bianji" slot="right" style="font-size: 14px" @click="edit"> 编辑</i>
    </mt-header>
    <div class="personal">
      <img :src="imgBaseUrl+imgUrl" :onerror="defaultHeader" width="60px" height="60px"> <br>
      <div>
        <span class="userName">{{name}}</span>
        <img src="../../image/man.png" v-show="!woman" width="20" height="20"
             style="margin-top: 0px;border-radius: 3%;vertical-align: sub">
        <img src="../../image/woman.png" v-show="woman" width="20" height="20"
             style="margin-top: 0px;border-radius: 3%;vertical-align: sub">
      </div>
      <div style="margin-top: 15px">
        <span class="remark">{{sign}}</span>
      </div>
      <div style="margin-top: 3px">
        <!--<i class="iconfont icon-dizhi" style="color: #999999;font-size: 20px"></i>
        <span class="addressSty">{{address}}</span>-->
      </div>
    </div>
    <div style="margin-top: 15px" class="renzheng">
      <mt-cell title="实名认证">
          <span style="color: green" v-show="realstatus">
            已认证
          </span>
        <span style="color: red" v-show="!realstatus" @click="toRealName">
          未认证
          </span>
        <span>
          <i class="iconfont icon-right"></i>
        </span>
        <i slot="icon" class="iconfont icon-anquan icon_img" style="vertical-align: sub;font-size: 20px"></i>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import {getStore, setStore, removeStore, getCustomer, objIsNull} from '../../service/getData.js'
  import {Toast} from 'mint-ui';
  import {imgBaseUrl, defaultHeader} from '../../config/env.js';

  export default{
    data: function () {
      return {
        realstatus: false,
        woman: true,
        imgUrl: "",
        addressCity: "",
        addressArea: "",
        name: "",
        sign: "",
        address: "未填写",
        imgBaseUrl: imgBaseUrl,
        defaultHeader: defaultHeader
      }
    },
    mounted: function () {
      let that = this
      let token = getStore("token")
      if (objIsNull(token)) {
        Toast("登录超时，请重新登录！");
        that.$router.replace("/login");
        return;
      }
      getCustomer(token).then(function (res) {
        console.log("res", res)
        if (res.errcode != "0") {
          Toast("获取用户信息失败,请稍后再试!")
        } else {
          setStore("customer", res.data)
          if (res.data.sex != "0") {
            that.woman = false
          }
          if (res.data.id_card != null) {
            that.realstatus = true
          }
          if (res.data.province_name != null && res.data.city_name != null) {
            that.address = res.data.province_name + "" + res.data.city_name
          }
          if (res.data.sign == null) {
            that.sign = "还没有个性签名哟~"
          } else {
            that.sign = res.data.sign
          }
          if (res.data.nickname == null) {
            that.name = res.data.number + ""
          } else {
            that.name = res.data.nickname + ""
          }
          if (res.data.head_image != null) {
            that.imgUrl = res.data.head_image
          }
        }
      })
    },
    props: [],
    components: {},
    methods: {
      edit(){
        let token = getStore("token");
        if(objIsNull(token)){
          Toast("请重新登录!")
          this.$router.replace("/login")
          return;
        }
        this.$router.replace('/editDatum')
      },
      toRealName: function () {
        let token = getStore("token");
        if(objIsNull(token)){
          Toast("请重新登录!")
          this.$router.replace("/login")
          return;
        }
        this.$router.replace("/realName")
      },
    }
  }
</script>

<style scoped>
  @import "../../style/personal.css";

  .mint-cell-wrapper {
    padding: 0 0;
  }

  .mint-cell-title {
    margin-left: 15px;
  }

  .icon-right {
    margin-right: 15px;
  }

  .renzheng .icon-right[data-v-0f39a161] {
    margin-right: 0px;
  }
</style>
