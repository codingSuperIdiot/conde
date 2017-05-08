/**
 * Created by supercodingfans on 2017/4/19.
 */

//发帖时间判断
export function time(creatTime){
  let oldtime = new Date(creatTime);
  let newtime = (new Date() - oldtime)/1000;
  let month = Math.floor(newtime/3600/24/30);
  let day = Math.floor(newtime/3600/24);
  let hours = Math.floor(newtime/3600);
  let mins = Math.floor(newtime/60);
  let str = '';
  if (hours === 0) {
    if (mins <= 3) {
      str = '刚刚';
    } else {
      str = mins + '分钟前';
    }
  } else if (day === 0){
    str = hours + '小时前';
  } else if (month === 0){
    str = day + '天前';
  } else {
    str = month + '月前';
  }
  return str;
}

//获取贴子标签
export function getTab(tab, good, top) {
  let str = '';
  if (top) {
    str = '置顶';
  } else if (good) {
    str = '精华';
  } else {
    switch (tab) {
      case 'share':
        str = '分享';
        break;
      case 'ask':
        str = '问答';
        break;
      case 'job':
        str = '招聘';
        break;
      default:
        str = '无';
        break;
    }
  }
  return str;
}

/** 获取标签样式
 *  @param {string} tab Tab分类
 *  @param {bool} good 是否是精华帖
 *  @param {bool} top 是否是置顶帖
 */
export function getTabClass(tab, good, top){
  let className = '';
  
  if (top) {
    className = 'top';
  } else if (good) {
    className = 'good';
  } else {
    switch (tab) {
      case 'share':
        className = 'share';
        break;
      case 'ask':
        className = 'ask';
        break;
      case 'job':
        className = 'job';
        break;
      default:
        className = 'default';
        break;
    }
  }
  return className;
}
