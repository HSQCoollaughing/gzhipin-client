import io from 'socket.io-client'

//io是个函数
const socket=io('ws://localhost:4000');
//向服务器发送消息
socket.emit('sendMsg',{name:'luhuan'});
console.log('向服务器发送消息');
//接受到服务器发送来的消息
socket.on('receiveMsg',function (data) {
  console.log('接受到服务器发送来的消息'+data);
})
