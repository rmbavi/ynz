/**
 * Created by User on 2017-05-18.
 */
import axios from 'axios'
import {baseUrl} from './env.js'

export default async(type = 'GET', url = '', data = {}, isBaseUrl = true, token) => {
  type = type.toUpperCase();
  if (isBaseUrl)
    url = baseUrl + url;
  if (token) {
    url += "?token=" + token
  }
  console.log("service_url:",url)
    // if (window.axios) {
  let requestConfig = {
    timeout: 20000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  var axiosObj = axios.create(requestConfig);
  if (type == 'POST') {
    var resultObj = await axiosObj.post(url, data).catch(handleError);
    return resultObj.data;
  } else {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    let resultObj = await axiosObj.get(url).catch(handleError);
    return resultObj.data;
  }
}

function handleError(error) {
  console.error(error)
  Promise.reject(error)
}
