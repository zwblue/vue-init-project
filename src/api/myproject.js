import fetch from '../utils/fetch'
// 所有项目列表
export function getAllMyProjectListApi (data = {}) {
  return fetch({
    url: '/getAllMyProjectList',
    method: 'post',
    data: data,
  })
}
// 项目参与组

export function newGroupHandleApi (data = {}) {
  return fetch({
    url: '/newGroupHandle',
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
// 项目申请
export function newApplyProjectApi (data = {}) {
  return fetch({
    url: '/newApplyProject',
    method: 'post',
    data: data,
  })
}
// 延期,立项,上线
export function projectApprovalApi (data = {}) {
  return fetch({
    url: '/projectApproval',
    method: 'post',
    data: data,
  })
}


// 项目回收站
export function selectRecProApi (data = {}) {
  return fetch({
    url: '/selectRecPro',
    method: 'post',
    data: data,
  })
}


// 归档项目
export function newSelectFinProApi (data = {}) {
  return fetch({
    url: '/NewSelectFinPro',
    method: 'post',
    data: data,
  })
}
