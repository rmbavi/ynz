<template>
  <div>
      <canvas id="myCanvas" class="myCanvas" width="90" height="90" v-model="value"></canvas>
  </div>
</template>

<script>
  import { Progress } from 'mint-ui';
  import {objIsNull} from '../service/getData.js'

  export default{
        data: function () {
            return{
            }
        },
        mounted(){
            //外层灰色环
            var c=null;
            if(objIsNull(this.index)){
                c=document.getElementById("myCanvas");
            }else{
                c=document.getElementsByClassName("myCanvas")[this.index];
            }
            
            var context=c.getContext("2d");
            context.beginPath();
            context.arc(40,40,35,0,2*Math.PI);
            context.lineWidth = 3;
            context.strokeStyle ="#ccc";
            context.stroke();
            context.closePath();

            //代表进度条的环
            context.beginPath();
            var anglePerSec = 2 * Math.PI / (100 / this.message); // 蓝色的弧度
            context.arc(40.5,40.5,35.5,0,2*Math.PI-anglePerSec);
            context.strokeStyle =this.linecolor;
            context.lineCap = "square";
            context.strokeStyle="#00af0b";
            context.stroke();
            context.closePath();

            context.font = "bold 13px Arial";  // 字体大小，样式
            context.fillStyle = this.color;  // 进度条颜色
            context.textAlign = 'center';  // 位置
            context.textBaseline = 'middle';  
            context.moveTo(95/2, 80/2);  // 文字填充位置
            context.textBaseline = 'middle';
            context.moveTo(90/2, 90/2);  // 文字填充位置
            context.fillText(this.value+"%", 85/2, 100/2-20);
            context.fillText("---------", 80/2, 120/2-20);
            context.fillText(this.zt, 85/2, 70/2+20);
        },
        props: ['message','linecolor','value','zt','index'],
        components: {
         },
        methods: {

        }
    }
</script>
