<template lang="html">
  <div style="margin-bottom: 40px;" v-cloak>
    <mt-header fixed title="身边事">
      <!--<router-link to="router.go(-1)" >-->
      <mt-button icon="back" slot="left" @click.native="back_but">返回</mt-button>
      <!--</router-link>-->
    </mt-header>
    <div style="margin-bottom: 60px; padding-top: 45px" v-cloak>
      <div style="padding: 15px;">
        <img class="header_img" :src="imgBaseUrl+head_image"
             style="width:50px;height: 50px;border-radius: 50%;border: 1px solid #eaeaea"
             :onerror="defaultHeader"/>
        <div style="margin-left: 55px; font-size: 14px;padding-top: 7px">
          <label v-if="nickname!=null" style="color: #62759b">{{nickname}}</label>
          <label v-else style="color: #62759b">{{number}}222</label>
          <br/>
          <span style="font-size: 12px;color: #999999">{{forTime(create_time)}}</span>
        </div>
        <div style="clear: both;padding: 3px 0;"></div>

        <div style="font-size: 12px;color: #333333" v-html="content"></div>

        <div class="images_box">
          <ul>
            <li v-for="img in images" class="images_item_box">
              <img :src="imgBaseUrl+img" :onerror="default_news_detail" @click="openBig(img)"/>
            </li>
          </ul>
          <div style="clear: both"></div>
        </div>


        <div style="float:right; color: #999999;">
          <i v-if="!isPraise" @click="sumPraise" class="icon iconfont icon-good" style="font-size: 12px;color: red">
            {{sum_praise}}</i>
          <i v-else @click="sumPraise" class="icon iconfont icon-good" style="font-size: 12px;"> {{sum_praise}}</i>
          <i v-if="sum_comment!=0" class="icon iconfont icon-comment"
             style="font-size: 12px; margin-left: 5px;color: #f8b31f"> {{sum_comment}}</i>
          <i v-else class="icon iconfont icon-comment" style="font-size: 12px; margin-left: 5px"> {{sum_comment}}</i>
        </div>
        <div style="clear: both;"></div>
      </div>
      <div style="border-bottom: 1px solid #e0e0e0;border-top: 1px solid #e0e0e0; height: 10px; background-color: #f3f3f3"></div>

      <div>
        <div class="all_comment"> 全部评论({{sum_comment}})</div>
        <div
          v-infinite-scroll="loadMore" v-show="!loadingon"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <div v-for=" dataComment in dataCommentList">
            <!--语音-->
            <div class="item" v-if="dataComment.type==2">
              <img class="item_header_img" :src="imgBaseUrl+dataComment.head_image"
                   style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                   :onerror="defaultHeader_small"/>
              <div class="item_hander_name">
                <label v-if="dataComment.nickname!=null">{{dataComment.nickname}}</label>
                <label v-else>{{dataComment.number}}</label>
                <br/>
                <span>{{forTime(dataComment.create_time)}}</span>
                <div>
                  <i class="icon iconfont icon-good" @click="discussPraise"> 0</i>
                  <i class="icon iconfont icon-comment" style="margin-left: 5px"> 0</i>
                </div>
              </div>
              <div class="item_contents_audio">
                <i class="icon iconfont icon-yuyin"></i>
              </div>
            </div>
            <!--图文-->
            <div class="item" v-if="dataComment.type==1">
              <img class="item_header_img" :src="imgBaseUrl+dataComment.head_image"
                   style="width:40px;height: 40px;border-radius: 50%;border: 1px solid #eaeaea"
                   :onerror="defaultHeader_small"/>
              <div style="margin-left: 45px; font-size: 13px;padding-top: 2px; position: relative">
                <label v-if="dataComment.nickname!=null">{{dataComment.nickname}}</label>
                <label v-else>{{dataComment.number}}</label>
                <br/>
                <span style="font-size: 12px;color: #999999">{{forTime(dataComment.create_time)}}</span>
                <div style="position: absolute; top: 4px; right: 0px;color: #999999">
                  <i v-if="dataComment.praise_ids==null" :id="dataComment.ids" :lang="dataComment.praise_ids"
                     @click="discussPraise(dataComment.ids,this)"
                     class="icon iconfont icon-good" style="font-size: 12px;"> {{dataComment.sum_praise}}</i>
                  <i v-else @click="discussPraise(dataComment.ids, this)" :lang="dataComment.praise_ids"
                     class="icon iconfont icon-good" style="font-size: 12px;color: red"> {{dataComment.sum_praise}}</i>
                  <i class="icon iconfont icon-comment" style="font-size: 12px; margin-left: 5px"> 0</i>
                </div>
              </div>
              <div class="item_contents_text" v-html="dataComment.content"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="lodingMore" v-show="loading">
        <mt-spinner color="#f8b31f"></mt-spinner>
        <span class="lodingNow" style="">正在加载</span>
      </div>
      <div class="lodingMore" v-show="nullData">
        <span class="lodingNow" style="color: #ccc;padding-top: 10px">没有更多数据了</span>
      </div>
      <div></div>
      <div class="father">
        <div class="left_icon_yuyin">
          <i class="icon iconfont icon-luyin" style="font-size: 20px;color: #ececec; "></i>
        </div>
        <div class="right_but">
          <mt-button type="primary"  class="but_xie" @click.native="tijiao">提交</mt-button>
        </div>
        <div class="center_content_discuss"><input type="text" class="xie" id="tianxie"   placeholder="写点什么吧"></div>
      </div>
    </div>


    <div class="divCenter" align="center"
         style="position: absolute; z-index: 9; display: none;
         background-color: #000000; width:100%; height:400px;left:0px;top:50px;
          border:1px solid #222;opacity: 0.3; filter:alpha(opacity=50)">
      <img :src="imgBaseUrl+bigImg" @click="imgClose" style="width:100%;vertical-align: middle"/>
    </div>

  </div>
