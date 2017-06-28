<template>
  <div class="editDatum" v-cloak style="overflow: hidden">

    <mt-header title="编辑资料">
      <router-link to="/personal" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="icon iconfont icon-dagou" slot="right" @click.native="saveBut">完成</mt-button>
    </mt-header>

    <div>
      <div class="headImg">
        <span class="changeHead">修改头像</span>
        <div><img :src="imgBaseUrl+imgUrl" width="60" height="60" alt="" class="imghead" :onerror="defaultHeader">
          <input type="file" class="imgFile" accept="image/jpeg,image/jpg,image/png" @change="filechange">
        </div>

      </div>
      <mt-field label="昵称" placeholder="请输入昵称" v-model="nickname"></mt-field>
      <mt-cell title="性别">
        <mt-switch v-model="sex_value">
          {{sex}}
          <!--<span>男</span>-->
          <!--<span></span>-->
        </mt-switch>
      </mt-cell>
      <mt-field label="生日" placeholder="请输入年月日" @click.native="openPicker" v-model="birthday" readonly>
        <i class="icon iconfont icon-right"></i>
      </mt-field>
      <mt-datetime-picker
        ref="picker"
        type="date"
        :startDate="startDate"
        :endDate="endDate"
        @confirm="handleConfirm"
        v-model="pickerValue">
      </mt-datetime-picker>
      <mt-popup v-model="addressVisible" position="bottom" popup-transition="popup-fade"  class="mint-popup-4">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel"  @click="cancleAddress">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="selectAddress">确定</span>
        </div>
        <mt-picker :slots="addressSlots" @change="onAddressChange"></mt-picker>
      </mt-popup>
      <mt-field label="地址" placeholder="请选择地址" disabled class="address" v-model="address" @click.native="toSelect">
        <i class="icon iconfont icon-right"></i>
      </mt-field>
      <mt-field label="详细地址" placeholder="请输入详细地址" v-model="detailaddress"></mt-field>
    </div>

    <div style="padding-top: 20px">
      <mt-field label="行业" placeholder="请输入行业" value="" v-model="industry">
        <!--<i class="icon iconfont icon-right"></i>-->
      </mt-field>
      <mt-field label="职位" placeholder="请输入职位" value="" v-model="vocation">
        <!--<i class="icon iconfont icon-right"></i>-->
      </mt-field>
      <mt-field label="个性签名" class="signStyle" type="textarea" rows="2" placeholder="请输入个性签名" v-model="sign">
      </mt-field>
    </div>

  </div>
</template>

