/*
* 使用的工具函数
* */
/*
* 跳转路径四种情况
* 1完善了信息，跳转到主界面user.type
* 大神：/dashen
* 老板/laoban
* 2未完善信息，跳转到完善界面user.header
* 大神：/dasheninfo
* 老板/laobaninfo
* */
export function getRedirectTo(type,header) {
  let path=''
  if(type==='dashen'){
    path='/dashen';
  }else{
    path='/laoban';
  }

  if(!header){
    path+='info';
  }
  return path;
}