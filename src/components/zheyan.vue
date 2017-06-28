<template>
  <!--遮掩层-->
      <div class="zheyan">
            <mt-spinner color="#fff" type="snake" :size="60" style="margin-top:80%;display:inline-block;"></mt-spinner>
      </div>
</template>
<script>
    import { Progress } from 'mint-ui';
    export default {
        data: function () {
                return{
                }
            },
        props: [],
        components: {
         },
        methods: {

        }
    }
</script>
<style lang="css" scoped>
    .zheyan{
        width: 100%;
        height:100%;
        margin:0 auto;
        position:absolute;
        background-color:#000;
        opacity:0.3;
        text-align:center;
    }
</style>