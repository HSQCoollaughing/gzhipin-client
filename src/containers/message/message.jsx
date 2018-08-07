/*
* 信息界面路由容器*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
class Message extends Component{

  render(){
    return (
      <div>
        Message
      </div>
    )
  }
}
export default connect(
  state=>({}),
  {}
)(Message)