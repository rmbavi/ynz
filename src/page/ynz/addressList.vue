<template>
    <div>
      <mt-header title="管理收货地址">
        <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
      </mt-header>

     <div class="add_all" >
         <div v-for="(data,index) in datas">
            <div class="addressall" >
                <div class="address_t">
                    <span class="t_f">{{data.names}}</span><span class="t_s">{{data.phone}}</span>
                </div>
                <div class="address_m">
                    <span>{{data.province_name}} {{data.city_name}} {{data.detailed}}</span>
                </div>
                <div class="address_d">
                    <span class="d_l" v-show="isdefault(data.is_default)">默认地址</span>
                    <span class="d_l" v-show="!isdefault(data.is_default)" style="left:10px;color:#000" @click="updateDefault(data.ids)">设为默认地址</span>
                    <!--<img src="../../image/address_add.png" />-->
                       <i class="iconfont icon-bianji1 d_img1" ></i>
                    <span class="d_r1" @click="toAddressEdit(data)">编辑</span>
                    <span class="d_r2" @click="deleteAddress(data.ids)">删除</span>
                       <i class="iconfont icon-shanchu  d_img2" ></i>
                 
                </div>
            </div>
            <div class="midblack"></div>
        </div>

         <div class="address_down">
             <mt-button type="danger" size="large" class="down_btn" @click="toAddAddress">
               <i class="iconfont icon-jia" style="vertical-align: top;font-size: 14px"></i>  新建地址</mt-button>
         </div>
         <div class="down_white"></div>

         </div>
</div>
</template>

<script>
import {getAddressList,getStore,objIsNull,deleteAddressInfo,updateDefaultAddressInfo} from '../../service/getData.js'
import { MessageBox } from 'mint-ui';
import {Toast} from 'mint-ui'
  export default{
        data: function () {
            return{
                datas:[],
                token:"",
                defaultAddress:[],
            }
        },
        mounted(){
            let token =getStore("token")
            let that=this
            if(!objIsNull(token)){
                that.getAddressInfo(token)
                that.token=token;
            }else{
                Toast("没有登录信息,请重新登录!")
                that.$router.replace("/login")
            }

        },
        props: [],
        components: {},
        methods:{
          getAddressInfo(token){
            let that=this
            getAddressList(token).then(function(res){
                console.log("address-res",res)
                if(res.errcode=="0"){
                    that.datas=res.data
                }
            })
          },
          toAddAddress(){
            console.log("this.$route.params3333333333",this.$route.params)
              this.$router.push({name:"manageAddress",params:this.$route.params})
          },
          returnAddress(){

          },
          isdefault(isdef){
            if(isdef=="0"){
                return true
            }else{
                return false
            }
          },
          toAddressEdit(data){
              this.$router.replace({name:"manageAddressEdit",params:{data:data}})
          },
          deleteAddress(ids){
            let that = this
            MessageBox.confirm('确定删除吗?').then(action => {
                deleteAddressInfo(ids,that.token).then(function(res){
                    if(res.errcode=="0"){
                        Toast("删除成功!")
                        that.getAddressInfo(that.token)
                    }else{
                        Toast("系统繁忙,请稍后再试!")
                    }
                })
            });
          },
          updateDefault(ids){
            let that = this
            updateDefaultAddressInfo(ids,that.token).then(function(res){
                 if(res.errcode=="0"){
                    Toast("更换成功!")
                    that.getAddressInfo(that.token)
                 }else{
                    Toast("系统繁忙,请稍后再试!")
                }
            })
          } ,
          //返回
          backUrl(){
            console.log("this.$route.params返回列表", this.$route.params)
            if (!objIsNull(this.$route.params.ids)){
              this.$router.replace({name:"selectShouHuoAddress",params:{tiJiaoCommodity:this.$route.params}});
            }else {
              this.$router.go(-1)
            }

          }

        }
  }
</script>

<style lang="css" scoped>
  @import "../../style/addressList.css";
</style>
