import {RECORD_ADDRESS} from './mutation-types.js'
import {position,cityForPosition} from '../service/deviceInformation.js'
export default {
	/*异步获取gps地址*/
	async getPosistion({
		commit,state
	}){
		console.log("vuex自动定位进入action中")
		await position().then((a) => {
			if (a.latitude != null && a.latitude != "undefined") {
				console.log("action中查询出的gps经纬度地址是：",a.latitude)
				console.log("派件事件给裂变")
				// 根据仅为度查询城市信息
				cityForPosition(a.longitude,a.latitude).then((b)=>{
					let tmp = {
					"latitude":a.latitude,
					"longitude":a.longitude,
					"country":b.country,
					"province":b.province,
					"city":b.city,
					"citycode":b.citycode,
					"district":b.district,
					"adcode":b.adcode,
					"township":b.township,
					"towncode":b.towncode}
					commit(RECORD_ADDRESS,tmp)
				})
			}
		}).then((error) => {
			console.log("vuex中，自动获取定位信息错误")
		})
	}
}
