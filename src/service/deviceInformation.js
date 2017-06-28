/**
 * Created by panda on 17/5/13.
 * 用于获取手机的地理位置
 */
import service from '../config/service.js'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import router from '../router'

let gaode_webserver_key = "4a83a0e1e4ba75d47f111008991fddb3";

const cityForPosition = (longitude,latitude) => {
  console.log("cityForPosition,",longitude,latitude)
  return new Promise((resolve, reject)=>{
    let getUrl = "http://restapi.amap.com/v3/geocode/regeo?output=json&location="+longitude+","+latitude+"&key="+gaode_webserver_key+"&extensions=base"
    let posistion_array = service('GET', getUrl, {}, false)
    posistion_array.then((res) => {
      if (res.status == "1") {
        let info = res.regeocode.addressComponent;
        let result = {
          "country":info.country,
          "province":info.province,
          "city":info.city,
          "citycode":info.citycode,
          "district":info.district,
          "adcode":info.adcode,
          "township":info.township,
          "towncode":info.towncode
        }
        resolve(result)
      }
    })
  });
}

const locationSuccess = (p)=>{
  console.log("promise is success，定位成功了")
  let tp = {"longitude":p.coords.longitude,"latitude":p.coords.latitude}
  return resolve(tp);
}

const locationError = (error)=>{
  console.log(error)

  console.log("promise is error")
    console.log("error",error)
    Toast('定位错误,请手动选择地址');
    // Toast('定位错误,尝试浏览器定位');
    // console.log("启动地图导航模式")
    let mapObj = new AMap.Map('temp_map');
    let geolocation;
    mapObj.plugin('AMap.Geolocation', function () {
         geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000          //超过10秒后停止定位，默认：无穷大
        });
        mapObj.addControl(geolocation);
        AMap.event.addListener(geolocation, 'complete', function(p){
          let tp = {"longitude":p.position.getLng(),"latitude":p.position.getLat()}
          mapObj.destroy()
          return resolve(tp);
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', ()=>{
            console.log("高德定位也失败了")
            mapObj.destroy()
            return reject(error)
        }); //返回定位出错信息
    });
    geolocation.getCurrentPosition();

  switch(error.code) {
    case error.TIMEOUT:
      Toast("A timeout occured! Please try again!连接超时，请重试 ");
      break;
    case error.POSITION_UNAVAILABLE:
      Toast('We can\'t detect your location. Sorry!亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务');
      break;
    case error.PERMISSION_DENIED:
      Toast('Please allow geolocation access for this to work.您拒绝了使用位置共享服务，查询已取消');
      break;
    case error.UNKNOWN_ERROR:
      Toast('An unknown error occured!');
      break;


  }
}


const position = () => {
  return new Promise((resolve, reject) => {
    console.log("判断navigator.geolocation", navigator.geolocation);
    // if (navigator.geolocation) {
    //   console.log("正在进行GPS定位！")
    //   navigator.geolocation.getCurrentPosition((p)=>{
    //     console.log("promise is success，定位成功了")
    //     let tp = {"longitude":p.coords.longitude,"latitude":p.coords.latitude}
    //     return resolve(tp);
    //   }, (error)=>{
    //     console.log("promise is error")
    //     console.log("error",error)
    //     Toast('定位错误,尝试浏览器定位');
    //     // console.log("启动地图导航模式")
    //     let mapObj = new AMap.Map('temp_map');
    //     let geolocation;
    //     mapObj.plugin('AMap.Geolocation', function () {
    //       geolocation = new AMap.Geolocation({
    //         enableHighAccuracy: true,//是否使用高精度定位，默认:true
    //         timeout: 5000          //超过10秒后停止定位，默认：无穷大
    //       });
    //       mapObj.addControl(geolocation);
    //       AMap.event.addListener(geolocation, 'complete', function(p){
    //         let tp = {"longitude":p.position.getLng(),"latitude":p.position.getLat()}
    //         mapObj.destroy()
    //         return resolve(tp);
    //       });//返回定位信息
    //       AMap.event.addListener(geolocation, 'error', ()=>{
    //         console.log("高德定位也失败了")
    //         mapObj.destroy()
    //         return reject(error)
    //       }); //返回定位出错信息
    //     });
    //     geolocation.getCurrentPosition();
    //
    //     switch(error.code) {
    //       case error.TIMEOUT:
    //         Toast("A timeout occured! Please try again!连接超时，请重试 ");
    //         break;
    //       case error.POSITION_UNAVAILABLE:
    //         Toast('We can\'t detect your location. Sorry!亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务');
    //         break;
    //       case error.PERMISSION_DENIED:
    //         Toast('Please allow geolocation access for this to work.您拒绝了使用位置共享服务，查询已取消');
    //         break;
    //       case error.UNKNOWN_ERROR:
    //         Toast('An unknown error occured!');
    //         break;
    //     }
    //     }, {
    //     // 指示浏览器获取高精度的位置，默认为false
    //     enableHighAccuracy: true,
    //     // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
    //     timeout: 5000,
    //     // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
    //     maximumAge: 3000
    //   });
    //
    // } else {
    //   Toast("Your browser does not support Geolocation!");
    //   Toast("浏览器不支持html5来获取地理位置信息");
    // }

    if(!navigator.geolocation){
      // Toast("Your browser does not support Geolocation!");
      // Toast("浏览器不支持html5来获取地理位置信息");
      return;
    }

    navigator.geolocation.getCurrentPosition(
    //正确的回调
    function(p){
      console.log("promise is success，定位成功了")
      let tp = {"longitude":p.coords.longitude,"latitude":p.coords.latitude}
      return resolve(tp);
    },
    //错误的回调
    (error) => {
      router.replace("/manualSelectAddress")
      console.log("promise is error")
      Toast('无法获取你的定位信息,请手动选择位置');
      console.log("error",error)
      // Toast('定位错误,尝试浏览器定位');
      // console.log("启动地图导航模式")
      try {
        /*let mapObj = new AMap.Map('temp_map');
        let geolocation;
        mapObj.plugin('AMap.Geolocation', function () {
             geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000          //超过10秒后停止定位，默认：无穷大
            });
            mapObj.addControl(geolocation);
            AMap.event.addListener(geolocation, 'complete', function(p){
              let tp = {"longitude":p.position.getLng(),"latitude":p.position.getLat()}
              mapObj.destroy()
              return resolve(tp);
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error', ()=>{
                console.log("高德定位也失败了")

                //mapObj.destroy()
                return reject(error)
            }); //返回定位出错信息
        });
        geolocation.getCurrentPosition();*/
      } catch (e) {
        //如果浏览器定位也错误，采用手工选择地址
        console.log("浏览器定位也出现错误了。这就尴尬了",e)

      } finally {

      }
    },{
        // 指示浏览器获取高精度的位置，默认为false
        enableHighAccuracy: true,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 5000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
    });
    //代码结束位置
  });
}
const panda = () => {
  let platform = device.platform;
  return platform
}
export {
  position,panda,cityForPosition
}
