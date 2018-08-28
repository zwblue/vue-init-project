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

// 得到没有任何操作的项目状态
let noButtonProjectStateArray = [
  { index: 4, name: "完成" },
  { index: 5, name: "驳回" },
  { index: 6, name: "作废" },
];
export function getNoButtonProjectState(num) {
  if (!num) return;
  for (let val of noButtonProjectStateArray) {
    if (val.index == num) {
      return false;
    }
  }
  return true
}

// 任务，子任务状态
export let taskStateArray = [
  { index: 1, name: "未开始" },
  { index: 2, name: "开发中" },
  { index: 3, name: "预验收" },
  { index: 4, name: "完成" },
  { index: 5, name: "逾期" }
];

// 产品类型
export let projectTypeArray = [
  { index: 1, name: '产品' },
  { index: 2, name: '活动' }
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
export let devlogType = [
  { index: 1, name: "开始" },
  { index: 2, name: "需求调整" },
  { index: 3, name: "会议" },
  { index: 4, name: "更新" },
  { index: 5, name: "预验收" }
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


// 操作日志类型
export let handlogType = [
  { index: 1, name: "创建" },
  { index: 2, name: "分配" },
  { index: 3, name: "修改" },
  { index: 4, name: "删除" },
  { index: 5, name: "上线" },
  { index: 6, name: "延期" },
  { index: 7, name: "作废" },
  { index: 8, name: "审批" }
]

// 得到操作类型
export function getHandlogType(num) {
  if (!num) return;
  for (let val of handlogType) {
    if (val.index == num) {
      return val.name;
    }
  }
}

// 工作时长去除周未双休
export function spliceWeekDay(startTime, days) {
  console.log(111, startTime, days)
  let sdate = new Date(startTime).getTime();
  let count = 0;
  for (var i = 0; i < days; i++) {
    let daytime = 24 * 60 * 60 * 1000;
    let day = new Date(sdate + (daytime * i)).getDay();
    if (day === 0 || day === 6) {
      count++;
    }
  }
  console.log('多少个星期六，星期天', count)
  let dayNum = days - count;
  if (parseInt(dayNum) == dayNum) {
    return String(dayNum)
  } else {
    let lastNum = dayNum - parseInt(dayNum)
    let workDate = ((lastNum * 24) / 9);
    if (lastNum <= 0.5) {
      workDate = ((lastNum * 24) / 9);
      return (parseInt(dayNum) + workDate).toFixed(1);
    } else {
      lastNum = 1 - (dayNum - parseInt(dayNum))
      workDate = ((lastNum * 24) / 9);
      return (Math.ceil(dayNum) - workDate).toFixed(1)
    }
  }
}
