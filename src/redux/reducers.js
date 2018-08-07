/*
* 包含n个reducer的函数
* 通过老的state和action来获取一个新的state*/

import {combineReducers} from 'redux'

import {getRedirectTo} from '../utils/utils'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types'

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
export default combineReducers({
  user,
});