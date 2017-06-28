/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * baseUrl http://geewer.s1.natapp.cc/api
 * baseUrl http://47.96.83.116/api
 * baseUrl https://utax365.cn/agro-api
 * imgBaseUrl http://geewer.s1.natapp.cc
 * imgBaseUrlhttps://utax365.cn
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'http://geewer.s1.natapp.cc';
const defaultHeader = "this.src='" + require('../image/default_header.png')+"'"  //大头像
const defaultHeader_small = "this.src='" + require('../image/default_header_small.png')+"'" //小头像
const default_news_detail = "this.src='" + require('../image/small_def.png')+"'"//适用新闻列表图片.身边事图片
const big_default_news_detail = "this.src='" + require('../image/bigl_def.png')+"'"//适用新闻详情的大图片


if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://geewer.s1.natapp.cc/api';
	routerMode = 'hash'
}else{
	baseUrl = 'http://geewer.s1.natapp.cc/api';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
  defaultHeader,
  defaultHeader_small,
  default_news_detail,
  big_default_news_detail
}
