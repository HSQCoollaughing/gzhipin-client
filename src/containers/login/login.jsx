/*
* 登录注册路由
* */
import React,{Component}from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

import {
  NavBar,
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
} from 'antd-mobile'
const ListItem=List.Item;
class Login extends Component{
  state={
    username:'',
    password:'',
  }
  Login=()=>{
    //console.log(this.state);
    this.props.login(this.state);
  }
  handleChange=(name,val)=>{
    //更新状态
    this.setState({
      [name]:val
    })
  }
  toRegister=()=>{
    this.props.history.replace('/register')
  }
  render(){
    const {msg,redirectTo}=this.props.user;
    if(redirectTo){
      return (
        <Redirect to={redirectTo}></Redirect>
      );
    }
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
            {msg?<div className='error-msg'>{msg}</div>:null}
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange("username",val)}}>用户名:</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange("password",val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace></WhiteSpace>
            <Button type='primary' onClick={this.Login}>登录</Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login}
)(Login)