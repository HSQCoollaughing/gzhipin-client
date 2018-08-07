/*
* 主界面路由*/
import React,{Component}from 'react';
import {Switch,Route,} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar,Button} from 'antd-mobile'

import DaShenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import {updateUser,getUser} from "../../redux/actions";
import {getRedirectTo} from "../../utils/utils";
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFind from '../../components/not-find/not-find'
import NavFooter from '../../components/nav-footer/nav-footer'


class Main extends Component{
  //给组件对象添加数据
  navList=[//包含所有导航的信息
    {
      path:'/laoban',
      component:Laoban,
      title:'大神列表',
      icon:'dashen',
      text:'大神'
    },
    {
      path:'/dashen',
      component:Dashen,
      title:'老板列表',
      icon:'laoban',
      text:'老板'
    },
    {
      path:'/message',
      component:Message,
      title:'消息列表',
      icon:'message',
      text:'消息'
    },
    {
      path:'/personal',
      component:Personal,
      title:'个人列表',
      icon:'personal',
      text:'个人'
    },
  ]
  componentDidMount(){
    //读取cookie的userid
    const userid=Cookies.get('userid');
    //读取user中的_id
    const {_id}=this.props.user;
    if(userid&&!_id){
      //console.log('发送ajax请求');
      this.props.getUser();
    }
  }
  render(){
   /* 读取cookie的userid
          如果没有，直接跳转到登录界面
          如果有userid，再分析redux中是否有_id;
            如果没有_id，那么就是登录了关闭了浏览器，又来了,发ajax请求数据  暂时返回null,不做处理
            如果有_id, 根据type和header做相应的跳转
    */
    //读取cookie的userid
    const userid=Cookies.get('userid');
    //如果没有，直接跳转到登录界面，第一次登陆或者是长时间没登陆，cookie失效

    if(!userid){
      return <Redirect to='/login'></Redirect>;
    }
    //如果有userid，再分析redux中是否有_id;
    //读取user中的_id
    const {user}=this.props;
    if(!user._id){//发送ajax请求数据显示页面
      return null;
    }else{//既有userid也有_id,正常登陆，有一种特殊情况，当请求的是根路径的时候‘/’
      let path=this.props.location.pathname;
      if(path==='/'){//当请求的是根路径的时候，根据type和header判断跳转的路径
        path=getRedirectTo(user.type,user.header);

        return <Redirect to={path}></Redirect>;
      }
    }
    //显示路由头部导航，看当前的路由是否和navlist中的有匹配，有的话就显示头部
    const {navList}=this;
    const path=this.props.location.pathname;
    const currentNav=navList.find(nav=>nav.path===path);
    if(currentNav){
      if(user.type==='laoban'){
        navList[1].hide=true;
      }else{
        navList[0].hide=true;
      }
    }
    return (
      <div>
        {currentNav?<NavBar className='fixed-header'>{currentNav.title}</NavBar>:null}
        <Switch>
          {
            navList.map(nav=><Route key={nav.path} path={nav.path} component={nav.component}></Route>)
          }
          <Route path='/laobaninfo' component={LaobanInfo}></Route>
          <Route path='/dasheninfo' component={DaShenInfo}></Route>
          <Route path='/notfind' component={NotFind}></Route>
        </Switch>
        {currentNav?<NavFooter navList={navList}></NavFooter>:null}
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser,getUser}
)(Main)