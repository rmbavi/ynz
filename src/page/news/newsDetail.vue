<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div>
    <mt-header fixed title="农家乐" style="margin-bottom: 46px">
      <router-link to="/nongjiale" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div
      v-infinite-scroll="loadMore" v-show="!loadingon"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="title_box" v-cloak>
        <div class="title">{{title}}</div>
        <span class="create_time" v-cloak>
            {{souce}}&nbsp; &nbsp;
            {{(create_time)}}
          <!--2017年05月10日 05：04:00-->
            发布</span>
        <hr size="1" color="#ececec"/>
        <div class="content_x" style="white-space: pre-wrap;word-wrap: break-word;" v-html="content">
        </div>
        <div class="img_x" >
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="img in slide_pic" :key="img.id">
              <img :src="imgBaseUrl+img"
                   :onerror="big_default_news_detail"
                   width="100%" height="100%"/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="discuss">
          <div style="width: 7px;  background-color: #fa7c00;float: left;height: 25px;margin-top: 2px"></div>
          <div style="margin-left: 20px;font-size: 13px;">大家评论&nbsp;<span style="font-size: 12px;color: #999999">({{sum_comment}}条)</span></div>
        </div>
        <div class="pl_box" v-for="newComment in dataComment">
          <img class="pl_header_box" :src="imgBaseUrl+newComment.head_image"
               :onerror="defaultHeader_small"/>
          <div class="pl_content_box">
            <div class="pl_content_head">
              <label v-if="newComment.nickname!=null">
                {{newComment.nickname}}
              </label>
              <label v-else>
                {{newComment.number}}
              </label>
              <span class="pl_content_time">{{newComment.create_time|forTime}}</span>
              <br/>
            </div>
            <div class="pl_content_text" v-html="newComment.content"></div>
          </div>
          <div style="clear: both"></div>
        </div>

        <div class="lodingMore" v-show="loading">
          <mt-spinner color="#f8b31f"></mt-spinner>
          <span class="lodingNow"style="">正在加载</span>
        </div>
        <div class="lodingMore" v-show="nullData">
          <span class="lodingNow" style="color: #999999;padding-top: 10px">没有更多数据了</span>
        </div>
      </div>
      <div class="discussing_x" >
        <div class="tainxie_box_x">
          <input type="text" class="tainxie_x"  id="tianxie"   placeholder="我也评论一下" >
        </div>
        <div class="tijiao_box_x">
          <mt-button type="primary" class="tijiao_x"  @click.native="tijiao">提交</mt-button>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
  import {imgBaseUrl, big_default_news_detail, defaultHeader_small} from '../../config/env.js'
  import {Toast} from 'mint-ui';
  import {formatDate} from '../../service/date.js';
  import {forTime} from '../../service/time.js';
  import service from '../../config/service.js'
  import {getNInfo, getComment, getStore, objIsNull} from '../../service/getData.js';
  import {monitorReturn} from '../../service/monitor'

  export default{
    data: function () {
      return {
        content: '',
        title: '',
        souce: '',
        create_time: '',
        slide_pic: '',
        pageNumber: 1,
        pageSize: 6,
        dataComment: null,
        tianxie: '',
        type: 1,
        newInfoIds: '',
        loading: false,
        loadingon: true,
        nullData: false,
        isLoading: false,
        sum_comment: '',
        tianxie: "niha",
        imgBaseUrl: imgBaseUrl,
        big_default_news_detail: big_default_news_detail,
        defaultHeader_small: defaultHeader_small,
        number: '',
      }

    },
    filters: {
      forTime(time){
        return forTime(time)
      }
    },

    props: [],
    mounted: function () {
      monitorReturn(false,"nongjiale")
      let that = this
      let newInfoIds = that.$route.params.newInfoIds;
      try {
        let result = getNInfo(newInfoIds)
        result.then(function (res) {
          if (res.errcode != 0) {
            that.tipMsg = "系统繁忙，请稍后再试！";
            that.tip();
            return;
          }

          that.newInfoIds = res.data.ids;
          that.content = res.data.content;
          that.title = res.data.title;
          that.souce = res.data.souce;
          that.create_time = formatDate(new Date(res.data.create_time), 'yyyy年MM月dd日 hh:mm');
          if (res.data.slide_pic != null) {
            that.slide_pic = res.data.slide_pic.split(',');
          }
          that.sum_comment = res.data.sum_comment;
        })
        this.pageSize = 6
        this.pageNumber = 1
        that.loadingon = true
        let result1 = getComment(newInfoIds, this.pageNumber, this.pageSize)
        that.loadingon = true
        result1.then(function (res1) {
          console.log(res1)
          if (res1.errcode != 0) {
            that.tipMsg = "系统繁忙，请稍后再试!"
            that.tip();
            return;
          }
          that.dataComment = res1.data.list
          that.loadingon = false
        })
      } catch (e) {
        that.tipMsg = "系统繁忙,请稍后再试!"
        that.tip();
      }
    },
    methods: {
      tijiao(){
        let token = getStore("token")
        let that = this
        if (objIsNull(token)) {
          that.tipMsg = "请重新登录！";
          that.tip();
          that.$router.replace("/login")
          return;
        }
        that.tianxie = document.getElementById("tianxie").value;
        if (objIsNull(that.tianxie)) {
          that.tipMsg = "请填写评论!"
          that.tip();
          return;
        }

        try {
          let result = service('POST', '/news/newComment/create?token=' + token, {
            data_ids: that.newInfoIds, type: that.type, content: that.tianxie, parent_ids: ''
          })
          result.then(function (res) {
            if (res.errcode != 0) {
              that.tipMsg = "系统繁忙，请稍后再试!"
              that.tip();
              return;
            }

            let customer = JSON.parse(getStore("customer"));
            that.dataComment.push({
              content: that.tianxie, head_image: customer.head_image
              , nickname: customer.nickname, create_time: new Date().getTime(),
              sum_comment: that.sum_comment++, number: customer.number
            })
            document.getElementById("tianxie").value = '';
            that.tipMsg = "评论成功！";
            that.tip();
          })
        } catch (e) {
          that.tipMsg = "系统繁忙，请稍后再试!"
          that.tip();
        }
      },
      formatDate(time){
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日 hh:mm');
      },
      loadMore(){
        let that = this
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
          that.pageNumber++;
          var i = 0;
          console.log(that.pageNumber+"------- 页数-------"+that.pageSize+"=="+that.newsType+"--------------新闻类型")
          getComment(that.newInfoIds, that.pageNumber, that.pageSize).then(function (res) {
            if (res.errcode != "0") {
              that.loading = false;
              return
            }

            for (i; i < res.data.list.length; i++) {
              that.dataComment.push(res.data.list[i])
            }
            if (that.dataComment.length == res.data.totalRow) {
              that.nullData = true;
              that.loading = false;
              return
            }
          })
          that.loading = false;
          that.isLoading = false
        }, 2500)
      },
      tip(){
        Toast({
          message: this.tipMsg,
        });
      },
      returnnongjiale(){
        console.log("returnnongjiale")
      }
    },

  }
</script>

<style scoped>
  @import "../../style/newsDetail.css";
</style>
