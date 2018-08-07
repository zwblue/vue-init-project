
import fetch from '../utils/fetch'
// 所有项目列表
export function getAllDepartmentInfoApi (data = {}) {
  return fetch({
    url: '/getAllDepartmentInfo',
    method: 'post',
    data: data,
   
  })
}