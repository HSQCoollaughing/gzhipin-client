/*
* 大神信息完善
*
* */

import React,{Component}from 'react';
import {connect} from 'react-redux'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/actions";

class DaShenInfo extends Component{
  state={
    post:'',
    info:'',
  }
  //更新头像数据
  setHeader=(header)=>{
    this.setState({
      header
    })
  }
  handleChange=(name,val)=>{
    this.setState({
      [name]:val
    })
  }
  handleSave=()=>{
   // console.log(this.state);
    this.props.updateUser(this.state);
  }
  render(){
    const {header,type,username}=this.props.user;
    if(header&&username){//信息完善以后跳转的页面
      const path=type==='laoban'?'/laoban':'/dashen';
      return <Redirect to={path}></Redirect>
    }
    return (
      <div>
        <NavBar>大神完善信息</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>

        <InputItem placeholder='请输入求职岗位' onChange={val=>(this.handleChange('post',val))}>求职岗位</InputItem>
        <TextareaItem placeholder='请输入个人介绍' title='个人介绍'
                      rows={3} onChange={val=>(this.handleChange('info',val))}></TextareaItem>
        <Button type='primary' onClick={this.handleSave}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser}
)(DaShenInfo)