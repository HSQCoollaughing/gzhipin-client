/*
* 信息界面路由容器*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
import {Result,Button,List,WhiteSpace,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item=List.Item;
const Brief = Item.Brief;

class Personal extends Component{
  handleLogOut=()=>{
    Modal.alert('退出','确认退出吗',[
      {
        text:'取消'
      },
      {
        text:'退出',
        onPress:()=>{
          //删除cookie
          Cookies.remove('userid');
          //清除redux当中的user数据
          this.props.resetUser();
        }
      }
    ])
  }
  render(){
    const {username,type,info,company,salary,header,post}=this.props.user;
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width:50}}/>}
          title={username}
          message={company}
        ></Result>
        <List renderHeader={()=>'相关信息'}>
            <Item multipleLine>
              <Brief>职位：{post}</Brief>
              <Brief>简介：{info}</Brief>
              {salary? <Brief>薪资：{salary}</Brief>:null}

            </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Button type='warning' onClick={this.handleLogOut}>退出登录</Button>
        </List>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {resetUser}
)(Personal)