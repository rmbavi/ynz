<template lang="html" xmlns:auto>
  <div style="width: 100%;height: 100%; overflow: auto;-webkit-overflow-scrolling: touch;">
    <div class="topSelect">
      <mt-button class="newsBtn fujin" newstype="1" id="fujin" style="color: #9fd2f6;background-color: #f7f7f7;margin-left:0%" @click.native="selectType(fujin)">
        <img src="../../image/fujin.png"  height="25" width="25" slot="icon" class="iconImg ">
        最新
      </mt-button>
      <mt-button class="newsBtn zhengfu" newstype="2" id="zhengfu" style="color: #e51c23;" @click.native="selectType(zhengfu)">
        <img src="../../image/zhengfu.png" height="25" width="25" slot="icon" class="iconImg">
        政府
      </mt-button>
      <mt-button class="newsBtn nongye" newstype="3" id="nongye" style="color: #3ea23d;" @click.native="selectType(nongye)">
        <img src="../../image/nongye.png" height="25" width="25" slot="icon" class="iconImg">
        农业
      </mt-button>
      <mt-button class="newsBtn gaoxiao" newstype="4" id="gaoxiao" style="color: #fbc02d;" @click.native="selectType(gaoxiao)">
        <img src="../../image/gaoxiao.png" height="25" width="25" slot="icon" class="iconImg">
        搞笑
      </mt-button>
    </div>

    <div class="news" v-show="!loadingon" v-cloak
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="0">
      <!--<div  style="width: 100%;">-->
      <div class="newsTop"  style="height: 17%;" v-for='(data,index) in datas' v-if="index===0" @click="getNewIfo(data.ids)">
        <div class="image">
          <img :src="imgBaseUrl+data.home_pic" width="100%" height="88%" :onerror="default_news_detail">
        </div>
        <div class="newsOthCon">
          <div class="title" ><span class="newsTitle">{{data.title}}</span></div>
          <div class="titleBottom">
            <span class="top" style="font-size: 12px">置顶</span>
            <span class="source" style="font-size: 12px">{{data.souce}}</span>
            <span class="times" style="font-size: 12px">{{forTime(data.create_time)}}</span>
            <span class="comment" style="font-size: 12px">{{data.sum_comment}}<i class="icon iconfont icon-comment commentIcon "/></span>
          </div>
        </div>
      </div>
      <div class="newsTop" v-else-if="index===1" @click="getNewIfo(data.ids)">  <!---->
        <!--<div class="newsBottom" style="margin-bottom: 8px"></div>-->
        <div class="image">
          <img :src="imgBaseUrl+data.home_pic" width="100%" height="88%" :onerror="default_news_detail">
        </div>
        <div class="newsOthCon">
          <div class="title"  ><span class="newsTitle">{{data.title}}</span></div>
          <div class="titleBottom">
            <span class="source" style="font-size: 12px">{{data.souce}}</span>
            <span class="times" style="font-size: 12px">{{forTime(data.create_time)}}</span>
            <span class="comment" style="font-size: 12px">{{data.sum_comment}}<i class="icon iconfont icon-comment commentIcon "/></span>
          </div>
        </div>
      </div>

      <div class="newsTop"  style="height: 48px;" v-else-if="index===2"  @click="getNewIfo(data.ids)" >   <!---->
        <div class="title" style="width: 100%;">
          <span class="newsTitle ellipsis" style="">{{data.title}}</span>
          <div class="titleBottom">
            <span class="source" style="font-size: 12px">{{data.souce}}</span>
            <span class="times" style="font-size: 12px">{{forTime(data.create_time)}}</span>
            <span class="comment" style="font-size: 12px">{{data.sum_comment}}<i class="icon iconfont icon-comment commentIcon "/></span>
          </div>
        </div>
      </div>
      <!--<div class="newsBottom" style="margin-bottom: 8px"></div>-->
      <div class="newsTop"  style="width: 100%;height:135px;" v-else-if="index===3">   <!---->

        <span class="newsTitle ellipsis"  @click="getNewIfo(data.ids)" style="font-size: 15px;">{{data.title}}</span>
        <div class="images">
          <img :src="imgBaseUrl+data.home_pic" width="90" height="86" alt="" :onerror="default_news_detail">
          <img :src="imgBaseUrl+data.home_pic" width="90" height="86" alt="" :onerror="default_news_detail">
          <img :src="imgBaseUrl+data.home_pic" width="90" height="86" alt="" :onerror="default_news_detail">
        </div>
        <div class="titleBottom2">
          <span class="source" style="font-size: 12px">{{data.souce}}</span>
          <span class="times" style="font-size: 12px">{{forTime(data.create_time)}}</span>
          <span class="comment" style="font-size: 12px">{{data.sum_comment}}<i class="icon iconfont icon-comment commentIcon "/></span>
        </div>

      </div>
      <div class="newsTop" v-else @click="getNewIfo(data.ids)" >  <!---->
        <!--<div class="newsBottom" style="margin-bottom: 8px"></div>-->
        <div class="image">
          <img :src="imgBaseUrl+data.home_pic" width="100%" height="88%" alt="" :onerror="default_news_detail">
        </div>
        <div class="newsOthCon">
          <div class="title"><span class="newsTitle">{{data.title}}</span></div>
          <div class="titleBottom">
            <span class="source" style="font-size: 12px">{{data.souce}}</span>
            <span class="times" style="font-size: 12px">{{forTime(data.create_time)}}</span>
            <span class="comment" style="font-size: 12px">{{data.sum_comment}}<i class="icon iconfont icon-comment commentIcon "/></span>
          </div>
        </div>
      </div>

      <div class="lodingMore" v-show="loading">
        <mt-spinner color="#f8b31f"></mt-spinner>
        <span class="lodingNow"style="">正在加载</span>
      </div>
      <div class="lodingMore" v-show="nullData">
        <span class="lodingNow"style="color: #999;padding-top: 10px">没有更多数据了</span>
      </div>

      <!--</div>-->
    </div>

    <div v-show="loadingon">
      <load></load>
    </div>
  </div>

