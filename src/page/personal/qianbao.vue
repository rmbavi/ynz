<template>
  <div>
    <div style="text-align: center; padding: 10px 0px;">
      <div id="left_box" style="margin-top: 10px">
        <div style="text-align: left;">
          <div style="color: #999999;font-size: 12px">余额（元）</div>
          <div style="color: #e60100; font-size: 14px">1000.00</div>
        </div>
      </div>
      <div id="right_box">
        <div style="text-align: left;padding-top: 10px; padding-bottom: 10px">
          <div style="color: #999999; font-size: 12px">累计节省（元）</div>
          <div style="color: #e60100; ">9000.00</div>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div id="content_title">
      余额明细（元）
    </div>
    <div>
      <div class="list_item">
        <div class="list_item_left">
          <div>慧种订单支付</div>
          <div class="list_item_left_time">2017-12-11 11:21:21</div>
        </div>
        <div class="list_item_right" style="color: #36b200">+ 2222</div>
        <div style="clear: both"></div>
      </div>
      <div class="list_item_hr"></div>
    </div>

    <div class="list_item">
      <div class="list_item_left">
        <div>慧种订单支付</div>
        <div class="list_item_left_time">2017-12-11 11:21:21</div>
      </div>
      <div class="list_item_right">- 999.00</div>
      <div style="clear: both"></div>
    </div>
    <div class="list_item_hr"></div>

    <div class="list_item">
      <div class="list_item_left">
        <div>慧种订单支付</div>
        <div class="list_item_left_time">2017-12-11 11:21:21</div>
      </div>
      <div class="list_item_right">- 999.00</div>
      <div style="clear: both"></div>
    </div>
    <div class="list_item_hr"></div>
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
  #left_box {
    float: left;
    width: 39%;
    margin-left: 10%;
    border-right: 1px solid #f8b31f;
  }

  #right_box {
    float: right;
    width: 39%;
    margin-left: 10%;
    border: 0px solid #f8b31f;
  }

  #content_title {
    background-color: #edeff2;
    font-size: 12px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #7e848c;
  }

  .list_item {
    padding: 10px 20px;
    font-size: 12px;
  }

  .list_item_left {
    float: left;
    font-size: 13px;
    color: #010101;
  }

  .list_item_left_time {
    margin-top: 3px;
    color: #f8b31f;
    font-size: 12px;
  }

  .list_item_right {
    float: right;
    padding-top: 10px;
    color: #010101;
  }

  .list_item_hr {
    height: 1px;
    background-color: #dddddd;
  }
</style>
