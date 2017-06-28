<template>
    <div>
      <mt-header fixed title="选择收货地址">
        <mt-button icon="back" slot="left" @click.native="backUrl"></mt-button>
        <mt-button slot="right" @click.native="managerAddressBut">管理</mt-button>
      </mt-header>
      <div class="add_all">
        <div class="addressall" style="border-bottom: 1px solid #ececec">
          <div class="address_t">
            <span class="t_f">James</span><span class="t_s">13288465105</span>
          </div>
          <div class="address_m">
            <span class="default_address_label">[默认地址]</span>
            <span>广东省广州市番禺区南村镇华南碧桂园 翠山蓝天二街108号</span>
          </div>
        </div>
        <div class="addressall" style="border-bottom: 1px solid #ececec">
          <div class="address_t">
            <span class="t_f">James</span><span class="t_s">13288465105</span>
          </div>
          <div class="address_m">
            <span>广东省广州市番禺区南村镇华南碧桂园 翠山蓝天二街108号</span>
          </div>
        </div>
        <div class="addressall" style="border-bottom: 1px solid #ececec">
          <div class="address_t">
            <span class="t_f">James</span><span class="t_s">13288465105</span>
          </div>
          <div class="address_m">
           <span>广东省广州市番禺区南村镇华南碧桂园 翠山蓝天二街108号</span>
          </div>
        </div> <div class="addressall" style="border-bottom: 1px solid #ececec">
        <div class="address_t">
          <span class="t_f">James</span><span class="t_s">13288465105</span>
        </div>
        <div class="address_m">
         <span>广东省广州市番禺区南村镇华南碧桂园 翠山蓝天二街108号</span>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
  import {objIsNull} from '../../service/getData.js'
    export default{
        data: function () {
          return{

          }

        },
        props: [],
        components: {},
        methods: {
          //跳转到管理地址
          managerAddressBut(){
            this.$router.replace({name:"addressList",params:this.$route.params.tiJiaoCommodity})
          },
          //返回
          backUrl(){
              if (!objIsNull(this.$route.params.tiJiaoCommodity.ids)){
                this.$router.replace({name:"ynzssw",params:this.$route.params.tiJiaoCommodity});
              }else {
                this.$router.go(-1)
              }

          }
        }
    }
</script>

<style>
  @import "../../style/addressList.css";
</style>
