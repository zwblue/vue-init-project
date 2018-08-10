import fetch from '../utils/fetch'
// 获得子任务的修改删除按钮
export function getButtonBySubtaskApi (data = {}) {
  return fetch({
    url: '/getButtonBySubtask',
    method: 'post',
    data: data,
   
  })
}
// 获得任务的修改删除按钮
export function getButtonByTaskApi (data = {}) {
  return fetch({
    url: '/getButtonByTask',
    method: 'post',
    data: data,
  })
}
