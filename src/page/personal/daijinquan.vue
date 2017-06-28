<template>
  <div style="background-color:#edeff2; height: 100%; min-height: 100%;position: absolute;bottom: 0;
      right: 0; top: 93px; left: 0;">
    <div class="djq_box_div">
      <div class="djq_left">
        <!--<div class="djq_left_context">-->
        <div style="float: left;">
          <div class="stamp_01"></div>
          <div style="clear: both"></div>
        </div>
        <div class="djq_left_context">
          <div style="padding-bottom: 3px">50 元</div>
          <div style="">代金券</div>
        </div>
        <div style="float: right;background-color: #edeff2;">
          <!--<div class="" style="">-->
          <div class="stamp stamp_02"></div>
          <!--</div>-->
          <div class="stamp_buttom" style="right: 0px;">
            <div class="stamp stamp_04"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <!--</div>-->
      </div>
      <div class="djq_right">
        <div class="djq_right_left">
          <div style="background-color: #edeff2">
            <div class="stamp stamp_03"></div>
          </div>
          <div class="stamp_buttom">
            <div class="stamp stamp_05"></div>
          </div>
        </div>
        <div class="djq_right_context">
          <div style="padding-bottom: 6px;">满100元减50元</div>
          <div class="youxiaoqi">有效期2017-04-11至2018-04-11</div>
        </div>

        <div class="djq_right_right">
          <div class="stamp_06" style="clear: both"></div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>

    <div class="djq_box_div">
      <div class="djq_left">
        <!--<div class="djq_left_context">-->
        <div style="float: left;">
          <div class="stamp_01"></div>
          <div style="clear: both"></div>
        </div>
        <div class="djq_left_context">
          <div style="padding-bottom: 3px">50 元</div>
          <div style="">代金券</div>
        </div>
        <div style="float: right;background-color: #edeff2;">
          <!--<div class="" style="">-->
          <div class="stamp stamp_02"></div>
          <!--</div>-->
          <div class="stamp_buttom" style="right: 0px;">
            <div class="stamp stamp_04"></div>
          </div>
        </div>
        <div style="clear: both"></div>
        <!--</div>-->
      </div>
      <div class="djq_right">
        <div class="djq_right_left">
          <div style="background-color: #edeff2">
            <div class="stamp stamp_03"></div>
          </div>
          <div class="stamp_buttom">
            <div class="stamp stamp_05"></div>
          </div>
        </div>
        <div class="djq_right_context">
          <div style="padding-bottom: 6px;">满100元减50元</div>
          <div class="youxiaoqi">有效期2017-04-11至2018-04-11</div>
        </div>

        <div class="djq_right_right">
          <div class="stamp_06" style="clear: both"></div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data: function () {
      return {}
    },
    props: [],
    components: {},
    methods: {}
  }
</script>

<style scoped>
  body {
    background-color: #edeff2;
  }

  .djq_box_div {
    background-color: #f00;
    margin: 0px 10px;
    font-size: 14px;
    margin-top: 20px;
  }

  .djq_box_div .djq_left {
    color: #FFFFFF;
    /*background-color: #edeff2;*/
    /*height: 100%;*/
    float: left;
    background-color: #ff7e00;
    position: relative;
  }

  .djq_left_context {
    float: left;
    padding-top: 28px;
    height: 72px;
    width: 70px;
    text-align: center;
  }

  .djq_box_div .djq_right {
    background-color: #ffffff;
  }

  .djq_right_left {
    float: left;
    height: 100px;
    position: relative;
  }

  .djq_right_context {
    float: left;
    padding-top: 30px;
    border: 0px solid;
    margin-right: 0px
  }

  .djq_right_right {
    float: right;
    background-color: #ececec
  }

  .youxiaoqi {
    color: #999999;
    font-size: 12px;
  }

  .stamp {
    width: 9px;
    height: 10px;
    border: 0px;
    background: #cecece;
  }

  .stamp_buttom {
    background-color: #edeff2;
    position: absolute;
    bottom: 0px;
  }

  .stamp_01 {
    float: right;
    width: 10px;
    height: 100px;
    background-color: #ff7e00;
    /*background: #f8b31f;*/
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #f8b31f 7px);
    background-size: 20px 20px;
    background-position: 0px 20px;
  }

  .stamp_01:before {
    background-color: #F39B00;
  }

  .stamp_02 {
    /*border: 0px;*/
    /*background: #cecece;*/
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #ff7e00 7px);
    background-size: 20px 20px;
    background-position: 20px 10px;
  }

  .stamp_02:before {
    background-color: #ff7e00;
  }

  .stamp_03 {
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #ffffff 7px);
    background-size: 20px 20px;
    background-position: 10px 10px;
  }

  .stamp_04 {
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #ff7e00 7px);
    background-size: 20px 20px;
    background-position: 0px 0px;
  }

  .stamp_05 {
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #ffffff 7px);
    background-size: 20px 20px;
    background-position: 10px 0px;
  }

  .stamp_06 {
    background-color: #ececec;
    background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 5px, #ffffff 7px);
    background-size: 20px 20px;
    background-position: 0px 20px;
    float: right;
    width: 10px;
    height: 100px;
  }

  .demo {
    padding: 20px;
  }

  /*.stamp *{*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*list-style:none;*/
  /*font-family:"Microsoft YaHei",'Source Code Pro',*/
  /*Menlo, Consolas, Monaco, monospace;*/
  /*}*/


</style>
