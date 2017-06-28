/**显示几天前,几小时前,几分钟前
 * Created by ping on 2017/5/19.
 */

export function forTime(nowTimes){
    var data1=new Date().getTime();
//            console.log("data1",data1)
    var data2=new Date(nowTimes).getTime()
//            console.log("data2",data2)

    var date3=data1-data2;
    //计算出相差天数
    var  month=Math.floor(date3/(30*24*3600*1000))
    var  year=Math.floor(date3/(12*30*24*3600*1000))
    if(year<1){
      if (month<1){
        var days=Math.floor(date3/(24*3600*1000))
        if (days<1){
          //计算出小时数
          var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
          var hours=Math.floor(leave1/(3600*1000))
          if (hours<1){
            //计算相差分钟数
            var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))
            if (minutes<=0){
              return "刚刚"
            }else {
              return minutes+"分钟前"
            }

          }else{
            return hours+"小时前"
          }
        }else{
          return days+"天前"
        }
      }else {
        return formatDateSplit(nowTimes)
        //
      }
    }else {
      return formatDateSplit(nowTimes)
    }
    /*//计算相差秒数
     var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
     var seconds=Math.round(leave3/1000)*/

  }
//截取时间只显示年月日
  function formatDateSplit(date) {
    var times=date.split(" ");
    return times[0]
  };
