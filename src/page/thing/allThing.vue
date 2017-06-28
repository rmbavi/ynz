<template>
  <div v-cloak>
    <mt-header title="所有发布">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click=""></mt-button>
    </mt-header>
    <!-- 功能切换面板 -->
    <!--<mt-navbar v-model="selected" class="navbar-plan">
      <mt-tab-item id="1" @click.native="toSelect">家常</mt-tab-item>
      <mt-tab-item id="2" @click.native="toSelect">喜事</mt-tab-item>
      <mt-tab-item id="3" @click.native="toSelect">白喜</mt-tab-item>
      <mt-tab-item id="4" @click.native="toSelect">搞笑</mt-tab-item>
    </mt-navbar>-->

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item :id="selected">
        <!--<div v-show="loadingon">
          <load></load>
        </div>

        <div v-if="dataThingList.length==0" class="nodata">
          暂无数据
        </div>-->
        <div >  <!--&lt;!&ndash;v-for="thing in dataThingList"&ndash;&gt;-->
          <div class="box_b" style=""></div>
          <div class="box_x">
            <div>
              <div ><!--@click="toDetail(thing.ids)"-->
                <div class="head_title">
                  <div class="left_title">
                    <!--<img :src="imgBaseUrl+thing.head_image"
                         style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                         :onerror="defaultHeader_small"/>-->
                    <img src="../../image/default_header.png"
                         style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                         :onerror="defaultHeader_small"/>
                  </div>
                  <div class="right_title">
                    <!--<div v-if="thing.nickname!=null" class="x_head_tile"><i class="good"></i>{{thing.nickname}}</div>
                    <div v-else class="x_head_tile"><i class="good"></i>{{thing.number}}</div>
                    <div class="x_time">{{forTime(thing.create_time)}}</div>-->
                    <div class="x_head_tile"><i class="good"></i>666的咸鱼</div>
                    <!--<div v-else class="x_head_tile"><i class="good"></i>{{thing.number}}</div>-->
                    <div class="x_time">2017-05-26</div>

                  </div>
                </div>
                <!--<div style="clear:both"></div>-->
                <div class="content all_content">
                  <!--{{thing.content}}-->
                  秋天不回来
                </div>
              </div>
              <div class="images_x all_images_x">
                <ul class="img">
                  <!--<li v-for=" img in  imgs(thing.images)"><img :src="imgBaseUrl+img" width="100%"
                                                               :onerror="big_default_news_detail"/>
                  </li>-->
                  <img src="../../image/newsDetailimg.png" width="30%"
                       :onerror="big_default_news_detail"/>

                  <div style="clear:both"></div>
                </ul>
              </div>
              <div class="bottom">
                <div class="bottom_left all_bottom_left">
                  <i class="icon iconfont icon-weizhi" style="font-size: 12px;color: #a7c0e4"></i>
                  湖南市郴州
                  <!--{{thing.province_name}}{{thing.city_name}}-->
                </div>
                <div class="bottom_right all_bottom_right">
                  <i class="icon iconfont icon-good" style="font-size: 12px;"> 200</i>
                  &nbsp;
                  <i  class="icon iconfont icon-comment"
                     style="font-size: 13px;color: #f8b31f"> 200  <!--v-if="thing.sum_comment!=0"-->
                  </i>
                  <!--<i v-else class="icon iconfont icon-comment"
                     style="font-size: 13px;"> 200
                  </i>-->
                </div>

              </div>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>



        <div >  <!--&lt;!&ndash;v-for="thing in dataThingList"&ndash;&gt;-->
          <div class="box_b" style=""></div>
          <div class="box_x">
            <div>
              <div ><!--@click="toDetail(thing.ids)"-->
                <div class="head_title">
                  <div class="left_title">
                    <!--<img :src="imgBaseUrl+thing.head_image"
                         style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                         :onerror="defaultHeader_small"/>-->
                    <img src="../../image/default_header.png"
                         style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                         :onerror="defaultHeader_small"/>
                  </div>
                  <div class="right_title">
                    <!--<div v-if="thing.nickname!=null" class="x_head_tile"><i class="good"></i>{{thing.nickname}}</div>
                    <div v-else class="x_head_tile"><i class="good"></i>{{thing.number}}</div>
                    <div class="x_time">{{forTime(thing.create_time)}}</div>-->
                    <div class="x_head_tile"><i class="good"></i>666的咸鱼</div>
                    <!--<div v-else class="x_head_tile"><i class="good"></i>{{thing.number}}</div>-->
                    <div class="x_time">2017-05-26</div>

                  </div>
                </div>
                <!--<div style="clear:both"></div>-->
                <div class="content all_content">
                  <!--{{thing.content}}-->
                  秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来秋天不回来
                </div>
              </div>
              <div class="images_x all_images_x">
                <ul class="img">
                  <!--<li v-for=" img in  imgs(thing.images)"><img :src="imgBaseUrl+img" width="100%"
                                                               :onerror="big_default_news_detail"/>
                  </li>-->
                  <img src="../../image/newsDetailimg.png" width="25%"
                       :onerror="big_default_news_detail"/>
                  <img src="../../image/newsDetailimg.png" width="25%"
                       :onerror="big_default_news_detail"/>
                  <img src="../../image/newsDetailimg.png" width="25%"
                       :onerror="big_default_news_detail"/>
                  <div style="clear:both"></div>
                </ul>
              </div>
              <div class="bottom">
                <div class="bottom_left all_bottom_left">
                  <i class="icon iconfont icon-weizhi" style="font-size: 12px;color: #a7c0e4"></i>
                  湖南市郴州
                  <!--{{thing.province_name}}{{thing.city_name}}-->
                </div>
                <div class="bottom_right all_bottom_right">
                  <i class="icon iconfont icon-good" style="font-size: 12px;"> 200</i>
                  &nbsp;
                  <i  class="icon iconfont icon-comment"
                      style="font-size: 13px;color: #f8b31f"> 200  <!--v-if="thing.sum_comment!=0"-->
                  </i>
                  <!--<i v-else class="icon iconfont icon-comment"
                     style="font-size: 13px;"> 200
                  </i>-->
                </div>

              </div>
            </div>
            <div style="clear: both"></div>
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
        /*if (objIsNull(token)){
          Toast("请重新登录!")
          that.$router.replace("/login")
          return;
        }*/
        that.loadingon=true
        /*try {
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
        }*/
      },
      //跳转到发布详情
      toDetail(thingIds){
        let that = this
        that.$router.replace({name: "thingDetail", params: {thingIds: thingIds}})
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
