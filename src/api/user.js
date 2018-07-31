import fetch from '../utils/fetch'
export function login (data = {}) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: data,
    baseURL:'http://36.7.138.114:5026/ws-syslogin/'
  })
}
