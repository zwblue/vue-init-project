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
export function newSelectRecPro (data = {}) {
  return fetch({
    url: '/NewSelectRecPro',
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

// 项目甘特图
export function getGTChartByProApi (data = {}) {
  return fetch({
    url: '/getGTChartByPro',
    method: 'post',
    data: data,
  })
}
// 根据项目获取按扭
export function getDownRoleMenuByParentApi (data = {}) {
  return fetch({
    url: '/getDownRoleMenuByParent',
    method: 'post',
    data: data,
  })
}
// 项目参与组添加，修改，删除

export function newGroupHandleApi (data = {}) {
  return fetch({
    url: '/newGroupHandle',
    method: 'post',
    data: data,
  })
}


// 子任务的添加，修改，删除
export function updSubtaskhandleApi (data = {}) {
  return fetch({
    url: '/updSubtaskhandle',
    method: 'post',
    data: data,
  })
}

// 根据部门id查找项目中任务，子任务负责人
export function getMembersBySquadId(params){
  return fetch({
      url:'/getMembersBySquadId',
      method:'post',
      data:params
  })
}
// 提醒子任务
export function getHomePageRemindingApi(data){
  return fetch({
      url:'/getHomePageReminding',
      method:'post',
      data:data
  })
}

// 更新子任务
export function updSubtaskProgressApi(data){
  return fetch({
      url:'/updSubtaskProgress',
      method:'post',
      data:data
  })
}

// 更新子任务的下拉列表 

export function getUpdSubtaskSelect(params){
  return fetch({
      url:'/getUpdSubtaskSelect',
      method:'post',
      data:params
  });
}
// 上线待审批
export function updOnlineProToPassOrRejectApi(params){
  return fetch({
      url:'/updOnlineProToPassOrReject',
      method:'post',
      data:params
  });
}
// 延期待审批
export function updDelayProToPassOrRejectApi(params){
  return fetch({
      url:'/updDelayProToPassOrReject',
      method:'post',
      data:params
  });
}
// 立项待审批
export function updSetProToPassOrRejectApi(params){
  return fetch({
      url:'/updSetProToPassOrReject',
      method:'post',
      data:params
  });
}
// 项目操作 逾期，延期，上线，作废
export function updApplyHandleByProApi(params){
  return fetch({
      url:'/updApplyHandleByPro',
      method:'post',
      data:params
  });
}
// 查询是否有权限
export function getHandlerPowerByProAndTaskApi(params){
  return fetch({
      url:'/getHandlerPowerByProAndTask',
      method:'post',
      data:params
  });
}
