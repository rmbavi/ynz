<template>
  <div>
    <mt-header title="告诉大家">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div style="padding:10px;">
      <div>
        <div class="leftborder" style="float: left"></div>
        <textarea v-model="content" placeholder="此刻我想的..." rows="4" class="mint-field-core my-textarea"></textarea>
      </div>
      <div id="img_box">
        <ul style="height: 100%;">
          <li class="li_1" :style="liStyle" v-for="(iu, index) in imgUrls" v-if="index<3">
            <div class="ul_li_box" :style="styleVal">
              <div class="ul_li_delete_box" @click='delImage(index)'>
                <i class="icon iconfont icon-icon27 chacha"></i>
              </div>
              <img class="ul_li_img" :src="iu" width="80" height="80">
            </div>
          </li>
          <li v-show="isshow">
            <div class="ul_li_box">
              <div class="add_img" :style="addImgStyle">
                <i class="icon iconfont icon-jia cha" style=""></i>
              </div>
              <input type="file" class="file-button" id="files" capture="camera"  @change="filechange" accept="image/jpeg,image/jpg,image/png">
            </div>
          </li>
          <div style="clear: both"></div>
        </ul>
      </div>

      <div style="color: #999999;;vertical-align: middle;height:40px;line-height:40px;margin-top:10px;">
        <i class="icon iconfont icon-weizhi" style="margin-right: 5px"></i><span style="font-size: 12px; margin-right: 5px; color: #666">{{weizhi}}</span>
        <i class="icon iconfont icon-right" style="float: right"></i>
      </div>
      <div class="type_box" style="margin-top:10px;">
        <div class="type_item_box">
          <span class="type_item_badge_box selected_badge" @click="selectedType" seltype="1">家常</span>
        </div>
        <div class="type_item_box" >
          <span class="type_item_badge_box" @click="selectedType" seltype="2">喜事</span>
        </div>
        <div class="type_item_box">
          <span class="type_item_badge_box" @click="selectedType" seltype="3">白事</span>
        </div>
        <div class="type_item_box">
          <span class="type_item_badge_box" @click="selectedType" seltype="4">搞笑</span>
        </div>
        <div style="clear: both"></div>
      </div>
      <div style="margin-top:10px;">
        <mt-button type="primary" size="large" style="background-color: #f8b31f; font-size: 14px" @click.native="release">确定发布</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import lrz from "lrz"
  import service from '../../config/service.js'
  import {saveImgBase64,release,getStore, objIsNull} from "../../service/getData.js"
  // import {position} from '../../service/deviceInformation.js'
  import {imgBaseUrl} from '../../config/env.js'

  export default{
    mounted: function(){
      console.log("level:",this.$store.state.addressInfo.citycode)
      this.imgWidth = ((document.body.clientWidth - 15) / 4) - 15 + "px";
      this.liStyle = "heigth: " + this.imgWidth;
      // position().then((a) => {
      //    this.positions = [a.longitude, a.latitude]
      // }).then((error) => {
      //   console.log("error", error)
      // })
//      position().then((a) => {
//         this.positions = [a.longitude, a.latitude]
//      }).then((error) => {
//        console.log("error", error)
//      })
      if(this.$store.state.addressInfo.city!=undefined){
        this.weizhi=this.$store.state.addressInfo.city+""+this.$store.state.addressInfo.district
      }else{
        Toast("请先选择地理位置!")
        this.$router.replace("/manualSelectAddress")
      }
    },
    data: function () {
      return {
        liStyle: "liStyle:100%",
        styleVal: "height: 100%;",
        imgWidth: "0px",
        addImgStyle: "",
        imgUrls:[],
        imgUrls2:[],
        isshow:true,
        content:"",
        jiachang:1,
        xishi:2,
        baishi:3,
        gaoxiao:4,
        activeIndex:1,
        positions:[],
        weizhi:"定位中"
      }
    },
    props: [],
    components: {},
    methods: {
      selectedType:function(event){
        //获取点击对象
        var toggle = event.currentTarget;
        document.getElementsByClassName("selected_badge")[0].setAttribute("class","type_item_badge_box");
        toggle.setAttribute("class","type_item_badge_box selected_badge");
        this.activeIndex=toggle.getAttribute("seltype");
      },
      filechange:function(e){
        let that=this
        if (that.imgUrls.length>2){
          Toast("最多上传三张图片哟~")
          return;
        }
        var files = e.target.files || e.dataTransfer.files;
//                var files=document.getElementById("files").value
        if(!files.length) return;
        that.createImage(files, e);
      },
      createImage: function(file, e) {
        let vm = this;
        lrz(file[0],{width:350}).then(function(rst) {
          let imgType=rst.file.type.substr(6)
          let type="."+imgType
          let result=saveImgBase64(rst.base64,type)
          result.then(function(res){
            vm.imgUrls2.push(res.url+"")
          })
          vm.imgUrls.push(rst.base64);
          return rst;
        }).always(function(){
          //always都会执行
          // 清空文件上传控件的值
          e.target.value = null;
          if (vm.imgUrls.length>=3){
            vm.isshow=false;
          }
        });
      },
      delImage: function(index) {
//        console.log("index",index)
        let vm = this;
        vm.imgUrls.splice(index, 1);
        vm.imgUrls2.splice(index, 1);
        if (vm.imgUrls2.length<3){
          vm.isshow=true
        }
        console.log("imgUrls",vm.imgUrls)
        console.log("imgUrls2",vm.imgUrls2)
      },
      release:function(){
        let that=this
        if (objIsNull(that.content)){
          Toast("请输入想说的话")
          return;
        }
        let loginToken=getStore("token")
        console.log(loginToken+"-------token-------")
        let result=service('POST','/thing/sideThing/create?token='+loginToken,
          {classify:"1",type:that.activeIndex,images:that.imgUrls2.join(),content:that.content,
//              longitude:this.positions[0]+"",latitude:this.positions[1]+"",
            longitude:that.$store.state.addressInfo.longitude+"",latitude:that.$store.state.addressInfo.latitude+"",
            province:"",
            city:that.$store.state.addressInfo.citycode+"",
            district:that.$store.state.addressInfo.adcode+"",
            adcode:that.$store.state.addressInfo.adcode+"",
            township:that.$store.state.addressInfo.towncode+"",
            address:"翠山蓝天苑2街108"})
        result.then(function(res){
          console.log("res",res)
          if (res.errcode=="0"){
            Toast("发布成功!");
            that.imgUrls=[];
            that.imgUrls2=[]
            that.$router.replace("/index")
          }else{
            Toast("系统繁忙,请稍后再试!")
          }
        })

      }
    }
  }
</script>

<style scoped>
  @import "../../style/createThink.css";
  .my-textarea{
    padding:6px 0 0 5px;
    height:100px;
  }
</style>