<script>
  import {addressSlots, values2, values3,} from '../../service/selectAddress.js';
  import {Toast} from 'mint-ui';
  import service from '../../config/service.js'
  import {getStore, removeStore, objIsNull, saveImgBase64} from '../../service/getData.js';
  import {formatDate} from '../../service/date.js';
  import {imgBaseUrl, defaultHeader} from '../../config/env.js'
  import lrz from "lrz"

  export default{
    data: function () {
      return {

        sex_value: "",
        sex: "男",
        sex_canzhi: "",
        nickname: '',
        birthday: '1985-01-01 00:00:00',
        industry: '',
        vocation: '',
        sign: '',
        pickerValue: '',
        dateValue: new Date(),
        startDate: new Date('1980-01-01'),
        endDate: new Date(),
        address: '',
        cityIds: '',
        detailaddress: '',
        popupVisible: false,
        imgUrl: "",
        imgBaseUrl: imgBaseUrl,
        defaultHeader: defaultHeader,
        addressVisible:false,
        addressSlots:addressSlots,
        values2:values2,
        values3:values3,


      }
    },
    props: [],
    mounted: function () {
      let that = this
      let token = getStore("token")
//      let address = this.address
//      let cityIds = this.cityIds
      if (objIsNull(token)) {
        Toast("登录超时，请重新登录！");
        that.$router.replace("/login")
        return;
      }
      try {
        let result = service('get', '/customer/customer/info?token=' + token)
        result.then(function (res) {
          console.log("res111", res)
          if (res.errcode != 0) {
            Toast("获取用户信息失败，请稍后再试!");
            return;
          }

          that.sign = res.data.sign;
          if (res.data.sex == 1) {
            that.sex_value = false;
          }
          if (res.data.sex == 0) {
            that.sex_value = true;
          }
          that.sex = res.data.sex == 1 ? '男' : (res.data.sex === '0' ? '女' : '')
          that.nickname = res.data.nickname;
          that.birthday = formatDate(new Date(res.data.birthday), 'yyyy-MM-dd');
          that.vocation = res.data.vocation;
          that.industry = res.data.industry;
          that.imgUrl = res.data.head_image
          if (res.data.province_name != null && res.data.city_name != null) {
            that.address = res.data.province_name + " " + res.data.city_name;
          }
          that.detailaddress = res.data.address;
          that.cityIds = res.data.city;
          if (address != null && cityIds != null) {
            that.address = address
            that.cityIds = cityIds
            console.log("cityIds", that.cityIds)
            removeStore("address")
            removeStore("cityIds")
          }
        })
      } catch (e) {
        Toast("系统繁忙，请稍后再试!");
      }
    },
    components: {},
    methods: {
      saveBut(){
        let that = this
        if (objIsNull(that.nickname)) {
          Toast('请输入昵称')
        } else if (objIsNull(that.imgUrl)) {
          Toast('请选择头像')
        }
        else if (that.nickname.trim().length > 12) {
          Toast('昵称不能超过12个字符')
        } else if (objIsNull(that.sex)) {
          Toast('请选择性别')
        } else if (objIsNull(that.birthday)) {
          Toast('请选择出生日期')
        } else if (objIsNull(that.address)) {
          Toast('请选择地址')
        } else if (objIsNull(that.detailaddress)) {
          Toast('请输入详细地址')
        } else if (objIsNull(that.industry)) {
          Toast('请输入行业')
        } else if (objIsNull(that.vocation)) {
          Toast('请输入职位')
        } else if (objIsNull(that.sign)) {
          Toast('请输入个性签名')
        } else {
          that.doAdd()
        }
      },
      doAdd(){

        let that = this
        console.log(that.cityIds)
        let token = getStore("token")
//            alert(that.sex)
        if (that.sex == "男") {
          that.sex_canzhi = 1
        }
        if (that.sex == "女") {
          that.sex_canzhi = 0
        }
        let result = service("post", "/customer/customer/update?token=" + token, {
          nickname: that.nickname,
          sex: that.sex_canzhi,
          birthday: that.birthday,
          industry: that.industry,
          vocation: that.vocation,
          sign: that.sign,
          city: that.cityIds,
          address: that.detailaddress,
          head_image: that.imgUrl
        })
        result.then(function (res) {
          if (res.errcode == 0) {
            console.log("res666", res)
            Toast("保存成功！");
            that.$router.replace("/personal")
          } else {
            Toast("系统繁忙,请稍后再试!");
          }
        })
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(value){
        let that = this
        that.birthday = formatDate(new Date(value), 'yyyy-MM-dd');
      },
//      toSelect: function () {
//        console.log("select")
//        this.$router.replace("/selectAddress")
//      },
      filechange: function (e) {
        let that = this
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        console.log("files.length", files.length)
        that.createImage(files, e);
      },
      createImage: function (file, e) {
        let vm = this;
        console.log("222222", file)
        lrz(file[0], {width: 480}).then(function (rst) {
          let imgType = rst.file.type.substr(6)
          let type = "." + imgType
          let result = saveImgBase64(rst.base64, type)
          console.log("555555")
          result.then(function (res) {
            console.log("res", res)
            vm.imgUrl = res.url + ""
          })
//              vm.imgUrls.push(rst.base64);
          return rst;
        }).always(function () {
          //always都会执行
          // 清空文件上传控件的值
          e.target.value = null;
          /*if (vm.imgUrls.length>=3){
           vm.isshow=false;
           }*/
        });
      },
      //选择地址
      toSelect: function () {
        let  that=this
        that.addressVisible=true
        console.log("select")
//        this.$router.push("/selectAddress")
      },
      cancleAddress(){
        let that = this ;
        that.addressVisible=false;
//        that.address=''

      },selectAddress(){
        let that = this ;
        that.addressVisible=false;
//        that.address=''
      },
      onAddressChange(picker, value) {
        let that = this
        if (value[0] == "北京") {
          console.log("value[0]", value[0])
          that.i = 0
          picker.setSlotValues(1, that.values2[0])
        } else if (value[0] == "天津") {
          that.i = 1
          picker.setSlotValues(1, that.values2[1])
        } else if (value[0] == "河北") {
          that.i = 2
          picker.setSlotValues(1, that.values2[2])
        } else if (value[0] == "山西") {
          that.i = 3
          picker.setSlotValues(1, that.values2[3])
        } else if (value[0] == "内蒙古") {
          that.i = 4
          picker.setSlotValues(1, that.values2[4])
        } else if (value[0] == "辽宁") {
          that.i = 5
          picker.setSlotValues(1, that.values2[5])
        } else if (value[0] == "吉林") {
          that.i = 6
          picker.setSlotValues(1, that.values2[6])
        } else if (value[0] == "黑龙江") {
          that.i = 7
          picker.setSlotValues(1, that.values2[7])
        } else if (value[0] == "上海") {
          that.i = 8
          picker.setSlotValues(1, that.values2[8])
        } else if (value[0] == "江苏") {
          that.i = 9
          picker.setSlotValues(1, that.values2[9])
        } else if (value[0] == "浙江") {
          that.i = 10
          picker.setSlotValues(1, that.values2[10])
        } else if (value[0] == "安徽") {
          that.i = 11
          picker.setSlotValues(1, that.values2[11])
        } else if (value[0] == "福建") {
          that.i = 12
          picker.setSlotValues(1, that.values2[12])
        } else if (value[0] == "江西") {
          that.i = 13
          picker.setSlotValues(1, that.values2[13])
        } else if (value[0] == "山东") {
          that.i = 14
          picker.setSlotValues(1, that.values2[14])
        } else if (value[0] == "河南") {
          that.i = 15
          picker.setSlotValues(1, that.values2[15])
        } else if (value[0] == "湖北") {
          that.i = 16
          picker.setSlotValues(1, that.values2[16])
        } else if (value[0] == "湖南") {
          that.i = 17
          picker.setSlotValues(1, that.values2[17])
        } else if (value[0] == "广东") {
          that.i = 18
          picker.setSlotValues(1, that.values2[18])
        } else if (value[0] == "广西") {
          that.i = 19
          picker.setSlotValues(1, that.values2[19])
        } else if (value[0] == "海南") {
          that.i = 20
          picker.setSlotValues(1, that.values2[20])
        } else if (value[0] == "重庆") {
          that.i = 21
          picker.setSlotValues(1, that.values2[21])
        } else if (value[0] == "四川") {
          that.i = 22
          picker.setSlotValues(1, that.values2[22])
        } else if (value[0] == "贵州") {
          that.i = 23
          picker.setSlotValues(1, that.values2[23])
        } else if (value[0] == "云南") {
          that.i = 24
          picker.setSlotValues(1, that.values2[24])
        } else if (value[0] == "西藏") {
          that.i = 25
          picker.setSlotValues(1, that.values2[25])
        } else if (value[0] == "陕西") {
          that.i = 26
          picker.setSlotValues(1, that.values2[26])
        } else if (value[0] == "甘肃") {
          that.i = 27
          picker.setSlotValues(1, that.values2[27])
        } else if (value[0] == "青海") {
          that.i = 28
          picker.setSlotValues(1, that.values2[28])
        } else if (value[0] == "宁夏") {
          that.i = 29
          picker.setSlotValues(1, that.values2[29])
        } else if (value[0] == "新疆") {
          that.i = 30
          picker.setSlotValues(1, that.values2[30])
        } else if (value[0] == "台湾") {
          that.i = 31
          picker.setSlotValues(1, that.values2[31])
        } else if (value[0] == "香港") {
          that.i = 32
          picker.setSlotValues(1, that.values2[32])
        } else if (value[0] == "澳门") {
          that.i = 33
          picker.setSlotValues(1, that.values2[33])
        }
        that.getIndexJ(value[1])
        that.address = value[0] + " " + value[1]
        that.cityIds=that.values3[that.i][that.j]
      },
      getIndexJ: function (j) {
        let that = this
        for (let k = 0; that.values2[that.i].length > k; k++) {
          if (that.values2[that.i][k] == j) {
            that.j = k;
          }
        }
      },

    },
    watch: {
      sex_value: function (val) {
        this.sex = val == true ? "女" : "男"
      }
    }
  }
</script>
<!--用我的-->
<style scoped>
  .editDatum {
    background-color: #edeff2;
  }

  .editDatum .mint-field.is-textarea .mint-cell-title {
    margin-bottom: 28px;
    position: relative;
    top: -14px;
  }

  .signStyle textarea {
    font-size: 14px;
  }

</style>
<!--不要删掉 留着下面的样式-->
<style>
  .mint-popup-4 {
    width: 100%;
  }
  .mint-popup-4{
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .editDatum .mint-cell-title{
    width: 105px;
    float: left;
    flex:none;
    filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;
  }
  .editDatum .mint-cell-wrapper{
    font-size: 14px;
  }
  .mint-field-core{
    background-color: #ffffff;
  }
  .editDatum .mint-field.is-textarea .mint-cell-title{
    position: relative;
    top:-14px;
  }
  .headImg{
    width:100%;
    background-color: #ffffff;
    min-height: inherit;
    height:65px;
    position: relative;
    padding:5px 10px;
  }
  .imgFile{
    position: absolute;
    left: 0;
    top:0;
    height:60px;
    opacity:0;
    z-index: 1000;
  }
  .changeHead{
    position: relative;
    top:25px;
    left:0px;
    font-size: 14px;
    color: #969696;
  }
  .imghead{
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;
    padding-top: 3px;
    margin-left: 100px;
    margin-top: -20px;

  }
</style>

