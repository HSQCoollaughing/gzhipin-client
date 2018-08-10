/*
* 聊天组件*/
import React,{Component}from 'react';
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'
const Item=List.Item;


class Chat extends Component{
  state={
    content:'',
    isShow:false
  }
  componentWillMount(){
    this.emojis=['😁','😂','😃','😄','😂','😃','😄','😂','😃','😄','😂','😃','😄'
      ,'😂','😃','😄','😂','😃','😄','😂','😃','😄','😂','😃',,'😂','😃','😄','😂'
      ,'😃','😄','😂','😃','😄','😂','😃',,'😂','😃','😄','😂','😃','😄','😂','😃'
      ,'😄','😂','😃',
    ]
    this.emojis=this.emojis.map(item=>({text:item}))
  }
  componentDidMount(){
    //初始化显示到底部
    window.scrollTo(0,document.body.scrollHeight)
  }
  componentDidUpdate(){
    //更新时候显示到底部
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleSend=()=>{
    //收集数据
    const from=this.props.user._id;
    const to=this.props.match.params.userid;
    const content=this.state.content;
    //发送异步请求
    if(!content){
      return null;
    }

    this.props.sendMsg({from,to,content});
    //清除输入框数据
    this.setState({
      content:'',
      isShow:false
    });

  }
  handleShow=()=>{
    const isShow=!this.state.isShow;
    this.setState({isShow});
    if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
      },0)

    }
  }
  render(){
    const {user}=this.props;
    const {users,chatMsgs}=this.props.chat;
    const meId=user._id;//自己的id
    if(!users[meId]){//如果没有获取到数据，就不做任何处理
      return null;
    }
    const targetId=this.props.match.params.userid;//对方的ID
    const chatId=[meId,targetId].sort().join('_');
    //对msgs进行过滤
    const msgs=chatMsgs.filter(msg=>msg.chat_id===chatId);
    //得到目标头像
    const targetHeader=users[targetId].header;
    const targetIcon=targetHeader?require(`../../assets/images/${targetHeader}.png`):null;
    return (
      <div id='chat-page'>
          <NavBar className='fixed-header'
                  icon={<Icon type='left'/>}
                  onLeftClick={()=>this.props.history.goBack()}
          >
            {users[targetId].username}
          </NavBar>
          <List style={{marginTop:45,marginBottom:50}}>
            {
              msgs.map(msg => {
                if (targetId === msg.from) {//别人发给我的
                  return (
                    <Item key={msg._id}
                          thumb={targetIcon}>{msg.content}</Item>
                  )
                } else {
                  return (//我发给别人的
                    <Item key={msg._id}
                          className='chat-me'
                          extra='我'>{msg.content}</Item>
                  )
                }
              })
            }
          </List>
        <div className='am-tab-bar'>
          <InputItem placeholder='请输入'
                     value={this.state.content}
                     onChange={val=>this.setState({content:val})}
                     onFocus={()=>this.setState({isShow:false})}
                     extra={
                       <span>
                          <span onClick={this.handleShow} style={{marginRight:5}}>😃</span>
                          <span onClick={this.handleSend}>发送</span>
                       </span>

                     }></InputItem>
          {
            this.state.isShow?(
              <Grid data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item)=>{
                      this.setState({content:this.state.content+item.text})
                    }}
              >
              </Grid>
            ):null
          }

        </div>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg}
)(Chat)