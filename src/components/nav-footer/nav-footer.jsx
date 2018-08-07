/*
* 底部导航组件
* */
import React,{Component}from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item=TabBar.Item;
class NavFooter extends Component{
  static propTypes={
    NavFooter:PropTypes.array
  }
  render(){
    let {navList}=this.props;
    navList=navList.filter(item=>!item.hide)
    const path=this.props.location.pathname;//非路由组件没有特殊属性，通过withRouter改变组件性质
    return (
      <TabBar>
        {
          navList.map((nav,index)=>(
            <Item title={nav.text}
                  key={index}
                  icon={{uri:require(`./images/${nav.icon}.png`)}}
                  selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                  selected={path===nav.path}
                  onPress={()=>this.props.history.replace(nav.path)}
            />
          ))
        }
      </TabBar>
    )
  }
}
//希望在非路由组件使用路由组件的特殊属性
//向外暴露withRouter
export default withRouter(NavFooter);