import fetch from '../utils/fetch'
// 项目完成情况
export function projectStatisticsAccomplishApi (data = {}) {
  return fetch({
    url: '/NewProReport/projectStatisticsAccomplish',
    method: 'post',
    data: data,
  })
}
// 项目分布情况
export function projectStatisticsOverallApi (data = {}) {
  return fetch({
    url: '/NewProReport/projectStatisticsOverall',
    method: 'post',
    data: data,
  })
}
// 项目总体情况
export function projectStatisticsDistributedApi (data = {}) {
  return fetch({
    url: '/NewProReport/projectStatisticsDistributed',
    method: 'post',
    data: data,
  })
}
