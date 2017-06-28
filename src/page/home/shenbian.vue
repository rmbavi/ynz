<template lang="html">
  <div id="map_box">
    <load v-show="isLoad"></load>
    <!-- 区域切换 -->
    <div id="area-box">
      <ul>
        <li><a href="javascript:void(0);" :class="{select_area:checkArea=='cun'}" @click="changeZoom('cun',15)">村</a></li>
        <li><a href="javascript:void(0);" :class="{select_area:checkArea=='zheng'}" @click="changeZoom('zheng',13)">镇</a></li>
        <li><a href="javascript:void(0);" :class="{select_area:checkArea=='xian'}" @click="changeZoom('xian',11)">县</a></li>
        <li><a href="javascript:void(0);" :class="{select_area:checkArea=='shi'}" @click="changeZoom('shi',10)">市</a></li>
        <li><a href="javascript:void(0);" :class="{select_area:checkArea=='sheng'}" @click="changeZoom('sheng',7)">省</a></li>
      </ul>
    </div>

    <div v-show="dingweiing" style="position:absolute;top:-91px;left:0;right:0;bottom:0;background-color:#000;opacity:0.3;z-index:999;text-align:center;">
      <mt-spinner type="snake" :size="60" style="margin-top:60%;display:inline-block;"></mt-spinner> <br>
      <span style="color:#fff">定位中</span>
    </div>

    <!-- 定位按钮 -->
    <a href="javascript:void(0);" id="dingwei_box" @click="getWeizhi" v-show="!dingweiing">
      <i class="iconfont  icon-dizhi1" style="font-size:20px; line-height:30px;"></i>
    </a>
    <!-- 定位中按钮 -->
    <a href="javascript:void(0);" id="dingwei_box2" v-show="dingweiing">
      <mt-spinner :size="14" color="#666" type="snake" style="line-height:30px;"></mt-spinner>
    </a>
    <!--<a href="javascript:void(0);" id="dingwei_box2" @click="toManua">
      <i class="iconfont icon-weizhi" style="font-size:20px; line-height:30px;"></i>
    </a>-->
    <!--发布圈按钮-->
    <!--<a href="javascript:void(0);" id="all_release" @click="all_release">
      <img src="../../image/pyq.png" width="35" height="35" alt="">
    </a>-->
    <!-- 发布按钮 -->
    <div id="fabu_box">
      <mt-palette-button content="+"
        direction="lt" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#f8b31f;">
        <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log('fabu')">
          <i class="iconfont icon-cf-c70-copy" style="font-size:20px;"></i>
        </div>
        <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log('yifabu')" >
          <i class="iconfont icon-chakanyifabu" style="font-size:20px;"></i>
        </div>
      </mt-palette-button>
    </div>
    <!-- 地图展示-->
    <div id="gaode_map" style="height:100%" v-show="!isLoad"></div>

    


  </div>
</template>

<script>
import {
  position,
  panda
} from '../../service/deviceInformation.js'
import load from '../../components/load.vue'
import service from '../../config/service.js'
import {
  sideThing,
  getStore,
  objIsNull
} from '../../service/getData.js'
import {imgBaseUrl,defaultHeader_small} from '../../config/env.js'
import {Toast,Spinner,Progress } from 'mint-ui';
import {monitorReturn} from '../../service/monitor'
import imgmap from '../../image/small_address_def.png'
import {RECORD_ADDRESS} from '../../store/mutation-types.js'

//第一次进入，自动移动到自己的坐标上去
let isNewEnter = true;

