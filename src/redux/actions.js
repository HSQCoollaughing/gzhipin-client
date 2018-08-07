/*
*包含多个action creator
* 同步action
* 异步action
* */
import {reqLogin,reqRegister,reqUpdateUser,reqUser,reqUserList} from '../api'

import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST} from './action-types'

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