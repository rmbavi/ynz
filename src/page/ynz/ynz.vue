<template>
    <div>
      <div v-for="(mydata,index) in datas" v-show="!loadingon">
        <div style="overflow: hidden">
        <div style="height: 3px; background-color: #f2f2f2"></div>
        <div class="classify_title">{{mydata.names}}</div>
        <div>
          <ul>
            <li v-for="(sp,index) in mydata.commodityList">
              <div class="ynz_box" @click="toCommodityDetail(sp.ids)">
                <div class="ynz_box_img">
                  <img :src="spimg(sp.head_img)" height="60px"  width="60px" :onerror="default_img">
                </div>
                <div class="ynz_box_title">
                  {{sp.names}}
                </div>
              </div>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        </div>

        
    </div>
        <div v-show="loadingon">
            <load></load>
        </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {imgBaseUrl,default_news_detail} from '../../config/env.js'
  import {getYNZ,getStore,objIsNull} from "../../service/getData.js"
  import  load from '../../components/load.vue'

  export default{
    data: function () {
      return {
        default_img: default_news_detail,
        datas: [],
        loadingon:true,
      }
    },
    mounted(){
      let that = this
      let token = getStore("token")
      console.log("token", token)
      // if (!objIsNull(token)) {
        getYNZ(token).then(function (res) {
          console.log("res", res)
          if (res.errcode == "0") {
            that.datas = res.data
            console.log("that.datas", that.datas)
            that.loadingon = false
          }
        })
      // }else{
      //   Toast("登陆信息无效,请重新登陆")
      //   that.$router.replace("/login")
      // }

    },
    props: [],
    components: {
      load: load
    },
    methods: {
      toCommodityDetail: function (ids) {
        this.$router.replace({name: "commodityDetail", params: {ids: ids}})
      },
      spimg(url){
        return imgBaseUrl + url
      }
    }
  }
</script>

<style lang="css" scoped>
  ul li {
    width: 33.3333%;
    float: left;
  }

  .ynz_box {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .ynz_box_img {
    width: 100%;
    height: 60px;
  }

  .ynz_box_title {
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0px 10px;
  }

  .classify_title {
    color: #f8b31f;
    font-size: 12px;
    padding: 10px 10px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5
  }
</style>