</template>

<script>
  import {forTime} from '../../service/time.js';
  import { InfiniteScroll } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { imgBaseUrl ,default_news_detail} from '../../config/env.js';
  import {getNews} from '../../service/getData.js'
  import  load from '../../components/load.vue'
  import {monitorReturn} from '../../service/monitor'

  export default{
    data() {
      return {
        selected: "shenbian",
        datas:null,
        pageNumber:1,
        pageSize:6,
        pageType:1,
        fujin:"fujin",
        zhengfu:"zhengfu",
        nongye:"nongye",
        gaoxiao:"gaoxiao",
        tipMsg:"",
        loading:false,
        loadingon:true,
        newsType:1,
        nullData:false,
        isLoading:false,
        imgBaseUrl:imgBaseUrl,
        default_news_detail:default_news_detail

      }
    },
    filters:{

    },
    mounted: function () {
      monitorReturn(true)
      this.getNews(this.pageNumber,this.pageSize,this.newsType)
    },
    props: [],
    components: {
      load:load
    },
    methods: {
      selectType:function(type){
        document.getElementsByClassName("fujin")[0].setAttribute("style","color: #9fd2f6;")
        document.getElementsByClassName("zhengfu")[0].setAttribute("style","color: #e51c23;")
        document.getElementsByClassName("nongye")[0].setAttribute("style","color: #3ea23d;")
        document.getElementsByClassName("gaoxiao")[0].setAttribute("style","color: #fbc02d;")
        document.getElementsByClassName(type)[0].setAttribute("style","background-color:#f7f7f7;color:#f8b31f")
        this.newsType=document.getElementsByClassName(type)[0].getAttribute("newstype")
//            console.log("type",this.newsType)
        this.pageSize=6
        let that=this
        that.loadingon=true
        that.getNews(1,this.pageSize,this.newsType)
      },
      getNews:function(pageNumber,pageSize,type){
        let that = this
        let result=""
        try{
          result=getNews(pageNumber,pageSize,type)
          result.then(function(res){
//            console.log("res.data.list",res.data.list)
            that.datas=res.data.list
            that.loadingon=false
//                console.log("loadingon",that.loadingon)
          })
        }catch (e){
          that.tipMsg="系统繁忙,请稍后再试!"
          that.tip()
        }
      },
      getNewIfo(newInfoIds){
        let  that=this
        that.$router.replace({name:"newsDetail", params: { newInfoIds: newInfoIds }})
      },
      tip(){
        Toast({
          message: this.tipMsg,
        });
      },
      loadMore(){
        console.log("loadMore")
        let that=this
        if (that.isLoading){
          return
        }
        that.isLoading=true
        that.nullData = false;
        that.loading = true;
        setTimeout(function(){
         /*if (!that.isLoading){
           console.log("no isLoading")
           that.loading = false;
           that.isLoading=true
          }else{
           that.loading = true;
           console.log("isLoading")
           return
          }*/
          that.pageNumber++
          getNews(that.pageNumber,that.pageSize,that.newsType).then(function(res){
            console.log("res",res)
            if (res.errcode!="0"){
              that.loading = false;
              return
            }
            if (res.data.list.length==0){
              that.nullData = true;
              that.loading = false;
              return
            }
            for (var i=0;i<res.data.list.length;i++){
              that.datas.push(res.data.list[i])
            }
          })
          that.loading = false;
          that.isLoading=false
          console.log("timeout")
          },2500)
        console.log("loadingoff")
      },
      forTime(time){
        return forTime(time)
      },
    },
    beforeRouteUpdate (to, from, next) {
      console.log("beforeRouteUpdate222222222222222222222222-----------------------------------------")
      console.log(to)
      console.log(from)
      console.log(next)

    }
  }
</script>

<style scoped>
  @import "../../style/news.css";
</style>
