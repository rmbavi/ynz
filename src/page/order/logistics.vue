<template>
    <div class="order">
      <mt-header title="物流详情">
        <router-link to="/index" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <!--<mt-button icon="more" slot="right" @click="toPanda"></mt-button>-->
      </mt-header>
      <div class="title_box">
        <table class="table_class" >
          <tr>
            <td>运单编号61348785</td>
            <td style="color:#35b200 ">已签收</td>
          </tr>
          <tr>
            <td class="font_td_x">承运来源：顺丰快递</td>
            <td class="font_td_x">客服电话：95338</td>
          </tr>
        </table>
      </div>
      <div style="height: 10px ;background: #ececec"></div>
      <div>
        <div style="padding: 4px;font-size: 14px;margin-top: 4px;margin-left: 5px">本数据由顺丰快递提供</div>
      </div>
      <div  class="wuliu">
        <div data-mohe-type="kuaidi_new" class="g-mohe " id="mohe-kuaidi_new">
          <div id="mohe-kuaidi_new_nucom">
            <div class="mohe-wrap mh-wrap">
              <div class="mh-cont mh-list-wrap mh-unfold">
                <div class="mh-list">
                  <ul>
                    <li class="first">
                      <p>2015-04-28 11:23:28</p>
                      <p>妥投投递并签收，签收人：他人收</p>
                      <span class="before"></span><span class="after"></span><i class="mh-icon mh-icon-new"></i></li>
                    <li>
                      <p>2015-04-28 07:38:44</p>
                      <p>深圳市南油速递营销部安排投递 (投递员姓名：蔡远发;联系电话：<a href="tel:18718860573" style="display: initial;padding: 0;border: 0;;">18718860573 </a>)</p>
                      <span class="before"></span><span class="after"></span></li>
                    <li>
                      <p>2015-04-28 05:08:00</p>
                      <p>到达广东省邮政速递物流有限公司深圳航空邮件处理中心处理中心（经转）</p>
                      <span class="before"></span><span class="after"></span></li>
                    <li>
                      <p>2015-04-28 00:00:00</p>
                      <p>离开中山市 发往深圳市（经转）</p>
                      <span class="before"></span><span class="after"></span></li>
                    <li>
                      <p>2015-04-27 15:00:00</p>
                      <p>到达广东省邮政速递物流有限公司中山三角邮件处理中心处理中心（经转）</p>
                      <span class="before"></span><span class="after"></span></li>
                    <li>
                      <p>2015-04-27 08:46:00</p>
                      <p>离开泉州市 发往中山市</p>
                      <span class="before"></span><span class="after"></span></li>
                    <li>
                      <p>2015-04-26 17:12:00</p>
                      <p>泉州市速递物流分公司南区电子商务业务部已收件，（揽投员姓名：王晨光;联系电话：<a href="tel:13774826403" style="display: initial;padding: 0;border: 0;">13774826403</a></p>
                      <span class="before"></span><span class="after"></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
        data: function () {
            return{

            }
        },
        props: [],
        components: {},
        methods: {}
    }
</script>

<style scoped>
  @import "../../style/logistics.css";
</style>
