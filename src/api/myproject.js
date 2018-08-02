import fetch from '../utils/fetch'
// 所有项目列表
export function getAllMyProjectListApi (data = {}) {
  return fetch({
    url: '/getAllMyProjectList',
    method: 'post',
    data: data,
  })
}
// 项目详情信息
export function getLogDetailInfoApi (data = {}) {
  return fetch({
    url: '/getLogDetailInfo',
    method: 'post',
    data: data,
  })
}
// 根据项目得到任务
export function getTaskListByProIdApi (data = {}) {
  return fetch({
    url: '/getTaskListByProId',
    method: 'post',
    data: data,
  })
}
