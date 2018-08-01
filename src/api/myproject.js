import fetch from '../utils/fetch'
export function getAllMyProjectListApi (data = {}) {
  return fetch({
    url: '/getAllMyProjectList',
    method: 'post',
    data: data,
  })
}
