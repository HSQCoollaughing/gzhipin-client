/*
*包含多个action creator
* 同步action
* 异步action
* */
import io from 'socket.io-client'
import {
  reqLogin,
  reqRegister,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,
  RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'

//同步action登录注册成功
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
//同步action登录注册失败
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
//同步action接受用户信息
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//同步action重置用户信息
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
//同步action 获取用户列表数据
const receiveUserList=(userlist)=>({type:RECEIVE_USER_LIST,data:userlist})

//获取所有消息列表
const receiveMsgList=({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
//获取一条信息
const receiveMsg=({chatMsg,userid})=>({type:RECEIVE_MSG,data:{chatMsg,userid}});



//单例对象 只创建一次
//保存对象之前  判断对象是否创建
//保存对象之后  保存对象
function initIO(dispatch,userid) {
  if(!io.socket){
    //io是个函数socket保存到io中,保存到io中
    io.socket=io('ws://localhost:4000');
    //接受到服务器发送来的消息
    io.socket.on('receiveMsg',function (chatMsg) {
      console.log('接受到服务器发送来的消息',chatMsg);
      //只有当时当前用户的消息的时候才显示保存
      if(userid===chatMsg.from||userid===chatMsg.to){
        dispatch(receiveMsg({chatMsg,userid}));
      }
    })
  }
}
//获取所有消息列表
async function getChatList(dispatch,userid) {
  initIO(dispatch,userid);//创建socket对象
  const response=await reqChatMsgList();
  const result=response.data;
  if(result.code===0){
    const {users,chatMsgs}=result.data;
    //分发action
    dispatch(receiveMsgList({users,chatMsgs,userid}));
  }
}



//发送消息异步action
export const sendMsg=({from,to,content})=>{
  return dispath=>{
    console.log('发送消息',{from,to,content});
    //向服务器发送消息

    io.socket.emit('sendMsg',{from,to,content});//发送到服务器
  }
}


//异步注册action
export const register=(user)=>{
  //进行前端输入验证
  const {username,password,password2,type}=user;
  if(!username){
    return errorMsg('用户名不能为空');//前端验证，返回一个action请求
  }else if(password!==password2){
    return errorMsg('两次密码不一致');
  }
  //发送ajax请求验证数据
  return async dispatch=>{
    //异步获取数据
    const response=await reqRegister(user);//返回一个promise对象
    const result=response.data;
    //分发action
    if(result.code===0){//注册成功
      getChatList(dispatch,result.data._id);
      //分发注册成功的action,调用同步的action
      dispatch(authSuccess(result.data));
    }else{//注册失败
      dispatch(errorMsg(result.msg));
    }
  }
}
//异步登录action
export const login=(user)=>{
  //进行前端输入验证
  const {username,password}=user;
  if(!username){
    return errorMsg('用户名不能为空');//前端验证，返回一个action请求
  }else if(!password){
    return errorMsg('密码不能为空');
  }
  return async dispatch=>{
    //异步获取数据
    const response=await reqLogin(user);//返回一个promise对象
    const result=response.data;
    //分发action
    if(result.code===0){//注册成功
      getChatList(dispatch,result.data._id);
      //分发注册成功的action,调用同步的action
      dispatch(authSuccess(result.data));
    }else{//注册失败
      dispatch(errorMsg(result.msg));
    }
  }
}
//异步更新用户数据action
export const updateUser=(user)=>{
  return async dispatch=>{
    //异步获取数据
    const response=await reqUpdateUser(user);
    const result=response.data;
    if(result.code===0){//更新成功
      //分发同步action
      dispatch(receiveUser(result.data));
    }else{//更新失败
      dispatch(resetUser(result.msg));
    }

  }
}
//异步获取用户信息数据
export const getUser=()=>{
  return async dispatch=>{
    //获取用户数据异步请求
    const response=await reqUser();
    const result=response.data;
    if(result.code===0){//请求成功
      getChatList(dispatch,result.data._id);
        //发送同步action
        dispatch(receiveUser(result.data));
    }else{
      //发送同步action
      dispatch(resetUser(result.msg));
    }
  }
}
//异步获取同类型的数据
export const getUserList=(type)=>{
  return async dispath=>{
    //发送异步请求，获取同类型数据
    const response=await reqUserList(type);
    const result=response.data;
    if(result.code===0){
      dispath(receiveUserList(result.data));
    }
  }
}
