<template>
  <div>
    <mt-header title="养山羊">
      <router-link to="/ynz" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!--<mt-button icon="icon iconfont icon-gou" slot="right" @click.native="saveBut">完成</mt-button>-->
    </mt-header>
    <div style="background-color: #eeeeee; height: 4px"></div>
    <div style="padding: 10px;border-bottom: 1px solid #ececec">
      <div style="float: left; width: 150px;">
        <img src="../../image/sy.jpg" width="100%" height="150">
      </div>
      <div  class="train_cp_content">
        <div class="train_cp_content_title" >关中羊关中羊关中羊关中羊关中羊关中羊关中羊关中羊关中羊关中羊关中羊关中羊</div>
        <div>数量：<span class="train_cp_content_number">10</span> 只</div>
        <div>成果收集：代卖/提货</div>
        <div>代卖收益率：10 %</div>
        <div>培育时间：3个月</div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div>
      <div class="train_progress">
        培养进度( <span style="font-size: 14px;color: #45c01a">100</span>%)
        <mt-progress :value="100" :bar-height="20"></mt-progress>
      </div>
      <div class="train_but">
        <mt-button size="large">已代卖</mt-button>
      </div>
    </div>
    <div class="daimai_title">代卖状态信息</div>
    <div style="margin-top: -5px">
      <div class="wuliu">
        <div data-mohe-type="kuaidi_new" class="g-mohe " id="mohe-kuaidi_new">
          <div id="mohe-kuaidi_new_nucom">
            <div class="mohe-wrap mh-wrap">
              <div class="mh-cont mh-list-wrap mh-unfold">
                <div class="mh-list">
                  <ul>
                    <li class="first">
                      <p>2015-04-28 11:23:28</p>
                      <p>妥投投递并签收，签收人：他人收 他人收</p>
                      <span class="before"></span><span class="after"></span><i class="mh-icon mh-icon-new"></i></li>
                    <li>
                      <p>2015-04-28 07:38:44</p>
                      <p>深圳市南油速递营销部安排投递（投递员姓名：蔡远发<a href="tel:18718860573"
                                                    style="display: initial;padding: 0;border: 0;;">18718860573</a>;联系电话：）
                      </p>
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
                      <p>泉州市速递物流分公司南区电子商务业务部已收件，（揽投员姓名：王晨光;联系电话：<a href="tel:13774826403"
                                                                   style="display: initial;padding: 0;border: 0;">13774826403</a>
                      </p>
                      <span class="before"></span><span class="after"></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {imgBaseUrl,default_news_detail,big_default_news_detail} from '../../config/env.js'
  export default {

  }
</script>

<style>
  @import "../../style/logistics.css";
  @import "../../style/trainDetail.css";

  .title {
    width: 100%;
    height: 50px;

  }

  .daimai_title{
    padding: 10px ;
    font-size: 14px;
    color: #f8b31f;
  }
</style>
