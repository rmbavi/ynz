import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
const login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('../page/login/register.vue')), 'register')
const changePass = r => require.ensure([], () => r(require('../page/login/changePass.vue')), 'changePass')
const customerService = r => require.ensure([], () => r(require('../page/personal/customerService.vue')), 'customerService')
const thingPublish = r => require.ensure([], () => r(require('../page/thing/thingPublish.vue')), 'thingPublish')
const thingDetail = r => require.ensure([], () => r(require('../page/thing/thingDetail.vue')), 'thingDetail')
const createThing = r => require.ensure([], () => r(require('../page/thing/createThing.vue')), 'createThing')
const allRelease = r => require.ensure([], () => r(require('../page/thing/allThing.vue')), 'allRelease')

const sheZhi = r => require.ensure([], () => r(require('../page/personal/sheZhi.vue')), 'sheZhi')
const logistics = r => require.ensure([], () => r(require('../page/order/logistics.vue')), 'logistics')
const myWallet = r => require.ensure([], () => r(require('../page/personal/myWallet.vue')), 'myWallet')
const qianbao = r => require.ensure([], () => r(require('../page/personal/qianbao.vue')), 'qianbao')
const daijinquan = r => require.ensure([], () => r(require('../page/personal/daijinquan.vue')), 'daijinquan')

const realName = r => require.ensure([], () => r(require('../page/personal/realName.vue')), 'realName')
const editDatum = r => require.ensure([], () => r(require('../page/personal/editDatum.vue')), 'editDatum')
const index = r => require.ensure([], () => r(require('../page/home/index.vue')), 'index')
const shenbian = r => require.ensure([], () => r(require('../page/home/shenbian.vue')), 'shenbian')
const nongjiale = r => require.ensure([], () => r(require('../page/home/nongjiale.vue')), 'nongjiale')
const banshi = r => require.ensure([], () => r(require('../page/home/banshi.vue')), 'banshi')
const huizhong = r => require.ensure([], () => r(require('../page/home/huizhong.vue')), 'huizhong')
const huiyang = r => require.ensure([], () => r(require('../page/home/huiyang.vue')), 'huiyang')
const newsDetail = r => require.ensure([], () => r(require('../page/news/newsDetail.vue')), 'newsDetail')
const menu = r => require.ensure([], () => r(require('../page/personal/menu.vue')), 'menu')

const personal = r => require.ensure([], () => r(require('../page/personal/personal.vue')), 'personal')
const msg = r => require.ensure([], () => r(require('../page/personal/msg.vue')), 'msg')
const selectAddress = r => require.ensure([], () => r(require('../page/personal/selectAddress.vue')), 'selectAddress')
const legalProvisions = r => require.ensure([], () => r(require('../page/personal/legalProvisions.vue')), 'legalProvisions')
const userGuideList = r => require.ensure([], () => r(require('../page/user_guide/userGuideList.vue')), 'userGuideList')

const manualSelectAddress = r => require.ensure([], () => r(require('../page/home/manualSelectAddress.vue')),'manualSelectAddress')

