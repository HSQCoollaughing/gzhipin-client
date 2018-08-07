/*
* 信息界面路由容器*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
class NotFind extends Component{

  render(){
    return (
      <div>
        NotFind
      </div>
    )
  }
}
export default connect(
  state=>({}),
  {}
)(NotFind)