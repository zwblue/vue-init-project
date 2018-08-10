import fetch from '../utils/fetch'
// 所有项目推送
export function getProCountByCPAndHDApi (data = {}) {
  return fetch({
    url: '/getProCountByCPAndHD',
    method: 'post',
    data: data,
  })
}
// 项目概况
export function getProInfoByIndexApi (data = {}) {
  return fetch({
    url: '/getProInfoByIndex',
    method: 'post',
    data: data,
  })
}
// 组员任务
export function getMyMemberSubtaskCountByIndexApi (data = {}) {
  return fetch({
    url: '/getMyMemberSubtaskCountByIndex',
    method: 'post',
    data: data,
  })
}

// 我的任务
export function getMyTaskInfoByIndexApi (data = {}) {
  return fetch({
    url: '/getMyTaskInfoByIndex',
    method: 'post',
    data: data,
  })
}

// 组员下面的所能子任务
export function getAllSubtaskInfoByMenmberApi (data = {}) {
  return fetch({
    url: '/getAllSubtaskInfoByMenmber',
    method: 'post',
    data: data,
  })
}

// 员工任务统计
export function getSubtaskCountByMemberApi (data = {}) {
  return fetch({
    url: '/getSubtaskCountByMember',
    method: 'post',
    data: data,
  })
}
// 根据用户角色查询菜单
export function newFindRoleMenuApi (data = {}) {
  return fetch({
    url: '/newFindRoleMenu',
    method: 'post',
    data: data,
  })
}

