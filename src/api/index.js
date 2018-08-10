/*
* 包含可多个接口请求的函数*/

import ajax from './ajax'
//注册
export const reqRegister=(user)=>ajax('/register',user,'POST');
//登录接口
export const reqLogin=(user)=>ajax('/login',user,'POST');
//更新用户接口
export const reqUpdateUser=(user)=>ajax('/update',user,'POST');
//获取用户信息
export const reqUser=()=>ajax('/user');
//获取同类型的数据
export const reqUserList=(type)=>ajax('/userlist',{type});
//获取消息列表信息
export const reqChatMsgList=()=>ajax('/msglist');
//获取未读消息改为已读
export const reqReadMsg=(from)=>ajax('/readmsg',{from},'POST');
