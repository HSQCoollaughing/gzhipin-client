/*
* 信息界面路由容器*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import chat from "../chat/chat";

const Item=List.Item;
const Brief=Item.Brief;

function getLastMsgs(chatMsgs,userid) {
  //1对chatMsgs进行分组根据chat_id分组属性名是最后一条消息,并且保存在对象容器中
  let lastMsgObjs={}//{chat_id:lastmsg}
  //1.1遍历分组，并且保存起来
  chatMsgs.forEach(msg=>{
    //对未读消息进行个体的统计，添加一个属性unrendcount0或者是1
    //0到1的过程  别人发给我的并且我是没有读的
    if(msg.to===userid&&!msg.read){
      msg.unReadCount=1;
    }else{
      msg.unReadCount=0;
    }

    //得到聊天的唯一标识
    const chatId=msg.chat_id;
    //首先判断容器当中是否保存了这一组的消息，假设有
    const lastMsg=lastMsgObjs[chatId];
    if(!lastMsg){//如果这一组是个空对象，没有保存任何数据
      lastMsgObjs[chatId]=msg;
    }else{//如果已经有值啦，在判断lastMsg和msg的创建时间
      //先获取到之前没读的消息
      const unReadCount=lastMsg.unReadCount;
      if(msg.create_time-lastMsg.create_time){//遍历到的比存在的数据晚，保存起来
        lastMsgObjs[chatId]=msg;
      }
      //更新所有的未读消息
      lastMsgObjs[chatId].unReadCount=unReadCount+msg.unReadCount;
    }
  })
  //2将lastMsgObjs对象转变为数组
  const lastMsgs=Object.values(lastMsgObjs);
  //3按照时间顺序进行排序,晚发的消息放在列表的前面
  lastMsgs.sort(function (m1,m2) {
    return m2.create_time-m1.create_time;
  })
  return lastMsgs;
}


class Message extends Component{

  render(){
    const {user}=this.props;
    const {users,chatMsgs}=this.props.chat;
    //1对chatMsgs进行分组根据chat_id分组属性名是最后一条消息
    const lastMsgs=getLastMsgs(chatMsgs,user._id);
    return (
      <List style={{marginTop:50,marginBottom:50}}>
        {
          lastMsgs.map(msg=>{
            const targetId=msg.to===user._id?msg.from:msg.to;
            const targetUser=users[targetId];
            return (
              <Item key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={targetUser?require(`../../assets/images/${targetUser.header}.png`):null}
                arrow='horizontal'
                onClick={()=>this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{targetUser?targetUser.username:null}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}
export default connect(
  state=>({user:state.user,chat:state.chat}),
  {}
)(Message)