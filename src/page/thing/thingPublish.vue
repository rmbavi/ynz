<template>
  <div >
    <mt-header fixed title="我的发布">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click=""></mt-button>
    </mt-header>
    <!-- 功能切换面板 -->
    <mt-navbar v-model="selected" class="navbar-plan" style="margin-top:45px" >
      <mt-tab-item id="1" @click.native="toSelect">家常</mt-tab-item>
      <mt-tab-item id="2" @click.native="toSelect">喜事</mt-tab-item>
      <mt-tab-item id="3" @click.native="toSelect">白喜</mt-tab-item>
      <mt-tab-item id="4" @click.native="toSelect">搞笑</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="selected">
        <div v-show="loadingon">
          <load></load>
        </div>
        <!--width: 100%;height:1000px;-->
        <div style="width: 100%;overflow: auto" id="thing_list_box">
          <div v-if="dataThingList.length==0" class="nodata">
            暂无数据
          </div>

          <div v-for="thing in dataThingList">
            <div class="box_b" style=""></div>
            <div class="box_x">
              <div>
                <div @click="toDetail(thing.ids)">
                  <div class="head_title">
                    <div class="left_title">
                      <img :src="imgBaseUrl+thing.head_image"
                           style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                           :onerror="defaultHeader_small"/>
                    </div>
                    <div class="right_title">
                      <div v-if="thing.nickname!=null" class="x_head_tile"><i class="good"></i>{{thing.nickname}}</div>
                      <div v-else class="x_head_tile"><i class="good"></i>{{thing.number}}</div>
                      <div class="x_time">{{forTime(thing.create_time)}}</div>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                  <div class="content">
                    {{thing.content}}
                  </div>
                </div>
                <div class="images_x">
                  <ul class="img">
                    <li v-for=" img in  imgs(thing.images)"><img :src="imgBaseUrl+img" width="100%"
                                                                 :onerror="big_default_news_detail"/>
                    </li>
                    <div style="clear:both"></div>
                  </ul>
                </div>
                <div class="bottom">
                  <div class="bottom_left">
                    <i class="icon iconfont icon-dingwei1" style="font-size: 12px;color: #a7c0e4"></i>
                    <!--湖南市郴州 -->
                    {{thing.province_name}}{{thing.city_name}}
                  </div>
                  <div class="bottom_right">
                    <i class="icon iconfont icon-good" style="font-size: 12px;"> {{thing.sum_praise}}</i>
                    &nbsp;
                    <i v-if="thing.sum_comment!=0" class="icon iconfont icon-comment"
                       style="font-size: 13px;color: #f8b31f"> {{thing.sum_comment}}
                    </i>
                    <i v-else class="icon iconfont icon-comment"
                       style="font-size: 13px;"> {{thing.sum_comment}}
                    </i>
                  </div>

                </div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
        </div>



      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import service from '../../config/service.js'
  import {imgs} from '../../config/common.js';
  import {imgBaseUrl,defaultHeader,defaultHeader_small,default_news_detail,big_default_news_detail} from '../../config/env.js'
  import { Toast } from 'mint-ui';
  import {formatDate} from '../../service/date.js';
  import {forTime} from '../../service/time.js';
  import {getStore, objIsNull} from '../../service/getData.js';
  import  load from '../../components/load.vue'


  export default {
    name: 'thingPublish',
    data() {
      return {
        msg: '',
        selected: '1',
        dataThingList: '',
        content: '',
//        type:'',
        images: [],
        connent: '',
        imgBaseUrl: imgBaseUrl,
        defaultHeader: defaultHeader,
        defaultHeader_small: defaultHeader_small,
        big_default_news_detail: big_default_news_detail,
        loadingon:true
      }
    },
    mounted: function () {
      //加载默认显示家常列表数据
      let that = this
      let token = getStore("token")
      if (objIsNull(token)) {
        Toast("请重新登录!")
        that.$router.replace("/login")
        return;
      }

      that.loadingon=true
      try {
        let result = service("post", '/thing/sideThing/getList?token=' + token, {type: 1})
        result.then(function (res) {
          if (res.errcode == "0") {
            that.dataThingList = res.data
            that.loadingon=false
            console.log(res.data);
          } else {
            Toast("系统繁忙,请稍后再试!")
          }
        })
      } catch (e) {
        Toast("系统繁忙,请稍后再试!")
      }
    },
    components: {
      load:load
    },
    methods: {
      //面板切换 家常 喜事 白喜 搞笑
      toSelect(){
        let that = this
        that.selected = this.selected
        let token = getStore("token")
        if (objIsNull(token)){
          Toast("请重新登录!")
          that.$router.replace("/login")
          return;
        }
        that.loadingon=true
        try {
          let that = this
          let result = service("post", '/thing/sideThing/getList?token=' + token, {type: this.selected})
          result.then(function (res) {
            console.log(res)
            if (res.errcode != "0") {
              Toast("系统繁忙,请稍后再试!")
              return;
            }
            that.dataThingList = res.data
            that.loadingon=false
          })
        } catch (e) {
          Toast("系统繁忙,请稍后再试!")
        }
      },
      //跳转到发布详情
      toDetail(thingIds){
        let that = this
        that.scrollTop=document.getElementById('thing_list_box').scrollTop;
        console.log(document.getElementById('thing_list_box').scrollTop+"----------------")
//        setStore("thing_list_box_scroll",that.scrollTop);
        that.$router.push({name: "thingDetail", params: {thingIds: thingIds}})
      },
      //图片切割
      imgs(images){
        return imgs(images);
      },
      forTime(time){
        if (time != null | time != undefined | time != '') {
          return forTime(time)
        }
      },

      formatDate(time){
        if (objIsNull(time)) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  @import "../../style/thingPulish.css";
</style>
