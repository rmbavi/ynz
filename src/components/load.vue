<template lang="html">
  <div style="padding-top:120px;">
      <div class="csshub-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div style="text-align:center;font-size:13px;color:#999; padding-top:10px;">
        正在努力加载数据...
      </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="css">
.csshub-loading {
  text-align: center
}

.csshub-loading > div {
  background-color: #f8b31f;
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: csshub-line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
          animation: csshub-line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85); }

.csshub-loading > div:nth-child(2), .csshub-loading > div:nth-child(4) {
  -webkit-animation-delay: -0.4s !important;
          animation-delay: -0.4s !important; }

.csshub-loading > div:nth-child(1), .csshub-loading > div:nth-child(5) {
  -webkit-animation-delay: -0.2s !important;
          animation-delay: -0.2s !important; }



@-webkit-keyframes csshub-line-scale-pulse-out {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }
  50% {
    -webkit-transform: scaley(0.4);
            transform: scaley(0.4); }
  100% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }

@keyframes csshub-line-scale-pulse-out {
  0% {
    -webkit-transform: scaley(1);
            transform: scaley(1); }
  50% {
    -webkit-transform: scaley(0.4);
            transform: scaley(0.4); }
  100% {
    -webkit-transform: scaley(1);
            transform: scaley(1); } }
</style>
