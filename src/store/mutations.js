 import {
  RECORD_ADDRESS
} from './mutation-types.js'

import {
  setStore,
  getStore,
} from '../config/mUtils'

export default {
  // 记录当前经度纬度
	/* 地址对象信息
   this.$store.state.addressInfo.city
	latitude   纬度
	longitud  经度
	country  //国家
	province   //省
	city  //当所在城市为四个直辖市时，该字段返回为空
	citycode    //城市编码
	district    //区，县
	adcode    //区编码
	township    //坐标点所在乡镇/街道（此街道为社区街道，不是道路信息）
	towncode    //乡镇街道编码
	*/
  [RECORD_ADDRESS](state, addressInfo) {
		console.log("vuex设置gps定位详细信息数据",addressInfo)
    state.addressInfo = addressInfo;
  }
}
