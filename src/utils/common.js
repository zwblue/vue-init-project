// 产品状态
let projectStateArray = [
  { index: 1, name: "立项待审批" },
  { index: 2, name: "开发中" },
  { index: 3, name: "上线待审批" },
  { index: 4, name: "完成" },
  { index: 5, name: "驳回" },
  { index: 6, name: "作废" },
  { index: 7, name: "逾期" },
  { index: 8, name: "延期待审批" }
];
// 产品类型
let projectTypeArray=[
  {index:1,name:'产品'},
  {index:2,name:'活动'}
]
export function getProjectState(num) {
  if (!num) return;
  for (let val of projectStateArray) {
    if (val.index === num) {
      return val.name;
    }
  }
}
export { projectStateArray,projectTypeArray };
