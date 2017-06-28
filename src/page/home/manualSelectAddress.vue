<template>
    <div id="manual" style="height: 100%;position: absolute;width: 100%;overflow: hidden">
      <!--<mt-header title="选择地址">
        <mt-button icon="back" slot="left" @click.native="backUrl">返回</mt-button>
      </mt-header>-->
      <div class="suggest-header">
        <div class="city-wrapper">
          <div class="city-content border-right-1px">
            <div class="city-select" @click="toselect">
              <span class="text">{{city}}</span>
              <i class="icon iconfont icon-dizhi1 pulldown"></i>
            </div>
          </div>
        </div>
        <div class="address-wrapper">
          <input type="text" class="address-input" id="tipinput" placeholder="请输入你的地址">
        </div>
        <div class="cancle-wrapper" @click="cancel">
          <span class="text2 border-left-1px">
            取消
          </span>
        </div>
      </div>

      <div class="address-list" v-show="addresslist" >
        <ul >
          <li class="list-item border-bottom-1px">
            <div class="item-wrapper">
              <div class="icon">
                <i class="icon iconfont icon-dizhi1"></i>
              </div>
              <div class="address-wrapper">
                <div class="address-info">
                  <div class="displayname">
                    <span>华南碧桂园翠山蓝天苑2街108</span>
                  </div>
                  <div class="recomment">推荐</div>
                </div>
                <div class="address">番禺区,华南碧桂园</div>
              </div>
            </div>
          </li>
          <li class="list-item border-bottom-1px">
            <div class="item-wrapper">
              <div class="icon">
                <i class="icon iconfont icon-dizhi1"></i>
              </div>
              <div class="address-wrapper">
                <div class="address-info">
                  <div class="displayname">
                    <span>华南碧桂园翠山蓝天苑2街108</span>
                  </div>
                  <div class="recomment">推荐</div>
                </div>
                <div class="address">番禺区,华南碧桂园</div>
              </div>
            </div>
          </li>
          <li class="list-item border-bottom-1px">
            <div class="item-wrapper">
              <div class="icon">
                <i class="icon iconfont icon-dizhi1"></i>
              </div>
              <div class="address-wrapper">
                <div class="address-info">
                  <div class="displayname">
                    <span>华南碧桂园翠山蓝天苑2街108</span>
                  </div>
                  <div class="recomment">推荐</div>
                </div>
                <div class="address">番禺区,华南碧桂园</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 地图展示-->
      <div id="container" style="height:100%" v-show="ismap"></div>
      <div class="info-card-wrapper" v-show="ismap">
        <div class="info-card">
          <div class="icon">
              <i class="icon iconfont icon-dizhi1" style="font-size: 20px;;"></i>
          </div>
          <div class="address-wrapper">
            <div class="address-info">
              <div class="displayname">
                <span>{{poiaddress}}</span>
              </div>
              <div class="market recomment">推荐</div>
            </div>
            <div class="address">{{address}}</div>
          </div>
          <div class="tip" @click="sureAddress">
            <span class="text">确定</span>
          </div>
        </div>
      </div>

      <!--选择城市-->
      <div class="citys" style="overflow: scroll" v-show="cityshow">
        <div class="split"></div>
        <div class="city-list">
          <div>
            <span class="list-title">当前城市：{{city}}</span>
          </div>
          <ul>
            <div class="list-group-titles">A</div>
            <li class="list-group-items" @click="getcity('鞍山市')">鞍山市</li>
            <li class="list-group-items" @click="getcity('安庆市')">安庆市</li>
            <li class="list-group-items" @click="getcity('安阳市')">安阳市</li>
            <li class="list-group-items" @click="getcity('阿拉善盟')">阿拉善盟</li>
            <li class="list-group-items" @click="getcity('安顺市')">安顺市</li>
            <li class="list-group-items" @click="getcity('阿里地区')">阿里地区</li>
            <li class="list-group-items" @click="getcity('安康市')">安康市</li>
            <li class="list-group-items" @click="getcity('阿克苏地区')">阿克苏地区</li>
            <li class="list-group-items" @click="getcity('阿勒特地区')">阿勒特地区</li>
            <li class="list-group-items" @click="getcity('阿拉尔市')">阿拉尔市</li>
            <div class="list-group-titles">B</div>
            <li class="list-group-items" @click="getcity('北京市')">北京市</li>
            <li class="list-group-items" @click="getcity('保定市')">保定市</li>
            <li class="list-group-items" @click="getcity('包头市')">包头市</li>
            <li class="list-group-items" @click="getcity('本溪市')">本溪市</li>
            <li class="list-group-items" @click="getcity('蚌埠市')">蚌埠市</li>
            <li class="list-group-items" @click="getcity('北海市')">北海市</li>
            <li class="list-group-items" @click="getcity('滨州市')">滨州市</li>
            <li class="list-group-items" @click="getcity('宝鸡市')">宝鸡市</li>
            <li class="list-group-items" @click="getcity('亳州市')">亳州市</li>
            <li class="list-group-items" @click="getcity('巴彦淖尔市')">巴彦淖尔市</li>
            <li class="list-group-items" @click="getcity('白山市')">白山市</li>
            <li class="list-group-items" @click="getcity('百色市')">百色市</li>
            <li class="list-group-items" @click="getcity('白沙黎族自治县')">白沙黎族自治县</li>
            <li class="list-group-items" @click="getcity('巴中市')">巴中市</li>
            <li class="list-group-items" @click="getcity('毕节地区')">毕节地区</li>
            <li class="list-group-items" @click="getcity('保山市')">保山市</li>
            <li class="list-group-items" @click="getcity('白银市')">白银市</li>
            <li class="list-group-items" @click="getcity('巴音郭楞州')">巴音郭楞州</li>
            <li class="list-group-items" @click="getcity('博尔塔拉州')">博尔塔拉州</li>
            <div class="list-group-titles">C</div>
            <li class="list-group-items" @click="getcity('成都市')">成都市</li>
            <li class="list-group-items" @click="getcity('重庆市')">重庆市</li>
            <li class="list-group-items" @click="getcity('长沙市')">长沙市</li>
            <li class="list-group-items" @click="getcity('长春市')">长春市</li>
            <li class="list-group-items" @click="getcity('常州市')">常州市</li>
            <li class="list-group-items" @click="getcity('沧州市')">沧州市</li>
            <li class="list-group-items" @click="getcity('承德市')">承德市</li>
            <li class="list-group-items" @click="getcity('常德市')">常德市</li>
            <li class="list-group-items" @click="getcity('郴州市')">郴州市</li>
            <li class="list-group-items" @click="getcity('长治市')">长治市</li>
            <li class="list-group-items" @click="getcity('滁州市')">滁州市</li>
            <li class="list-group-items" @click="getcity('池州市')">池州市</li>
            <li class="list-group-items" @click="getcity('赤峰市')">赤峰市</li>
            <li class="list-group-items" @click="getcity('巢湖市')">巢湖市</li>
            <li class="list-group-items" @click="getcity('朝阳市')">朝阳市</li>
            <li class="list-group-items" @click="getcity('潮州市')">潮州市</li>
            <li class="list-group-items" @click="getcity('崇左市')">崇左市</li>
            <li class="list-group-items" @click="getcity('澄迈县')">澄迈县</li>
            <li class="list-group-items" @click="getcity('楚雄州')">楚雄州</li>
            <li class="list-group-items" @click="getcity('昌都地区')">昌都地区</li>
            <li class="list-group-items" @click="getcity('昌吉市')">昌吉市</li>
            <div class="list-group-titles">D</div>
            <li class="list-group-items" @click="getcity('大连市')">大连市</li>
            <li class="list-group-items" @click="getcity('东莞市')">东莞市</li>
            <li class="list-group-items" @click="getcity('大庆市')">大庆市</li>
            <li class="list-group-items" @click="getcity('东莞市')">东莞市</li>
            <li class="list-group-items" @click="getcity('德州市')">德州市</li>
            <li class="list-group-items" @click="getcity('大同市')">大同市</li>
            <li class="list-group-items" @click="getcity('大理州')">大理州</li>
            <li class="list-group-items" @click="getcity('丹东市')">丹东市</li>
            <li class="list-group-items" @click="getcity('德阳市')">德阳市</li>
            <li class="list-group-items" @click="getcity('大兴安岭地区')">大兴安岭地区</li>
            <li class="list-group-items" @click="getcity('儋州市')">儋州市</li>
            <li class="list-group-items" @click="getcity('东方市')">东方市</li>
            <li class="list-group-items" @click="getcity('安定县')">安定县</li>
            <li class="list-group-items" @click="getcity('达州市')">达州市</li>
            <li class="list-group-items" @click="getcity('德宏州')">德宏州</li>
            <li class="list-group-items" @click="getcity('迪庆州')">迪庆州</li>
            <li class="list-group-items" @click="getcity('安西市')">安西市</li>
            <div class="list-group-titles">E</div>
            <li class="list-group-items" @click="getcity('鄂尔多斯市')">鄂尔多斯市</li>
            <li class="list-group-items" @click="getcity('鄂州市')">鄂州市</li>
            <li class="list-group-items" @click="getcity('恩施市')">恩施市</li>

            <div class="list-group-titles">F</div>
            <li class="list-group-items" @click="getcity('福州市')">福州市</li>
            <li class="list-group-items" @click="getcity('佛山市')">佛山市</li>
            <li class="list-group-items" @click="getcity('抚顺市')">抚顺市</li>
            <li class="list-group-items" @click="getcity('阜新市')">阜新市</li>
            <li class="list-group-items" @click="getcity('阜阳市')">阜阳市</li>
            <li class="list-group-items" @click="getcity('抚州市')">抚州市</li>
            <li class="list-group-items" @click="getcity('防城港市')">防城港市</li>

            <div class="list-group-titles">G</div>
            <li class="list-group-items" @click="getcity('广州市')">广州市</li>
            <li class="list-group-items" @click="getcity('贵阳市')">贵阳市</li>
            <li class="list-group-items" @click="getcity('赣州市')">赣州市</li>
            <li class="list-group-items" @click="getcity('桂林市')">桂林市</li>
            <li class="list-group-items" @click="getcity('贵港市')">贵港市</li>
            <li class="list-group-items" @click="getcity('广元市')">广元市</li>
            <li class="list-group-items" @click="getcity('广安市')">广安市</li>
            <li class="list-group-items" @click="getcity('甘孜州')">甘孜州</li>
            <li class="list-group-items" @click="getcity('甘南州')">甘南州</li>
            <li class="list-group-items" @click="getcity('固原市')">固原市</li>
            <li class="list-group-items" @click="getcity('果洛州')">果洛州</li>

            <div class="list-group-titles">H</div>
            <li class="list-group-items" @click="getcity('杭州市')">杭州市</li>
            <li class="list-group-items" @click="getcity('合肥市')">合肥市</li>
            <li class="list-group-items" @click="getcity('哈尔滨市')">哈尔滨市</li>
            <li class="list-group-items" @click="getcity('呼和浩特市')">呼和浩特市</li>
            <li class="list-group-items" @click="getcity('邯郸市')">邯郸市</li>
            <li class="list-group-items" @click="getcity('葫芦岛市')">葫芦岛市</li>
            <li class="list-group-items" @click="getcity('衡水市')">衡水市</li>
            <li class="list-group-items" @click="getcity('海口市')">海口市</li>
            <li class="list-group-items" @click="getcity('湖州市')">湖州市</li>
            <li class="list-group-items" @click="getcity('淮安市')">淮安市</li>
            <li class="list-group-items" @click="getcity('衡阳市')">衡阳市</li>
            <li class="list-group-items" @click="getcity('汉中市')">汉中市</li>
            <li class="list-group-items" @click="getcity('菏泽市')">菏泽市</li>
            <li class="list-group-items" @click="getcity('惠州市')">惠州市</li>
            <li class="list-group-items" @click="getcity('黄山市')">黄山市</li>
            <li class="list-group-items" @click="getcity('淮南市')">淮南市</li>
            <li class="list-group-items" @click="getcity('淮北市')">淮北市</li>
            <li class="list-group-items" @click="getcity('呼伦贝尔市')">呼伦贝尔市</li>
            <li class="list-group-items" @click="getcity('兴安盟')">兴安盟</li>
            <li class="list-group-items" @click="getcity('鹤岗市')">鹤岗市</li>
            <li class="list-group-items" @click="getcity('黑河市')">黑河市</li>
            <li class="list-group-items" @click="getcity('黄石市')">黄石市</li>
            <li class="list-group-items" @click="getcity('黄冈市')">黄冈市</li>
            <li class="list-group-items" @click="getcity('化州市')">化州市</li>
            <li class="list-group-items" @click="getcity('鹤壁市')">鹤壁市</li>
            <li class="list-group-items" @click="getcity('河源市')">河源市</li>
            <li class="list-group-items" @click="getcity('贺州市')">贺州市</li>
            <li class="list-group-items" @click="getcity('河池市')">河池市</li>
            <li class="list-group-items" @click="getcity('红河州')">红河州</li>
            <li class="list-group-items" @click="getcity('海东地区')">海东地区</li>
            <li class="list-group-items" @click="getcity('海北州')">海北州</li>
            <li class="list-group-items" @click="getcity('黄南州')">黄南州</li>
            <li class="list-group-items" @click="getcity('海南州')">海南州</li>
            <li class="list-group-items" @click="getcity('海西州')">海西州</li>
            <li class="list-group-items" @click="getcity('哈密地区')">哈密地区</li>
            <li class="list-group-items" @click="getcity('和田地区')">和田地区</li>

            <div class="list-group-titles">I</div>
            <li class="list-group-items" @click="getcity('伊犁州')">伊犁州</li>

            <div class="list-group-titles">J</div>
            <li class="list-group-items" @click="getcity('济南市')">济南市</li>
            <li class="list-group-items" @click="getcity('锦州市')">锦州市</li>
            <li class="list-group-items" @click="getcity('晋中市')">晋中市</li>
            <li class="list-group-items" @click="getcity('吉林市')">吉林市</li>
            <li class="list-group-items" @click="getcity('济宁市')">济宁市</li>
            <li class="list-group-items" @click="getcity('金华市')">金华市</li>
            <li class="list-group-items" @click="getcity('嘉兴市')">嘉兴市</li>
            <li class="list-group-items" @click="getcity('九江市')">九江市</li>
            <li class="list-group-items" @click="getcity('荆州市')">荆州市</li>
            <li class="list-group-items" @click="getcity('景德镇市')">景德镇市</li>
            <li class="list-group-items" @click="getcity('江门市')">江门市</li>
            <li class="list-group-items" @click="getcity('揭阳市')">揭阳市</li>
            <li class="list-group-items" @click="getcity('焦作市')">焦作市</li>
            <li class="list-group-items" @click="getcity('晋城市')">晋城市</li>
            <li class="list-group-items" @click="getcity('鸡西市')">鸡西市</li>
            <li class="list-group-items" @click="getcity('佳木斯市')">佳木斯市</li>
            <li class="list-group-items" @click="getcity('吉安市')">吉安市</li>
            <li class="list-group-items" @click="getcity('荆门市')">荆门市</li>
            <li class="list-group-items" @click="getcity('济源市')">济源市</li>
            <li class="list-group-items" @click="getcity('金昌市')">金昌市</li>
            <li class="list-group-items" @click="getcity('嘉峪关市')">嘉峪关市</li>
            <li class="list-group-items" @click="getcity('酒泉市')">酒泉市</li>

            <div class="list-group-titles">K</div>
            <li class="list-group-items" @click="getcity('昆明市')">昆明市</li>
            <li class="list-group-items" @click="getcity('开封市')">开封市</li>
            <li class="list-group-items" @click="getcity('喀什地区')">喀什地区</li>
            <li class="list-group-items" @click="getcity('克拉玛依市')">克拉玛依市</li>
            <li class="list-group-items" @click="getcity('克孜勒苏柯州')">克孜勒苏柯州</li>

            <div class="list-group-titles">L</div>
            <li class="list-group-items" @click="getcity('洛阳市')">洛阳市</li>
            <li class="list-group-items" @click="getcity('兰州市')">兰州市</li>
            <li class="list-group-items" @click="getcity('廊坊市')">廊坊市</li>
            <li class="list-group-items" @click="getcity('临沂市')">临沂市</li>
            <li class="list-group-items" @click="getcity('辽宁市')">辽宁市</li>
            <li class="list-group-items" @click="getcity('连云港市')">连云港市</li>
            <li class="list-group-items" @click="getcity('泸州市')">泸州市</li>
            <li class="list-group-items" @click="getcity('莱芜市')">莱芜市</li>
            <li class="list-group-items" @click="getcity('聊城市')">聊城市</li>
            <li class="list-group-items" @click="getcity('柳州市')">柳州市</li>
            <li class="list-group-items" @click="getcity('丽江市')">丽江市</li>
            <li class="list-group-items" @click="getcity('丽水市')">丽水市</li>
            <li class="list-group-items" @click="getcity('拉萨市')">拉萨市</li>
            <li class="list-group-items" @click="getcity('六安市')">六安市</li>
            <li class="list-group-items" @click="getcity('临汾市')">临汾市</li>
            <li class="list-group-items" @click="getcity('吕梁市')">吕梁市</li>
            <li class="list-group-items" @click="getcity('辽源市')">辽源市</li>
            <li class="list-group-items" @click="getcity('龙岩市')">龙岩市</li>
            <li class="list-group-items" @click="getcity('娄底市')">娄底市</li>
            <li class="list-group-items" @click="getcity('漯河市')">漯河市</li>
            <li class="list-group-items" @click="getcity('来宾市')">来宾市</li>
            <li class="list-group-items" @click="getcity('临高县')">临高县</li>
            <li class="list-group-items" @click="getcity('乐山市')">乐山市</li>
            <li class="list-group-items" @click="getcity('凉山州')">凉山州</li>
            <li class="list-group-items" @click="getcity('六盘水市')">六盘水市</li>
            <li class="list-group-items" @click="getcity('临沧市')">临沧市</li>
            <li class="list-group-items" @click="getcity('林芝地区')">林芝地区</li>
            <li class="list-group-items" @click="getcity('陇南市')">陇南市</li>
            <li class="list-group-items" @click="getcity('临夏市')">临夏市</li>

            <div class="list-group-titles">M</div>
            <li class="list-group-items" @click="getcity('绵阳市')">绵阳市</li>
            <li class="list-group-items" @click="getcity('马鞍山市')">马鞍山市</li>
            <li class="list-group-items" @click="getcity('牡丹江市')">牡丹江市</li>
            <li class="list-group-items" @click="getcity('茂名市')">茂名市</li>
            <li class="list-group-items" @click="getcity('梅州市')">梅州市</li>
            <li class="list-group-items" @click="getcity('眉山市')">眉山市</li>

            <div class="list-group-titles">N</div>
            <li class="list-group-items" @click="getcity('南京市')">南京市</li>
            <li class="list-group-items" @click="getcity('宁波市')">宁波市</li>
            <li class="list-group-items" @click="getcity('南宁市')">南宁市</li>
            <li class="list-group-items" @click="getcity('南昌市')">南昌市</li>
            <li class="list-group-items" @click="getcity('南充市')">南充市</li>
            <li class="list-group-items" @click="getcity('南通市')">南通市</li>
            <li class="list-group-items" @click="getcity('南阳市')">南阳市</li>
            <li class="list-group-items" @click="getcity('宁德市')">宁德市</li>
            <li class="list-group-items" @click="getcity('南平市')">南平市</li>
            <li class="list-group-items" @click="getcity('内江市')">内江市</li>
            <li class="list-group-items" @click="getcity('阿坝州')">阿坝州</li>
            <li class="list-group-items" @click="getcity('怒江州')">怒江州</li>
            <li class="list-group-items" @click="getcity('那曲地区')">那曲地区</li>

            <div class="list-group-titles">P</div>
            <li class="list-group-items" @click="getcity('平顶山市')">平顶山市</li>
            <li class="list-group-items" @click="getcity('攀枝花市')">攀枝花市</li>
            <li class="list-group-items" @click="getcity('莆田市')">莆田市</li>
            <li class="list-group-items" @click="getcity('盘锦市')">盘锦市</li>
            <li class="list-group-items" @click="getcity('濮阳市')">濮阳市</li>
            <li class="list-group-items" @click="getcity('萍乡市')">萍乡市</li>
            <li class="list-group-items" @click="getcity('普洱市')">普洱市</li>
            <li class="list-group-items" @click="getcity('平凉市')">平凉市</li>

            <div class="list-group-titles">Q</div>
            <li class="list-group-items" @click="getcity('青岛市')">青岛市</li>
            <li class="list-group-items" @click="getcity('泉州市')">泉州市</li>
            <li class="list-group-items" @click="getcity('秦皇岛市')">秦皇岛市</li>
            <li class="list-group-items" @click="getcity('齐齐哈尔市')">齐齐哈尔市</li>
            <li class="list-group-items" @click="getcity('曲靖市')">曲靖市</li>
            <li class="list-group-items" @click="getcity('衢州市')">衢州市</li>
            <li class="list-group-items" @click="getcity('清远市')">清远市</li>
            <li class="list-group-items" @click="getcity('七台河市')">七台河市</li>
            <li class="list-group-items" @click="getcity('潜江市')">潜江市</li>
            <li class="list-group-items" @click="getcity('钦州市')">钦州市</li>
            <li class="list-group-items" @click="getcity('琼海市')">琼海市</li>
            <li class="list-group-items" @click="getcity('黔西南州')">黔西南州</li>
            <li class="list-group-items" @click="getcity('黔东南州')">黔东南州</li>
            <li class="list-group-items" @click="getcity('黔南州')">黔南州</li>

            <div class="list-group-titles">R</div>
            <li class="list-group-items" @click="getcity('日照市')">日照市</li>

            <div class="list-group-titles">S</div>
            <li class="list-group-items" @click="getcity('深圳市')">深圳市</li>
            <li class="list-group-items" @click="getcity('上海市')">上海市</li>
            <li class="list-group-items" @click="getcity('沈阳市')">沈阳市</li>
            <li class="list-group-items" @click="getcity('石家庄市')">石家庄市</li>
            <li class="list-group-items" @click="getcity('苏州市')">苏州市</li>
            <li class="list-group-items" @click="getcity('三亚市')">三亚市</li>
            <li class="list-group-items" @click="getcity('绍兴市')">绍兴市</li>
            <li class="list-group-items" @click="getcity('绥化市')">绥化市</li>
            <li class="list-group-items" @click="getcity('四平市')">四平市</li>
            <li class="list-group-items" @click="getcity('宿迁市')">宿迁市</li>
            <li class="list-group-items" @click="getcity('汕头市')">汕头市</li>
            <li class="list-group-items" @click="getcity('商丘市')">商丘市</li>
            <li class="list-group-items" @click="getcity('石河子市')">石河子市</li>
            <li class="list-group-items" @click="getcity('宿州市')">宿州市</li>
            <li class="list-group-items" @click="getcity('朔州市')">朔州市</li>
            <li class="list-group-items" @click="getcity('松原市')">松原市</li>
            <li class="list-group-items" @click="getcity('双鸭山市')">双鸭山市</li>
            <li class="list-group-items" @click="getcity('上饶市')">上饶市</li>
            <li class="list-group-items" @click="getcity('三明市')">三明市</li>
            <li class="list-group-items" @click="getcity('十堰市')">十堰市</li>
            <li class="list-group-items" @click="getcity('随州市')">随州市</li>
            <li class="list-group-items" @click="getcity('神农架林区')">神农架林区</li>
            <li class="list-group-items" @click="getcity('邵阳市')">邵阳市</li>
            <li class="list-group-items" @click="getcity('三门峡市')">三门峡市</li>
            <li class="list-group-items" @click="getcity('韶关市')">韶关市</li>
            <li class="list-group-items" @click="getcity('汕尾市')">汕尾市</li>
            <li class="list-group-items" @click="getcity('遂宁市')">遂宁市</li>
            <li class="list-group-items" @click="getcity('山南地区')">山南地区</li>
            <li class="list-group-items" @click="getcity('日喀则地区')">日喀则地区</li>
            <li class="list-group-items" @click="getcity('商洛市')">商洛市</li>
            <li class="list-group-items" @click="getcity('石嘴山市')">石嘴山市</li>、

            <div class="list-group-titles">T</div>
            <li class="list-group-items" @click="getcity('天津市')">天津市</li>
            <li class="list-group-items" @click="getcity('太原市')">太原市</li>
            <li class="list-group-items" @click="getcity('唐山市')">唐山市</li>
            <li class="list-group-items" @click="getcity('铁岭市')">铁岭市</li>
            <li class="list-group-items" @click="getcity('台州市')">台州市</li>
            <li class="list-group-items" @click="getcity('泰州市')">泰州市</li>
            <li class="list-group-items" @click="getcity('泰安市')">泰安市</li>
            <li class="list-group-items" @click="getcity('天水市')">天水市</li>
            <li class="list-group-items" @click="getcity('铜陵市')">铜陵市</li>
            <li class="list-group-items" @click="getcity('通辽市')">通辽市</li>
            <li class="list-group-items" @click="getcity('通化市')">通化市</li>
            <li class="list-group-items" @click="getcity('天门市')">天门市</li>
            <li class="list-group-items" @click="getcity('屯昌市')">屯昌市</li>
            <li class="list-group-items" @click="getcity('铜仁地区')">铜仁地区</li>
            <li class="list-group-items" @click="getcity('铜川市')">铜川市</li>
            <li class="list-group-items" @click="getcity('吐鲁番地区')">吐鲁番地区</li>
            <li class="list-group-items" @click="getcity('塔城地区')">塔城地区</li>

            <div class="list-group-titles">U</div>
            <li class="list-group-items" @click="getcity('乌鲁木齐市')">乌鲁木齐市</li>

            <div class="list-group-titles">W</div>
            <li class="list-group-items" @click="getcity('武汉市')">武汉市</li>
            <li class="list-group-items" @click="getcity('威海市')">威海市</li>
            <li class="list-group-items" @click="getcity('无锡市')">无锡市</li>
            <li class="list-group-items" @click="getcity('潍坊市')">潍坊市</li>
            <li class="list-group-items" @click="getcity('温州市')">温州市</li>
            <li class="list-group-items" @click="getcity('芜湖市')">芜湖市</li>
            <li class="list-group-items" @click="getcity('乌海市')">乌海市</li>
            <li class="list-group-items" @click="getcity('乌兰察布市')">乌兰察布市</li>
            <li class="list-group-items" @click="getcity('梧州市')">梧州市</li>
            <li class="list-group-items" @click="getcity('五指山市')">五指山市</li>
            <li class="list-group-items" @click="getcity('文昌市')">文昌市</li>
            <li class="list-group-items" @click="getcity('万宁市')">万宁市</li>
            <li class="list-group-items" @click="getcity('文山州')">文山州</li>
            <li class="list-group-items" @click="getcity('渭南市')">渭南市</li>
            <li class="list-group-items" @click="getcity('武威市')">武威市</li>
            <li class="list-group-items" @click="getcity('吴忠市')">吴忠市</li>

            <div class="list-group-titles">X</div>
            <li class="list-group-items" @click="getcity('西安市')">西安市</li>
            <li class="list-group-items" @click="getcity('西宁市')">西宁市</li>
            <li class="list-group-items" @click="getcity('厦门市')">厦门市</li>
            <li class="list-group-items" @click="getcity('徐州市')">徐州市</li>
            <li class="list-group-items" @click="getcity('湘潭市')">湘潭市</li>
            <li class="list-group-items" @click="getcity('邢台市')">邢台市</li>
            <li class="list-group-items" @click="getcity('襄阳市')">襄阳市</li>
            <li class="list-group-items" @click="getcity('新乡市')">新乡市</li>
            <li class="list-group-items" @click="getcity('许昌市')">许昌市</li>
            <li class="list-group-items" @click="getcity('咸阳市')">咸阳市</li>
            <li class="list-group-items" @click="getcity('新余市')">新余市</li>
            <li class="list-group-items" @click="getcity('宣城市')">宣城市</li>
            <li class="list-group-items" @click="getcity('忻州市')">忻州市</li>
            <li class="list-group-items" @click="getcity('锡林郭勒盟')">锡林郭勒盟</li>
            <li class="list-group-items" @click="getcity('孝感市')">孝感市</li>
            <li class="list-group-items" @click="getcity('咸宁市')">咸宁市</li>
            <li class="list-group-items" @click="getcity('仙桃市')">仙桃市</li>
            <li class="list-group-items" @click="getcity('湘西州')">湘西州</li>
            <li class="list-group-items" @click="getcity('信阳市')">信阳市</li>
            <li class="list-group-items" @click="getcity('西双版纳州')">西双版纳州</li>

            <div class="list-group-titles">Y</div>
            <li class="list-group-items" @click="getcity('烟台市')">烟台市</li>
            <li class="list-group-items" @click="getcity('银川市')">银川市</li>
            <li class="list-group-items" @click="getcity('宜昌市')">宜昌市</li>
            <li class="list-group-items" @click="getcity('岳阳市')">岳阳市</li>
            <li class="list-group-items" @click="getcity('营口市')">营口市</li>
            <li class="list-group-items" @click="getcity('扬州市')">扬州市</li>
            <li class="list-group-items" @click="getcity('盐城市')">盐城市</li>
            <li class="list-group-items" @click="getcity('运城市')">运城市</li>
            <li class="list-group-items" @click="getcity('宜宾市')">宜宾市</li>
            <li class="list-group-items" @click="getcity('阳泉市')">阳泉市</li>
            <li class="list-group-items" @click="getcity('延吉市')">延吉市</li>
            <li class="list-group-items" @click="getcity('榆林市')">榆林市</li>
            <li class="list-group-items" @click="getcity('伊春市')">伊春市</li>
            <li class="list-group-items" @click="getcity('鹰潭市')">鹰潭市</li>
            <li class="list-group-items" @click="getcity('宜春市')">宜春市</li>
            <li class="list-group-items" @click="getcity('益阳市')">益阳市</li>
            <li class="list-group-items" @click="getcity('永州市')">永州市</li>
            <li class="list-group-items" @click="getcity('阳江市')">阳江市</li>
            <li class="list-group-items" @click="getcity('云浮市')">云浮市</li>
            <li class="list-group-items" @click="getcity('雅安市')">雅安市</li>
            <li class="list-group-items" @click="getcity('玉溪市')">玉溪市</li>
            <li class="list-group-items" @click="getcity('玉树州')">玉树州</li>

            <div class="list-group-titles">Z</div>
            <li class="list-group-items" @click="getcity('郑州市')">郑州市</li>
            <li class="list-group-items" @click="getcity('遵义市')">遵义市</li>
            <li class="list-group-items" @click="getcity('株洲市')">株洲市</li>
            <li class="list-group-items" @click="getcity('淄博市')">淄博市</li>
            <li class="list-group-items" @click="getcity('张家口市')">张家口市</li>
            <li class="list-group-items" @click="getcity('珠海市')">珠海市</li>
            <li class="list-group-items" @click="getcity('镇江市')">镇江市</li>
            <li class="list-group-items" @click="getcity('周口市')">周口市</li>
            <li class="list-group-items" @click="getcity('中山市')">中山市</li>
            <li class="list-group-items" @click="getcity('漳州市')">漳州市</li>
            <li class="list-group-items" @click="getcity('舟山市')">舟山市</li>
            <li class="list-group-items" @click="getcity('湛江市')">湛江市</li>
            <li class="list-group-items" @click="getcity('肇庆市')">肇庆市</li>
            <li class="list-group-items" @click="getcity('枣庄市')">枣庄市</li>
            <li class="list-group-items" @click="getcity('张家界市')">张家界市</li>
            <li class="list-group-items" @click="getcity('驻马店市')">驻马店市</li>
            <li class="list-group-items" @click="getcity('自贡市')">自贡市</li>
            <li class="list-group-items" @click="getcity('资阳市')">资阳市</li>
            <li class="list-group-items" @click="getcity('昭通市')">昭通市</li>
            <li class="list-group-items" @click="getcity('张掖市')">张掖市</li>
            <li class="list-group-items" @click="getcity('中卫市')">中卫市</li>

          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    import {RECORD_ADDRESS} from '../../store/mutation-types.js'
    import { Search } from 'mint-ui';
    import {monitorReturn} from '../../service/monitor'
    import imgmap from '../../image/address_def.png'
    var map=null;
    export default{
        data: function () {
          return{
            value:"",
            ismap:true,
            map:"",
            address:"",
            poiaddress:"",
            nearestJunction:"",
            city:"广州",
            cityshow:false,
            addresslist:false,
            gdmap:''
          }
        },
        mounted:function(){
          monitorReturn(true)
          this.initMap()

      },
        props: [],
        components: {},
        methods: {
          backUrl:function(){
//            let url=getStore("selected")
            this.$router.replace("/index")
          },
          initMap: function() {
            /*var marker,map = new AMap.Map('gaode_map', {
             resizeEnable: true,
             zoom: 15,
             });
             this.isLoad = false;
             //地图事件
             map.on("dragend", this.dragend);
             this.mainMap = map;
             var clickEventListener = map.on('click', function(e) {
             if (marker!=null){
             marker.setMap(null)
             marker=null
             }
             console.log("经纬度",e.lnglat.getLng() + ',' + e.lnglat.getLat())
             marker = new AMap.Marker({
             icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
             position: [e.lnglat.getLng(), e.lnglat.getLat()]
             });
             marker.setMap(map);
            });*/

            let that=this
            AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
               map = new AMap.Map('container', {
                zoom: 16,
                scrollWheel: false,
                resizeEnable: true
              })
              //输入提示
              var autoOptions = {
                input: "tipinput"
              };
              var auto = new AMap.Autocomplete(autoOptions);
              var placeSearch = new AMap.PlaceSearch({
                map: map
              });  //构造地点查询类
              AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
              function select(e) {
                console.log("e",e)
                placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name);  //关键字查询查询
                map.setZoomAndCenter(15,[e.poi.location.lng,e.poi.location.lat]);
              }
              var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map,
                iconStyle: { //自定义外观
                  url: imgmap,
                  ancher: [24, 40],
                  size: [18,40]
                }
              });

              positionPicker.on('success', function(positionResult) {
                console.log(positionResult)
                that.positionResult=positionResult
                /*console.log(positionResult.position) ;
                console.log(positionResult.address);
                console.log(positionResult.nearestJunction);
                console.log(positionResult.nearestRoad);
                console.log(positionResult.nearestPOI);*/
                that.nearestJunction=positionResult.nearestJunction
                that.address=positionResult.address
                that.poiaddress=positionResult.nearestPOI
              });
              positionPicker.on('fail', function(positionResult) {
                  console.log("positionPicker--fail")
              });
