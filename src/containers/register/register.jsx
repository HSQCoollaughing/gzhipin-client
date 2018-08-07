/*
* 注册路由界面*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'
import {
  NavBar,
  List,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Radio
} from 'antd-mobile'
const ListItem=List.Item;

class Register extends Component{
  state={
    username:'',
    password:'',
    password2:'',
    type:'dashen'
  }
  handleSubmit=()=>{
    //console.log(this.state);
    this.props.register(this.state);
  }
  handleChange=(name,val)=>{
    //更新状态
    this.setState({
      [name]:val
    })
  }
  toLogin=()=>{
   this.props.history.replace('/login')
  }

  render(){
    const {type}=this.state;
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
            <InputItem placeholder='请输入确认密码' type='password' onChange={val=>{this.handleChange("password2",val)}}>确认密码:</InputItem>
            <WhiteSpace></WhiteSpace>
            <ListItem>
              <span>用户类型:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==="dashen"} onChange={()=>{this.handleChange("type","dashen")}}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==="laoban"} onChange={()=>{this.handleChange("type","laoban")}}>老板</Radio>
            </ListItem>
            <WhiteSpace></WhiteSpace>
            <Button type='primary' onClick={this.handleSubmit}>用户注册</Button>
            <WhiteSpace></WhiteSpace>
            <Button onClick={this.toLogin}>已有用户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {register}
)(Register)