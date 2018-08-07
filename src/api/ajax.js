/*可以发送人和ajax请求
返回一个promise对象
向外暴露一个函数
* */
import axios from 'axios'
export default function ajax(url,data={},type="GET") {
  //GET请求
  if(type==='GET'){
    //首先拼串{username:luhuan,password:123}=>str:username=luhuan&password=123
    let paramStr='';
    Object.keys(data).forEach(key=>{
      paramStr+=key+'='+data[key]+'&';
    })
    if(paramStr){
      paramStr=paramStr.substr(0,paramStr.length-1);
    }
    return axios.get(url+'?'+paramStr);
  } else {
    //POST请求
    return axios.post(url,data);
  }
}