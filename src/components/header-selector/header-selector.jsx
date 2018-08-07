/*头像选择模块
* */
import React,{Component}from 'react';
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelctor extends Component{
  constructor(props){
    super(props);
    //准备好数据
    this.headerList=[];
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text:'头像'+(i+1),
        icon:require(`../../assets/images/头像${i+1}.png`)
      })

    }

  }
  static propTypes={
    setHeader:PropTypes.func.isRequired
  }
  state={
    icon:null
  }
  handleClick=({text,icon})=>{
    //更新当前状态
    this.setState({
      icon
    })
    //更新父组件状态
    this.props.setHeader(text);
  }
  render(){
    const {icon}=this.state;
    const listHeadet=!icon?'头像选择':(
      <div>
        已选择图片：<img src={icon} alt=""/>
      </div>
    );
    return (
      <List renderHeader={()=>listHeadet}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}></Grid>
      </List>
    )
  }
}