<template>
    <div>
        <mt-header title="我的农庄" fixed>
            <router-link to="/ynz" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <mt-navbar v-model="selected" style="margin-top:50px">
            <mt-tab-item id="0" @click.native="toSelect('0')">培育中</mt-tab-item>
            <mt-tab-item id="1" @click.native="toSelect('1')">已成熟</mt-tab-item>
            <mt-tab-item id="2" @click.native="toSelect('2')">收获中</mt-tab-item>
            <mt-tab-item id="3" @click.native="toSelect('3')">已收获</mt-tab-item>
        </mt-navbar>
        <div v-show="!loadingon">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="0">
                    <div v-show="datas[0]!=undefined" v-for="(data0,index) in datas[0]" style="position:relative;border-bottom:1px solid #e6e1e1" @click="toTrainDetail(data0.ids,data0.commodity_ids)">
                        <div class="content_pay">
                            <div class="img_sp">
                                <img :src="returnImgs(data0.imgs)" alt="" :onerror="default_news_detail">
                            </div>
                            <div class="content_text">
                                <p class="name_sp">{{data0.names}}</p>
                                <span class="normal_text" style="margin-left:5px">购买数量</span>
                                <span class="number_text">{{data0.number}}</span>
                                <span class="normal_text">({{Myfanyi(data0.unit)}})</span> <br>
                                <span class="normal_text" style="margin-left:5px">{{matureTime(data0.create_time)}}天后成熟</span>
                            </div>
                            <div class="pro_sp">
                            <myCanvas :index='index' :message='matureTime(data0.create_time)' linecolor=#37b304 :value='(data0.traim_time-matureTime(data0.create_time))' zt=培育中></myCanvas>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <div v-show="datas[0]==undefined" class="notData"><span>没有数据</span></div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <div v-show="datas[1]!=undefined" v-for="(data1,index) in datas[1]" style="position:relative;border-bottom:1px solid #e6e1e1" @click="toRipeDetail(data1.ids,data1.commodity_ids)">
                        <div class="content_pay" >
                            <div class="img_sp">
                                <img :src="returnImgs(data1.imgs)" alt="">
                            </div>
                            <div class="content_text">
                                <p class="name_sp">{{data1.names}}</p>
                                <span class="normal_text" style="margin-left:5px">购买数量</span>
                                <span class="number_text">{{data1.number}}</span>
                                <span class="normal_text">({{Myfanyi(data1.unit)}})</span> <br>
                                <span class="normal_text" style="margin-left:5px;color:#f8b31f">已成熟</span>
                            </div>
                            <div class="pro_sp">
                            <myCanvas :index='index+length[0]' message=0 linecolor=#ec6464 value=100 zt=已成熟></myCanvas>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <div v-show="datas[1]==undefined" class="notData"><span>没有数据</span></div>
                </mt-tab-container-item>

                <mt-tab-container-item id="2">
                    <div v-show="datas[2]!=undefined" v-for="(data2,index) in datas[2]" style="position:relative;border-bottom:1px solid #e6e1e1" @click="toHarvest(data2.ids,data2.commodity_ids)">
                        <div class="content_pay">
                            <div class="img_sp">
                                <img :src="returnImgs(data2.imgs)" alt="">
                            </div>
                            <div class="content_text">
                                <p class="name_sp">{{data2.names}}</p>
                                <span class="normal_text" style="margin-left:5px">购买数量</span>
                                <span class="number_text">{{data2.number}}</span>
                                <span class="normal_text">({{Myfanyi(data2.unit)}})</span> <br>
                                <span class="normal_text" style="margin-left:5px;color:#ec6464">收获中</span>
                            </div>
                            <div class="pro_sp">
                            <myCanvas :index='index+length[0]+length[1]' message=0 linecolor=#ec6464 value=100 zt=收获中></myCanvas>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <div v-show="datas[2]==undefined" class="notData"><span>没有数据</span></div>
                </mt-tab-container-item>

                <mt-tab-container-item id="3">
                    <div v-show="datas[3]!=undefined" v-for="(data3,index) in datas[3]" style="position:relative;border-bottom:1px solid #e6e1e1" @click="toHarvest(data2.ids,data2.commodity_ids)">
                        <div class="content_pay">
                            <div class="img_sp">
                                <img :src="returnImgs(data3.imgs)" alt="">
                            </div>
                            <div class="content_text">
                                <p class="name_sp">{{data3.names}}</p>
                                <span class="normal_text" style="margin-left:5px">购买数量</span>
                                <span class="number_text">{{data3.number}}</span>
                                <span class="normal_text">({{Myfanyi(data3.unit)}})</span> <br>
                                <span class="normal_text" style="margin-left:5px;color:#ec6464">已收获</span>
                            </div>
                            <div class="pro_sp">
                            <myCanvas :index='index+length[0]+length[1]+length[2]' message=0 linecolor=#ec6464 value=100 zt=已收获></myCanvas>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                    <div v-show="datas[2]==undefined" class="notData"><span>没有数据</span></div>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>

        <div v-show="loadingon">
            <load></load>
        </div>

    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    import myCanvas from '../../components/progress.vue'
    import { Navbar, TabItem } from 'mint-ui';
    import {objIsNull,setStore,getStore,getOrder,getOrderInfo} from '../../service/getData.js'
    import {imgBaseUrl,default_news_detail} from '../../config/env.js'
    import {fanyi} from '../../service/unit.js'
    import  load from '../../components/load.vue'

    let myMzArray=["trainDetail","ripe","harvest"]
    export default {
        data: function () {
            return{
               selected:"0",
               datas:[],
               status:0,
               token:"",
               length:[0,0,0,0,0,0],
               default_news_detail:default_news_detail,
               commodity_ids:"",
               loadingon:true,
               orderStatus:[2,3,4,6], //0未支付 2已支付 3 已成熟 4收获中 5发货中 6完成收获
               csTime:"",//成熟时间
            }
        },
         mounted(){
           let that=this
           that.token = getStore("token")
           if (!objIsNull(getStore("myNzselected",this.selected))){
             that.selected=getStore("myNzselected",this.selected)
           }
           if(objIsNull(that.token)){
                Toast("没有登录信息,请重新登录")
                that.$router.replace("/login")
           }else{
               that.getData(that.selected)
           }
        },
        props: [],
        components: {
            myCanvas:myCanvas,
            load:load
        },
        methods :{
            getData(number){
                let that=this
                // console.log("that.orderStatus.length",that.orderStatus.length)
                // if(that.status<that.orderStatus.length){
                    that.loadingon=true
                    getOrder(that.orderStatus[number],that.token).then(function(res){
                        console.log("res",res)
                        if(res.errcode=="0"){
                            if(res.data.length!=0){
                                that.datas[number]=res.data
                                that.length[number]=res.data.length
                                // that.status+=1
                                // that.getData(that.status)
                                console.log("that.datas",that.datas)
                            }
                        }
                        that.loadingon=false
                    })
                // }else{
                    
                // }
            },
            //切换面饭
            toSelect(number){
                console.log(number+"----toTrainDetail---------")
                let that = this
                that.getData(number)
                that.selected = number;
            },
            returnHeadImg(url){
                return imgBaseUrl+url
            },
            Myfanyi(danwei){
                return fanyi(danwei)
            },
            toTrainDetail(ids,commodity_ids){
              setStore("myNzselected",this.selected)
              console.log(ids+"----toTrainDetail---------")
               this.$router.replace({name:"trainDetail",params:{ids:ids}})
            },
            toRipeDetail(ids,commodity_ids){
              setStore("myNzselected",this.selected)
              console.log(ids+"----toTrainDetail2---------")
                this.$router.replace({name:"ripe",params:{ids:ids,commodity_ids:commodity_ids}})
            },
            toHarvest(ids,commodity_ids){
              setStore("myNzselected",this.selected)
              console.log(ids+"----toTrainDetail3---------")
                this.$router.replace({name:"harvest",params:{ids:ids,commodity_ids:commodity_ids}})
            },
            matureTime(time){
                let data1=new Date().getTime();
                let timestamp2 = Date.parse(new Date(time));
                let date3=data1-timestamp2
                let days=Math.floor(date3/(24*3600*1000))
                return 100-days
            },
            returnImgs(url){
                return imgBaseUrl+url
            }

        }
    }
</script>
<style lang="css" scoped>
    @import '../../style/pay.css';
</style>
