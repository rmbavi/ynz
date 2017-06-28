<template>
  <div>
    <mt-header title="添加新地址">
      <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
      <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
    </mt-header>
      <div class="manage_label_address">
        <mt-field label="收货人" placeholder="请输入姓名"></mt-field>
        <mt-field label="联系电话" placeholder="请输入手机号" :attr='{ maxlength: 11}' type="tel"></mt-field>
        <mt-popup v-model="addressVisible" position="bottom" popup-transition="popup-fade" class="mint-popup-4">
          <div class="picker-toolbar">
            <span class="mint-datetime-action mint-datetime-cancel" @click="cancleAddress">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="selectAddress">确定</span>
          </div>
          <mt-picker :slots="addressSlots" @change="onAddressChange"></mt-picker>
        </mt-popup>
        <mt-field label="地址" placeholder="请选择地址" readonly class="address" v-model="address" @click.native="toSelect">
          <i class="icon iconfont icon-right"></i>
        </mt-field>
        <mt-field placeholder="请填写详细地址,不少于5个字" type="textarea" rows="3"></mt-field>
      </div>
      <div style="height:20px;background:#f7f7f7;"></div>
      <div class="manageSetting">
        <p>设为默认</p>
        <mt-switch class="manageSwitch" v-model="is_default_value"></mt-switch>
      </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {addressSlots, values2, values3,} from '../../service/selectAddress.js';
  import {addAddressInfo,objIsNull,getStore} from '../../service/getData.js'
  export default {
    data: function () {
      return {
        addressVisible: false,
        addressSlots: addressSlots,
        values2: values2,
        values3: values3,
        address: '',
        cityIds: '',
        is_default:0,
        is_default_value:'',
        mobile:"",
        detail:"",
        names:""
      }
    },
    props: [],
    components: {},
    methods: {
      saveBut(){
        let that=this
         if(objIsNull(that.names)){
            Toast("请输入收货人姓名!")
            return
         }
         if(objIsNull(that.address)){
           Toast("请选择收货城市!")
           return
         }
         if(objIsNull(that.mobile)){
           Toast("请输入联系电话")
           return
        }
         if(objIsNull(that.detail)){
           Toast("请输入详细地址!")
           return
         }else if(that.detail.length<5){
           Toast("请输入不少于五个字的详细地址!")
           return
        }
        let token = getStore("token")
        if(objIsNull(token)){
          Toast("登录信息为空，请重新登录!")
          that.$router.replace("/login")
          return
        }
        let addressInfo={detailed:that.detail,phone:that.mobile+"",city:that.cityIds+"",isDefault:that.is_default+"",names:that.names}
        console.log("addressInfo",addressInfo)
        addAddressInfo(addressInfo,token).then(function(res){
          console.log("addAddress-res",res)
          if(res.errcode=="0"){
            that.$router.replace("/addressList")
          }else{
            Toast("系统繁忙,请稍后再试!")
          }
        })

      },
      //选中地址
      toSelect: function () {
        let that = this
        that.addressVisible = true
        console.log("select")
//        this.$router.push("/selectAddress")
      },
      cancleAddress(){
        let that = this;
        that.addressVisible = false;
//        that.address=''

      }, selectAddress(){
        let that = this;
        that.addressVisible = false;
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
        that.cityIds = that.values3[that.i][that.j]
      },
      getIndexJ: function (j) {
        let that = this
        for (let k = 0; that.values2[that.i].length > k; k++) {
          if (that.values2[that.i][k] == j) {
            that.j = k;
          }
        }
      },
      //返回
      backUrl(){
        console.log("this.$route.params99999999999999999",this.$route.params)
        if (!objIsNull(this.$route.params.ids)){
          this.$router.replace({name:"addressList",params:this.$route.params});
        }else {
          this.$router.go(-1)
        }

      }


    },
    watch: {
      is_default_value: function (val) {
        console.log(val)
        this.is_default =val== true ? "0" : "1"
        console.log(this.is_default)
      }
    }

  }
</script>

<style lang="css" scoped>
@import "../../style/manageAddress.css";

</style>
