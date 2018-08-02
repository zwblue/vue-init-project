// 产品状态
export let projectStateArray = [
  { index: 1, name: "立项待审批" },
  { index: 2, name: "开发中" },
  { index: 3, name: "上线待审批" },
  { index: 4, name: "完成" },
  { index: 5, name: "驳回" },
  { index: 6, name: "作废" },
  { index: 7, name: "逾期" },
  { index: 8, name: "延期待审批" }
];
// 根据项目状态得到name
export function getTaskState(num) {
  if (!num) return;
  for (let val of projectStateArray) {
    if (val.index == num) {
      return val.name;
    }
  }
}

// 根据项目状态设置样式
export function addClass(num){
  if(num==7||num==8){
    return 'error'
  }else{
    return ''
  }
}

// 任务，子任务状态
export let taskStateArray = [
  { index: 1, name: "未开始" },
  { index: 2, name: "开发中" },
  { index: 3, name: "预验收" },
  { index: 4, name: "完成" },
  { index: 5, name: "逾期" }
];

// 根据任务，子任务状态得到name
export function getProjectState(num) {
  if (!num) return;
  for (let val of projectStateArray) {
    if (val.index == num) {
      return val.name;
    }
  }
}

// 产品类型
export let projectTypeArray=[
  {index:1,name:'产品'},
  {index:2,name:'活动'}
]

// 得到项目类型
export function getProjectType(num) {
  if (!num) return;
  for (let val of projectTypeArray) {
    if (val.index == num) {
      return val.name;
    }
  }
}

// 开发日志类型
export let devlogType=[
  {index:1,name:'更新'},
  {index:2,name:'完成'}
]

// 得到开发项目类型
export function getDevlogType(num) {
  if (!num) return;
  for (let val of devlogType) {
    if (val.index == num) {
      return val.name;
    }
  }
}