</template>

<script>
  import service from '../../config/service.js'
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../service/date.js';
  import {forTime} from '../../service/time.js';
  import {getStore, getThingComment, objIsNull} from '../../service/getData.js';
  import {imgBaseUrl, defaultHeader_small, default_news_detail, defaultHeader} from '../../config/env.js'
  export default{
    data: function () {
      return {
        thingIds: '',
        create_time: '',
        province_name: '',
        city_name: '',
        nickname: '',
        head_image: '',
        comment_type: 1,//评论类型
        type: '',//身边事类型
        images: [],
        number: '',
        sum_comment: '',
        sum_praise: '',
        content: '',
        pageNumber: 1,
        pageSize: 6,
        dataCommentList: null,
        tianxie: '',
        loading: false,
        loadingon: true,
        nullData: false,
        isLoading: false,
        imgBaseUrl: imgBaseUrl,
        thing_praise: 1,//身边事点赞类型
        discuss_praise: 2,//身边事评论点赞类型
        isPraise: "true",//默认true ，没点赞 身边事
        defaultHeader_small: defaultHeader_small,//小头像
        default_news_detail: default_news_detail,
        defaultHeader: defaultHeader,//大头像
        praise_ids:'',//身边事评论点赞 默认空 没点赞
        bigImg:""

      }
    },

    mounted: function () {
      //获取我的所有身边事
      let that = this
      that.thingIds = that.$route.params.thingIds;
      let token = getStore("token")
//      if (token != null) {
      try {
        let result = service("post", '/thing/sideThing/info?token=' + token, {
          data_ids: that.thingIds
        })
        result.then(function (res) {
          if (res.errcode == 0) {
            that.isPraise = res.data.isPraise;
            console.log(that.isPraise + "======thing的isPraise");
            that.create_time = res.data.create_time;
            that.nickname = res.data.nickname;
            that.number = res.data.number;
            that.province_name = res.data.province_name;
            that.city_name = res.data.city_name;
            that.sum_comment = res.data.sum_comment;
            that.sum_praise = res.data.sum_praise;
            that.type = res.data.type;//身边事类型
            that.content = res.data.content
            that.head_image = res.data.head_image;
            if (res.data.images != null) {
              that.images = res.data.images.split(",")
            }
          } else {
            Toast("系统繁忙,请稍后再试!")
          }
        })
        this.pageSize = 6
        this.pageNumber = 1
        that.loadingon = true

      } catch (e) {
        Toast("系统繁忙，请稍后再试！");
      }
      //获取全部评论
      let result1 = getThingComment(that.thingIds, this.pageNumber, this.pageSize, token)
      result1.then(function (res1) {
        if (res1.errcode == 0) {
          console.log(res1.data)
          that.dataCommentList = res1.data.list;
          that.loadingon = false
        } else {
          Toast("系统繁忙，请稍后再试！");
        }
      })
    },
    props: [],
    components: {},
    methods: {
      //提交评论
      tijiao(){
        let that = this
        let token = getStore("token")
        if (token == null) {
          Toast("请重新登录！");
          that.$router.replace("/login")
          return;
        }

        that.tianxie = document.getElementById("tianxie").value;
        if (objIsNull(that.tianxie)) {
          Toast("请填写评论!")
          return;
        }

        try {
          let result = service('POST', '/thing/sideThingComment/create?token=' + token, {
            data_ids: that.thingIds, type: that.comment_type, content: that.tianxie, parent_ids: ''
          });
          result.then(function (res) {
            if (res.errcode != 0) {
              Toast("系统繁忙，请稍后再试!");
              return;
            }

            let result = service('get', '/customer/customer/info?token=' + token)
            result.then(function (re) {
              if (re.errcode != 0) {
                Toast("系统繁忙，请稍后再试!")
                return;
              }
              that.dataCommentList.push({
                content: that.tianxie, head_image: re.data.head_image
                , nickname: re.data.nickname, create_time: new Date().getTime(),
                type: that.comment_type, sum_comment: that.sum_comment++,
                number: re.data.number, ids: res.data.ids, sum_praise: 0
              })
              document.getElementById("tianxie").value = '';
              Toast("评论成功！");
            });
          })
        } catch (e) {
          Toast("系统繁忙，请稍后再试!");
        }
      },
      //身边事点赞
      sumPraise(){
        let that = this
        let token = getStore("token")
        if (objIsNull(token)) {
          Toast("请重新登录！");
          that.$router.replace("/login")
          return;
        }
        if (that.isPraise == null) {
          Toast("系统繁忙，请稍后再试！");
          return;
        }
        //判断是否已存在点赞
        if (!that.isPraise) {//存在可以取消 isPraise=true 没点赞
          let result = service("post", "/thing/sideThingPraise/delete?token=" + token, {
            type: that.thing_praise,
            data_ids: that.thingIds
          })
          result.then(function (res) {
            console.log(res)
            if (res.errcode != 0) {
              Toast("系统繁忙,请稍后再试!")
              return;
            }
            that.dataCommentList.push({sum_praise: that.sum_praise--})
            that.isPraise = true;
            console.log("取消")
          })
        } else { //不存在可以点赞
          let result = service("post", "/thing/sideThingPraise/create?token=" + token, {
            type: that.thing_praise,
            data_ids: that.thingIds
          })
          result.then(function (res) {
            console.log(res)
            if (res.errcode != 0) {
              Toast("系统繁忙，请稍后再试！");
              return;
            }
            that.dataCommentList.push({sum_praise: that.sum_praise++})
            that.isPraise = false;
            console.log("点赞")
          })
        }
      },

      //身边事评论 点赞
      discussPraise(sideThingDiscussIds, event){
        var target = event.event.target;
        var sum_praise = parseInt(target.innerText);
        let that = this
        let token = getStore("token")
        let praise_ids = target.getAttribute("lang");
        if (objIsNull(token)) {
          Toast("请重新登录！");
          that.$router.replace("/login")
          return;
        }

        //点赞
        if (objIsNull(praise_ids)) {
          let result = service("post", "/thing/sideThingPraise/create?token=" + token, {
            type: that.discuss_praise,
            data_ids: sideThingDiscussIds
          })
          result.then(function (res) {
            if (res.errcode != 0) {
              Toast("系统繁忙，请稍后再试！");
              return;
            }
            target.innerText = " " + (sum_praise + 1);
            target.style.color = "red"
            console.log(res.data.ids+"ids+++++++++++++++")
            target.setAttribute("lang", res.data.ids);
            console.log("点赞")

          })
        } else {
          console.log("into取消点赞")
          //取消点赞
          this.un_discussPraise(that, target, token, sideThingDiscussIds, sum_praise);
        }
      },
      //身边事评论 取消
      un_discussPraise(that, target, token, sideThingDiscussIds, sum_praise){
        let result = service("post", "/thing/sideThingPraise/delete?token=" + token, {
          type: that.discuss_praise,
          data_ids: sideThingDiscussIds
        })
        result.then(function (res) {
          console.log(res)
          if (res.errcode != 0) {
            Toast("系统繁忙，请稍后再试！");
            return;
          }
          target.innerText = " " + (sum_praise - 1);
          target.style.color = "#999999"
          target.setAttribute("lang", "")
          console.log("取消")
        })
      },

      //触发正在下拉刷新加载事件
      loadMore(){
        console.log("loadMore")
        let that = this
        let token = getStore("token")
        if (that.isLoading) {
          return
        }
        that.isLoading = true
//        that.nullData = false;
        if (that.nullData ){
          return
        }
        that.loading = true;
        setTimeout(function () {
          console.log("setTimeout")
          that.pageNumber++
          getThingComment(that.thingIds, that.pageNumber, that.pageSize, token).then(function (res) {
            if (res.errcode != "0") {
              that.loading = false;
              return
            }
//            if (res.data.list.length == 0) {
//              that.nullData = true;
//              that.loading = false;
//              return
//            }
            for (var i = 0; i < res.data.list.length; i++) {
              that.dataCommentList.push(res.data.list[i])
            }
            if (that.dataCommentList.length == res.data.totalRow) {
              that.nullData = true;
              that.loading = false;
              return
            }
          })
          that.loading = false;
          that.isLoading = false
          console.log("timeout")
        }, 2500)
        console.log("loadingoff")

      },
      forTime(time){
        return forTime(time)
      },
      openBig: function (img) {
        console.log("openBig")
        let that = this
        /*let bigImg='<div class="divCenter" align="center" style="position: absolute; '+
         'z-index: 9; display: none; background-color: #eee;' +
         ' width:100%; height:500px;left:200px;top:200px; ' +
         'border:1px solid #222;">'+
         '<img src="'+that.imgBaseUrl+img+'" @:click="'+that.imgClose+'"/>'+
         '</div>'*/
        that.bigImg = img
        document.getElementsByClassName("divCenter")[0].setAttribute("style", "position: absolute; z-index: 9; display: block;" +
          "background-color: #000000; width:100%; height:300px;left:0px;top:100px;background-color:rgba(0,0,0,0.3);line-height:300px;overflow:auto")
      },
      imgClose: function () {
        document.getElementsByClassName("divCenter")[0].setAttribute("style", " display: none;")
      },
      back_but:function(){
//         this.$router.back(-1)
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  @import "../../style/thingDetail.css";
</style>
