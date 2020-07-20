import axios from 'axios'

const service = axios.create({
  baseURL: "https://pearmusic.online/",  //https://autumnfish.cn  http://music.jsososo.com/apiMix/ https://music.ztyuu.com/api/
  timeout: 5000, // request timeout
  withCredentials:true    //跨域权限
});
//请求拦截
service.interceptors.request.use(
  config => {               //放开请求限制   config是我的请求体
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
//响应拦截
service.interceptors.response.use(              //对响应的数据进行判断    response是响应体
  response => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service