const ynz = r =>  require.ensure([], () => r(require('../page/ynz/ynz.vue')), 'ynz')
const commodityDetail = r =>  require.ensure([], () => r(require('../page/ynz/commodity_detail.vue')), 'commodityDetail')
const ynzzfcg = r =>  require.ensure([], () => r(require('../page/ynz/ynzzfcg.vue')), 'ynzzfcg')
const ynzdmcg = r =>  require.ensure([], () => r(require('../page/ynz/ynzdmcg.vue')), 'ynzdmcg')
const ynzssw = r =>  require.ensure([], () => r(require('../page/ynz/ynzssw.vue')), 'ynzssw')
const paySuccess = r =>  require.ensure([], () => r(require('../page/ynz/paySuccess.vue')), 'paySuccess')
const orderDetail = r =>  require.ensure([], () => r(require('../page/ynz/orderDetail.vue')), 'orderDetail')
const pay = r =>  require.ensure([], () => r(require('../page/pay/pay.vue')), 'pay')
const ynzAlreadySell = r =>  require.ensure([], () => r(require('../page/ynz/ynzAlreadySell.vue')), 'ynzAlreadySell')
const ynzSellPage = r =>  require.ensure([], () => r(require('../page/ynz/ynzSellPage.vue')), 'ynzSellPage')
const myNz = r =>  require.ensure([], () => r(require('../page/ynz/myNz.vue')), 'myNz')
const trainDetail = r =>  require.ensure([], () => r(require('../page/ynz/trainDetail.vue')), 'trainDetail')
const harvest = r =>  require.ensure([], () => r(require('../page/ynz/harvest.vue')), 'harvest')
const manageAddress = r =>  require.ensure([], () => r(require('../page/ynz/manageAddress.vue')), 'manageAddress')
const manageAddressEdit = r =>  require.ensure([], () => r(require('../page/ynz/manageAddressEdit.vue')), 'manageAddressEdit')
const addressList = r =>  require.ensure([], () => r(require('../page/ynz/addressList.vue')), 'addressList')
const ripe = r =>  require.ensure([], () => r(require('../page/ynz/ripe.vue')), 'ripe')
const selectShouHuoAddress = r =>  require.ensure([], () => r(require('../page/ynz/selectShouHuoAddress.vue')), 'selectShouHuoAddress')
const payFailure = r =>  require.ensure([], () => r(require('../page/ynz/payFailure.vue')), 'payFailure')


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: App,
        children: [{
            path: '',
            redirect: '/ynz',
        },
          {
            path: '/index',
            name: 'index',
            component: index,
            children: [{
                path: '',
                redirect: '/ynz'
            }, {
                path: '/shenbian',
                name: 'shenbian',
                component: shenbian
            }, {
                path: '/nongjiale',
                name: 'nongjiale',
                component: nongjiale
            }, {
                path: '/ynz',
                component: ynz
            } ,{
                path: '/banshi',
                name: 'banshi',
                component: banshi
            }, {
                path: '/huizhong',
                name: 'huizhong',
                component: huizhong
            }, {
                path: '/huiyang',
                name: 'huiyang',
                component: huiyang
            }]
        },{
            path: '/login',
            name: 'login',
            component: login
        },{
            path: '/customerService',
            name: 'customerService',
            component: customerService
        },
          {
            path: '/register',
            name: 'register',
            component: register
          },
          //修改密码界面
          {
            path: '/changePass',
            name: 'changePass',
            component: changePass
          },
          {
            path: '/customerService',
            name: 'customerService',
            component: customerService
          },{
            path: '/myWallet',
            name: 'myWallet',
            component: myWallet,
            children: [{
              path: '',
              redirect: '/qianbao'
            }, {
              path: '/qianbao',
              name: 'qianbao',
              component: qianbao
            }, {
              path: '/daijinquan',
              name: 'daijinquan',
              component: daijinquan
            }]
          },{
            path: '/realName',
            name: 'realName',
            component: realName
          },

          //我的发布
          {
            path:"/thingPublish",
            name: 'thingPublish',
            component:thingPublish
          },

          //发布详情
          {
            path:"/thingDetail",
            name: 'thingDetail',
            component:thingDetail
          },
          //设置
          {
            path:"/sheZhi",
            name: 'sheZhi',
            component:sheZhi
          },
          //物流详情
          {
            path:"/logistics",
            name: 'logistics',
            component:logistics
          },
          //新闻详情

          {
            path:"/newsDetail",
            name: 'newsDetail',
            component:newsDetail
          },{
            path: "/editDatum",
            name: "editDatum",
            component: editDatum
          },{
            path: '/createThing',
            name: 'createThing',
            component: createThing
          },{
            path: '/menu',
            name: 'menu',
            component: menu
          }
          ,
          //个人中心
          {
            path:"/personal",
            name: "personal",
            component: personal
          },
          //消息
          {
            path:"/msg",
            name: "msg",
            component: msg
          },
          //选择地址
          {
            path:"/selectAddress",
            name: "selectAddress",
            component: selectAddress
          },
          //所有发布
          {
            path:"/allRelease",
            name: "allRelease",
            component: allRelease
          },
          //法律条款
          {
            path:"/legalProvisions",
            name: "legalProvisions",
            component:legalProvisions
          },
          //用户指南
          {
            path:"/userGuideList",
            name: "userGuideList",
            component:userGuideList
          },
          //手动选择地址
          {
            path:"/manualSelectAddress",
            name: "manualSelectAddress",
            component:manualSelectAddress
          },
          {
            path:"/commodityDetail",
            name:"commodityDetail",
            component: commodityDetail
          },
          //支付成功
          {
            path:"/paySuccess",
            name:"paySuccess",
            component: paySuccess
          },
          //云农庄支付成功
          {
            path:"/ynzzfcg",
            name:"ynzzfcg",
            component: ynzzfcg
          },
          //云农庄代卖成功
          {
            path:"/ynzdmcg",
            name:"ynzdmcg",
            component: ynzdmcg
          },
          //云农庄收实物
          {
            path:"/ynzssw",
            name:"ynzssw",
            component: ynzssw
          },
          //云农庄代卖付款页面
          {
            path:"/ynzSellPage",
            name:"ynzSellPage",
            component: ynzSellPage
          },
           //付款页面
          {
            path:"/pay",
            name: 'pay',
            component:pay
          },
          //已代卖
          {
            path:"/ynzAlreadySell",
            name: 'ynzAlreadySell',
            component:ynzAlreadySell
          },
          //我的农庄
          {
            path:"/myNz",
            name: 'myNz',
            component:myNz
          },
          //培育详情
          {
            path:"/trainDetail",
            name: 'trainDetail',
            component: trainDetail
          },
          //收获详细
          {
            path:"/harvest",
            name: 'harvest',
            component: harvest
          },
          //已成熟
          {
            path:"/ripe",
            name: 'ripe',
            component: ripe
          },
          //收货地址管理
          {
            path:"/manageAddress",
            name: 'manageAddress',
            component: manageAddress
          },
           //编辑收货地址
          {
            path:"/manageAddressEdit",
            name: 'manageAddressEdit',
            component: manageAddressEdit
          },
          //收货地址增加
          {
            path:"/addressList",
            name: 'addressList',
            component: addressList
          },
          //选择收货地址
          {
            path:"/selectShouHuoAddress",
            name: 'selectShouHuoAddress',
            component: selectShouHuoAddress
          },
          //订单详情
          {
            path:"/orderDetail",
            name: 'orderDetail',
            component: orderDetail
          },
          //支付失败
          {
            path:"/payFailure",
            name: 'payFailure',
            component: payFailure
          }
        ]
    }]
})
