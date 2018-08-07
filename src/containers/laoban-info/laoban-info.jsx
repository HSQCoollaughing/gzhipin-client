/*
* 大神信息完善
*
* */

import React,{Component}from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class LaobanInfo extends Component{
  state={
    post:'',
    info:'',
    company:'',
    salary:'',
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
    //console.log(this.state);
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
        <NavBar>老板完善信息</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem placeholder='请输入招聘职位' onChange={val=>(this.handleChange('post',val))}>招聘职位</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={val=>(this.handleChange('company',val))}>公司名称</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={val=>(this.handleChange('salary',val))}>职位薪资</InputItem>
        <TextareaItem placeholder='请输入职位薪资' title='职务要求'
                      rows={3} onChange={val=>(this.handleChange('info',val))}></TextareaItem>
        <Button type='primary' onClick={this.handleSave}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser}
)(LaobanInfo)