//              var onModeChange = function(e) {
//                positionPicker.setMode(e.target.value)
//              }
              var dragMapMode = document.getElementsByName('mode')[0];
                positionPicker.start(map.getBounds().getSouthWest())
//              onModeChange()
              positionPicker.start();
              map.panBy(0, 1);

              map.addControl(new AMap.ToolBar({
                liteStyle: true
              }))
              if (!that.city) {
                that.city = '广州市';
              }
              map.setCity(that.city);
            });
            //输入提示

          },
          //取消操作
          cancel:function(){
            if(!this.is_cancel){
              this.ismap=true
              this.is_cancel=true
            }else {
              this.$router.replace("/index")
            }
          },
          toselect:function(){
            this.cityshow=true
            this.ismap=false
          },
          getcity:function(city){
            console.log(city)
            this.city=city
            map.setCity(city);
            this.cityshow=false
            this.ismap=true
          },
          sureAddress:function(){
            let that=this
            let latitude=that.positionResult.position.lat
            let longitude=that.positionResult.position.lng
            let adcode=that.positionResult.regeocode.addressComponent.adcode
            let province=that.positionResult.regeocode.addressComponent.province
            let city=that.positionResult.regeocode.addressComponent.city
            let citycode=that.positionResult.regeocode.addressComponent.citycode
            let district=that.positionResult.regeocode.addressComponent.district
            let township=that.positionResult.regeocode.addressComponent.township
            let towncode=that.positionResult.regeocode.addressComponent.towncode

            let tmp = {
              "latitude":latitude,
              "longitude":longitude,
              "country":"",
              "province":province,
              "city":city,
              "citycode":citycode,
              "district":district,
              "adcode":adcode,
              "township":township,
              "towncode":towncode
            }
            that.$store.commit(RECORD_ADDRESS,tmp)
            that.$router.replace("/index")
          }

        }
    }
</script>

<style>
  @import "../../style/manual.css";
  .amap-touch-toolbar .amap-zoomcontrol{
    position: absolute;
    bottom:50px;
  }
</style>
