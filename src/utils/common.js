let projectStateArray=[{index:1,name:'立项待审批'},{index:2,name:'开发中'},{index:3,name:'上线待审批'},{index:4,name:'完成'},{index:5,name:'驳回'},{index:6,name:'作废'},{index:7,name:'逾期'},{index:8,name:'延期待审批'}]
export function getProjectState(num){
  projectStateArray.forEach((val)=>{
      if(val.index==num){
        console.log(val.name)
        return val.name
      }
  })
}
// switch (num) {
//   case "1":
//     return "立项待审批";
//   case "2":
//     return "开发中";
//   case "3":
//     return "上线待审批";
//   case "4":
//     return "完成";
//   case "5":
//     return "驳回";
//   case "6":
//     return "作废";
//   case "7":
//     return "逾期";
//   case "8":
//     return "延期待审批";
//   default:
//     return "其他";
// }
export {projectStateArray}