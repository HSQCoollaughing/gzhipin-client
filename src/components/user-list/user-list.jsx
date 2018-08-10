/*
* 显示对应列表的UI组件*/
import React,{Component}from 'react';
import {WingBlank,Card,WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


class UserList extends Component{
  static propTypes={
    userList:PropTypes.array.isRequired
  }
  render(){
    const {userList}=this.props;
    return (
      <WingBlank style={{marginBottom:50,marginTop:50,}}>

        {
          userList.map(user=>(
            <div key={user._id}>
              <WhiteSpace size="lg" />
              <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                <Card.Header
                  thumb={require(`../../assets/images/${user.header}.png`)}
                  extra={user.username}
                />
                <Card.Body>
                  <div>职位:{user.post}</div>
                  <div>公司:{user.company}</div>
                  <div>月薪:{user.salary}</div>
                  <div>描述:{user.info}</div>
                </Card.Body>
              </Card>
              <WhiteSpace size="lg" />
            </div>
          ))
        }

      </WingBlank>
    )
  }
}
export default withRouter(UserList);