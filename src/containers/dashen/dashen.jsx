/*
* 大神界面路由容器*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
class Dashen extends Component{

  render(){
    return (
      <div>
        Dashen
      </div>
    )
  }
}
export default connect(
  state=>({}),
  {}
)(Dashen)