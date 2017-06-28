/**
 * Created by Administrator on 2017/5/26.
 */

import { Toast } from 'mint-ui';
import {removeStore} from  './getData.js'
import router from '../router'

export function monitorReturn(){
  let argument0=arguments[0]
  let argument1=arguments[1]
  let that=arguments[2]
  console.log("argument0",argument0)
  console.log("argument1",argument1)

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady(){
    //navigator.splashscreen.hide();
    document.addEventListener("backbutton", onBackKeyDown, false);
  }
  function onBackKeyDown() {
    if (!argument0){
      router.replace('/'+argument1)
      //router.back(-1)
      console.log("argument111111111",argument0+" "+argument1)
      argument0=true
      return
    }
    Toast('再点击一次退出!');
    document.removeEventListener("backbutton", onBackKeyDown, false); // 注销返回键
    document.addEventListener("backbutton", exitApp, false);//绑定退出事件
    // 3秒后重新注册
    var intervalID = window.setInterval(function() {
      window.clearInterval(intervalID);
      document.removeEventListener("backbutton", exitApp, false); // 注销返回键
      document.addEventListener("backbutton", onBackKeyDown, false); // 返回键
    },3000);
  }
  function exitApp(){
      removeStore("selected")
      navigator.app.exitApp();
  }
}
