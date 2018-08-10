/*
* 包含n个reducer的函数
* 通过老的state和action来获取一个新的state*/

import {combineReducers} from 'redux'

import {getRedirectTo} from '../utils/utils'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,
  RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG
} from './action-types'

//处理user数据相关的
const initUser={
  username:'',
  type:'',
  msg:'',//错误提示信息
  redirectTo:''//重定向跳转的路径
}
function user(state=initUser,action) {

  switch (action.type){
    case AUTH_SUCCESS:
      const {type,header}=action.data;
      return {...action.data,redirectTo:getRedirectTo(type,header)}//后面的数据覆盖前面的数据
      break;
    case ERROR_MSG:
      return {...state,msg:action.data}
      break;
    case RECEIVE_USER:
      return action.data;
      break;
    case RESET_USER:
      return {...initUser,msg:action.data};
      break;
    default:
      return state;
  }

}

//处理userlist数据相关的，获取用户列表
const initUserList=[];
function userList(state=initUserList,action) {
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data;
      break;
    default:
      return state;
  }
}
//处理聊天消息列表
const initChat={
  users:{},//key为userid,属性值：username,header
  chatMsgs:[],//与之相关的聊天信息
  unReadCount:0//总的未读消息个数
}

function chat(state=initChat,action) {
  switch (action.type){
    case RECEIVE_MSG_LIST:
      const {users,chatMsgs,userid}=action.data;
      return{
        users,
        chatMsgs,
        unReadCount:chatMsgs.reduce((prevTotal,msg)=>prevTotal+(!msg.read&&msg.to===userid?1:0),0)
      };
      break;
    case RECEIVE_MSG:
      const {chatMsg}=action.data;
      return{
        users:state.users,
        chatMsgs:[...state.chatMsgs,chatMsg],
        unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
      };
       break;
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat
});