export default {
  data() {
    return {
      isLoad: true,
      checkArea: 'cun',
      zoom: 15,
      center: [],
      mainMap: null,
      imgmap:imgmap,
      dingweiing:false,
      show_ico:true,
      myPosition:""
    }
  },
  mounted: function() {
    monitorReturn(true)
    //监听返回键
    console.log("重现进入shebian")
    //加载地图
    this.initMap()
    setTimeout(function(){},1000);
    // 初始化获取定位位置,通过gps,已经通过观察实现
    if(objIsNull(this.$store.state.addressInfo.longitude)){
      this.getWeizhi();
      Toast('正在确定您的地理位置');
    }else{
       this.createMyMarket(this.$store.state.addressInfo.longitude,this.$store.state.addressInfo.latitude)
    }
  },
  methods: {
    toManua:function(){
      this.$router.replace("/manualSelectAddress")
    },
    changeZoom: function(val, zoom) {
      this.checkArea = val
      this.mapZoom = zoom
      this.getInfoForPosition()
    },
    sub_log: function(val) {
      let that=this
      if(objIsNull(getStore("token"))){
        Toast("请先登录")
        that.$router.push("/login")
        return;
      }
      if (val === "fabu") {
        that.$router.push("/createThing")
      } else {
        that.$router.push("/thingPublish")
      }
    },
    createMyMarket(long,lat) {
        let that=this
        // that.getWeizhi() //重新获取定位信息
        // console.log("--------我的位置--------")
        // console.log(that.$store.state.addressInfo.longitude, that.$store.state.addressInfo.latitude)
        // console.log(imgmap)
        // let long=that.$store.state.addressInfo.longitude
        // let lat=that.$store.state.addressInfo.latitude\
         that.myPosition = new AMap.Marker({
                    // content: "<div class=\"head_ico\" ><img onerror=\""+defaultHeader_small+"\" class=\"head_img\" src=\"" + head_image + "\" ></div>",
          map:that.mainMap,
          position: [long, lat],
            icon: new AMap.Icon({
            size: new AMap.Size(18, 40),  //图标大小
            image:that.imgmap,
          }),
           iconStyle: { //自定义外观
              url: imgmap,
              ancher: [40, 40],
              size: [40,40]
           },
           zIndex: 109,
          //  animation: "AMAP_ANIMATION_DROP"
          });
        that.mainMap.setZoomAndCenter(15,[long, lat]);

    },
    getInfoForPosition: function() {
      //通过地址获取到坐标地址的消息
      let param = this.getCurrentRegion()
      sideThing(param).then((res) => {
        this.createMarker(res)
      })
    },
    getCurrentRegion: function() {
      //获取当前屏幕现实的区域
      let bounds = this.mainMap.getBounds();
      //获取西南坐标 经度：getLng   纬度：getLat
      let currentLB = bounds.getSouthWest();
      //获取东北坐标
      let currentRT = bounds.getNorthEast();
      let token = getStore("token");
      let param = {
        "zoom": this.mapZoom,
        "startLatitude": currentLB.getLat(),
        "startLongitude": currentRT.getLng(),
        "endLatitude": currentRT.getLat(),
        "endLongitude": currentLB.getLng(),
        "token": token
      }
      return param;
    },
    initMap: function() {
      const map = new AMap.Map('gaode_map', {
        resizeEnable: true,
        zoom: 15,
      });
      this.isLoad = false;
      //地图事件
      map.on("dragend", this.dragend);
      this.mainMap = map;
    },
    getWeizhi: function(){
      let that=this
      //添加定位组件，用于获取用户当前的精确位置
      that.dingweiing=true
      var geolocation = new AMap.Geolocation({
        showCircle: false, //不显示定位结果的圆
        showMarker: false, //不现实定位结果的标记
        showButton: false, //不现实组件的定位按钮
        timeout: 5000 //浏览器定位超时时间5s
      });
      that.mainMap.addControl(geolocation);
      geolocation.getCurrentPosition(function(status, result) {
          console.log(status)
          console.log(result)
        if (status == 'complete') {
          console.log("complete")
          console.log(result)
//        onLocateSuccess(result) //定位成功
          let latitude=result.position.lat
          let longitude=result.position.lng
          console.log("position",result.position)
          console.log("addressComponent", result.addressComponent)
          let adcode=result.addressComponent.adcode
          let province=result.addressComponent.province
          let city=result.addressComponent.city
          let citycode=result.addressComponent.citycode
          let district=result.addressComponent.district
          let township=result.addressComponent.township
          let towncode=result.addressComponent.towncode

          let tmp = {
            "latitude":latitude,
            "longitude":longitude,
            "country":"",
            "province":province,
            "city":city,
            "citycode":citycode,
            "district":district,
            "adcode":adcode,
            "township":township,
            "towncode":towncode
          }
          that.$store.commit(RECORD_ADDRESS,tmp)
          that.createMyMarket(longitude,latitude)
          that.dingweiing=false
        } else if (status == 'error') {
          //定位失败
          if (result.message.indexOf('Geolocation permission denied.') !== -1) {
            //Geolocation permission denied.表示用户禁用了浏览器或者APP的定位权限或者关闭了手机的定为服务
            //或者当前页面为非安全页面,Chrome或者IOS10等系统会禁用非安全页面的定位请求，如果您的页面还没有支持HTTPS请尽快升级
            //安全页面指的是支持HTTPS的Web站点，而且是通过https协议打开的页面。安全页面也包括本地页面
            Toast('请设置当前应用的定位权限。');
          } else {
            Toast('无法获取位置信息,请手动选择位置');
          }
          that.dingweiing=false
          that.$router.replace("/manualSelectAddress")
//        onLocateFailed();
        }
      })
    }
    ,
    marketSelf: function() {
      //我很想给自己的位置打一个标签
    },
    dragend: function() {
      console.log("拖拽结束")
      this.getInfoForPosition()
    },
    createMarker: function(res) {
      if (res.errcode != "0") {
        return
      }
      // this.mainMap.clearMap() //删除地图上所有的覆盖物
      let data = res.data
      if (this.zoom >= 11) {
//        let default_header = require("../../image/default_header_small.png");
        let head_image = ""
        for (let d of data) {
          var marker;
          if (d.head_image != null) {
            head_image = imgBaseUrl+d.head_image
          }
          marker = new AMap.Marker({
            content: "<div class=\"head_ico\"><img onerror=\""+defaultHeader_small+"\" class=\"head_img\" src=\"" + head_image + "\" ></div>",
            position: [d.longitude, d.latitude],
            offset: new AMap.Pixel(-12, -12),
            zIndex: 101,
            // animation: "AMAP_ANIMATION_DROP"
          });
          // 绑定点击事件
          let tem_this = this
          marker.on("touchstart", function() {
            // 查看发布详情
            tem_this.$router.push({name:"thingDetail", params: { thingIds: d.ids,title:"" }})
          })
          let allJun=document.getElementsByClassName("juheqipao")
          let lengthsJun=allJun.length
          for(let j=0;j<lengthsJun;j++){
            allJun[j].style.display="none"
          }
          marker.setMap(this.mainMap)
        }
      } else if (this.zoom <= 10) {
        for (let d of data) {
          console.log("加载省市级别的marker：",d)
          var marker;
          marker = new AMap.Marker({
            content: "<div class=\"juheqipao\">" + d.name + "(" + d.count + ")" + "</div>",
            position: [d.longitude, d.latitude],
            offset: new AMap.Pixel(-12, -12),
            zIndex: 101,
            // animation: "AMAP_ANIMATION_DROP"
          });
          // 绑定点击事件
          let tem_this = this
          marker.on("touchstart", function() {
            if (tem_this.zoom == 10) {
              //查询县级别的附近数据
              tem_this.mapZoom = 11
            } else if (tem_this.zoom <= 7) {
              //查询市级别的附近数据
              tem_this.mapZoom = 10
            }
            tem_this.mapCenter = [d.longitude, d.latitude]
            tem_this.getInfoForPosition()
          })
          let allIco=document.getElementsByClassName("head_ico")
          
          let lengths=allIco.length
          for(let i=0;i<lengths;i++){
            allIco[i].style.display="none"
          }
          
          marker.setMap(this.mainMap)
        }
      }
    },
    all_release:function(){
      this.$router.replace("/allRelease")
    }
  },
  components: {
    load: load
  },
  computed: {
    mapZoom: {
      get: function() {
        this.zoom = this.mainMap.getZoom();
        return this.zoom
      },
      set: function(val) {
        this.mainMap.setZoom(val);
        this.zoom = val
        switch (val) {
          case 15:
            this.checkArea = "cun"
            break;
          case 13:
            this.checkArea = "zheng"
            break;
          case 11:
            this.checkArea = "xian"
            console.log(111)
            break;
          case 10:
            this.checkArea = "shi"
            break;
          case 7:
            this.checkArea = "sheng"
            break;
        }
      }
    },
    mapCenter: {
      cache: false,
      get: function() {
        this.center = this.mainMap.getCenter();
        return this.center
      },
      set: function(val) {
        console.log("设置mapCenter：", val)
        let lt = new AMap.LngLat(val[0], val[1])
        this.mainMap.setCenter(lt)
        this.center = [val[0], val[1]]
      }
    },
    addressPosition(){
      console.log("gps地址数据，addressPosition计算属性",this.$store.state.addressInfo.longitude)
      console.log("xxx:",this.$store.state.addressInfo)
      // 经纬度
      if(objIsNull(this.$store.state.addressInfo.longitude)){
        console.log("addressPosition计算属性数据null",this.$store.state.addressInfo)
        return []
      }else{
        console.log("addressPosition  有数据了",this.$store.state.addressInfo)
        return [this.$store.state.addressInfo.longitude,this.$store.state.addressInfo.latitude]
      }
    }
  },
  watch:{
    addressPosition:function(val, oldVal){
      console.log("shenbian.vue观察属性运行addressPosition")
      if(isNewEnter){
        console.log("第一次进入,isNewEnter:",isNewEnter)
        this.getWeizhi()
        isNewEnter = false
      }
    }
  }
}
</script>

<style lang="css">
@import "../../style/shenbian.css";
.juheqipao{
  font-size: 14px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 3px;
  white-space: nowrap;
  color: #666;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .117647), 0 1px 4px rgba(0, 0, 0, .117647);
}
.amap-logo{
  display: none;
}
.amap-copyright{
  display: none;
  height: 0px;
}
</style>
