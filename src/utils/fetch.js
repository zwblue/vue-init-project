import axios from 'axios'
// import {
//   Message,
//   Modal
// } from 'iview';
// 封装axios 创建基础实例以及axios拦截
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://192.168.3.26:6426'
} else {
  if (process.env.type === 'test') {
    baseURL = 'http://36.7.138.114:5026/ws-syslogin/'
  } else {
    baseURL = 'http://report.wsloan.com:8888/ws-syslogin'
  }
}
const service = axios.create({
  timeout: 10000,
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});
service.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers.common['Authorization'] = localStorage.getItem('token')
  }

  config.data = JSON.stringify(config.data)
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // Message.error(response.data.message)
    } else {
      let loginURL = '';
      if (response.data.code === 403) {
        sessionStorage.clear()
        localStorage.clear()
        if (process.env.NODE_ENV === 'development') {
          if (sessionStorage.getItem('ifIsZyf')) {
            loginURL = 'http://localhost:8060/#/zyfLogin'
          } else {
            loginURL = 'http://localhost:8060/#/login'
          }
        } else {
          if (process.env.type === 'test') {
            if (sessionStorage.getItem('ifIsZyf')) {
              loginURL = 'http://192.168.3.26:5026/ws-operationsystem/#/zyfLogin'
            } else {
              loginURL = 'http://192.168.3.26:5026/ws-operationsystem/#/login'
            }
          } else {
            if (sessionStorage.getItem('ifIsZyf')) {
              loginURL = 'http://report.wsloan.com:8888/wsdm/#/zyfLogin'
            } else {
              loginURL = 'http://report.wsloan.com:8888/wsdm/#/login'
            }
          }
        }
        // Modal.error({
        //   title: '提示',
        //   content: '您的登录信息已过时，请重新登录!',
        //   onOk: () => {
        //     window.top.location.href = loginURL;
        //   }
        // });
      }
    }
    return response
  },
  error => {
    console.log('error:' + error)
    return Promise.reject(error)
  }
)
export default service
