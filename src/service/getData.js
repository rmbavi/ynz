/**
 * Created by Administrator on 2017/5/15.
 */
import fetch from '../config/fetch.js'
import service from '../config/service.js'

/**
 * 创建临时数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    console.log(data)
    resolve(data)
  })
};
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);//从一个对象解析出字符串
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 判断值是否是空 是空返回true，不是空返回false；
 * @param data
 */
const objIsNull = data => {
  var flag = true;
  if (data != null && data!=undefined && data != "" && data != "null" && data != "nil" && data != "undefined") {
    flag = false;
  }
  return flag;
}


const sendLogin = (phone,code) => service('POST','/publics/login/phoneVali',{phone:phone,code:code})
const getYzm = phone => service('POST','/publics/sms/sendCode',{phone:phone})
const getKey =()=>service('GET','/publics/login/getKey')
const register = (phone,code,password) => service('POST','/publics/login/register',{phone:phone,code:code,password:password})
const change = (phone,code,password) => service('POST','/publics/login/reset',{phone:phone,code:code,password:password})
const getNews =(pageNumber,pageSize,type)=>service('POST','/news/newInfo/get',{pageNumber:pageNumber,pageSize:pageSize,type:type})
const getCustomer=(token)=>service('GET','/customer/customer/info',{},true,token)
const saveImgBase64=(file,type)=>service('POST','/uploads/imgUpload/upLoadImgFile',{file:file,type:type})
const release=(category,type,images,content,latitude,longitude,province,city,district,township,address,loginToken)=>service('POST','/thing/sideThing/create?token='+loginToken,
  {category:category,type:type,images:images,content:content,latitude:latitude,longitude:longitude,province:province,city:city,district:district,township:township,address:address,loginToken:loginToken})
const getNInfo=(newInfoIds)=>service('POST','/news/newInfo/info',{data_ids:newInfoIds})
const getComment=(newInfoIds,pageNumber,pageSize)=>service('POST','/news/newComment/get',{data_ids:newInfoIds,pageNumber:pageNumber,pageSize:pageSize})
const saveComment=(newInfoIds,type,tianxie)=>service('POST','/news/newComment/create',{data_ids:newInfoIds,type:type,content:tianxie})
const sideThing=(param)=>service('POST','/thing/sideThing/get',
  {zoom:param.zoom,startLatitude:param.startLatitude,startLongitude:param.startLongitude,
    endLatitude:param.endLatitude,endLongitude:param.endLongitude},true,param.token)
const real =(name,idType,idCard)=>service('POST','/customer/customer/auth',{name:name,idType:idType,idCard:idCard})
const getThingComment=(thingIds,pageNumber,pageSize,token)=>service('POST','/thing/sideThingComment/get',{data_ids:thingIds,pageNumber:pageNumber,pageSize:pageSize}, true,token)
const getYNZ=(token)=>service('GET',"/ynz/classify/get",{},true,token)
const spDetail=(ids,token)=>service('POST','/ynz/commodity/info',{ids:ids},true,token) //获取单个商品信息
const createOrder=(ids,buyNumber,token)=>service('POST','/ynz/order/create',{commodity_ids:ids,number:buyNumber},true,token)
const getOrder=(status,token)=>service('POST','/ynz/order/get',{status:status},true,token)
const getOrderInfo=(ids,token)=>service('POST','/ynz/order/info',{order_ids:ids},true,token)
const createPay=(order_ids,type,pay_method,token)=>service('POST','/pay/payBatch/create',{order_ids:order_ids,type:type,pay_method:pay_method},true,token)//创建支付批次
const createSell=(order_ids,harves_modes,token)=>service('POST','/ynz/orderHaves/create',{order_ids:order_ids,harves_modes:harves_modes},true,token)
const getFeesItem=(order_ids,harves_modes,token)=>service('POST','/ynz/feesItem/get',{commodity_ids:order_ids,harves_modes:harves_modes},true,token)
const getAddressList=(token)=>service('GET','/customer/address/get',{},true,token) //获取所有的地址
const addAddressInfo=(addressInfo,token)=>service('POST','/customer/address/create',{names:addressInfo.names,city:addressInfo.city,
detailed:addressInfo.detailed,phone:addressInfo.phone,isDefault:addressInfo.isDefault},true,token) // 增加地址
const editAddressInfo=(addressInfo,token)=>service('POST','/customer/address/update',{names:addressInfo.names,city:addressInfo.city,
detailed:addressInfo.detailed,phone:addressInfo.phone,isDefault:addressInfo.isDefault,addressIds:addressInfo.addressIds},true,token) //修改地址
const deleteAddressInfo=(address_ids,token)=>service('POST','/customer/address/delete',{address_ids:address_ids},true,token) //删除地址
const updateDefaultAddressInfo=(address_ids,token)=>service('POST','/customer/address/updateDefault',{address_ids:address_ids},true,token) //更换默认地址
const getTop=(token)=>service('POST','/customer/address/getTop',{},true,token) //获取默认地址
const pay=(payBatchIds,token)=>service('POST','/pay/accountPay/pay',{payBatchIds:payBatchIds},true,token) //余额支付
const checkAccountMoney=(token)=>service('GET','/account/account/get',{},true,token) //检查账户余额
const createAliPay=(payBatchIds,token)=>service('POST','/pay/aliPay/create',{payBatchIds:payBatchIds},true,token)//支付宝支付 

export {real,sideThing,setStore,getStore,removeStore,getYzm,sendLogin,getKey,register,change,getNews,getCustomer,saveImgBase64,
        release,getNInfo,setpromise,getComment,saveComment,getThingComment,getYNZ,spDetail,createOrder,getOrder,checkAccountMoney,createPay,pay,getOrderInfo,
        createSell,getFeesItem,getAddressList,addAddressInfo,editAddressInfo,deleteAddressInfo,updateDefaultAddressInfo,getTop,createAliPay}
export {objIsNull}
