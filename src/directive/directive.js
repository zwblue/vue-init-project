import Vue from 'vue';
import { projectStateArray, taskStateArray } from 'utils/common.js'
// 自定义项目，任务状态指令
Vue.directive('state', function (el, binding) {
  if (binding.value.state) {
    let stateArray = null;
    const isPro = binding.value.type === 'pro';
    if (isPro) {
      stateArray = projectStateArray;
    } else {
      stateArray = taskStateArray;
    }
    if (binding.value.state) {
      let state = Number(binding.value.state);
      let day = Number(binding.value.day);
      for (let val of stateArray) {
        if (val.index === state) {
          let delayState = 0;
          if (isPro) {
            delayState = 7;
          } else {
            delayState = 5;
          }
          // 项目状态为8时，加红
          if(state===8){
            el.style.color = '#ed4014'
          }
          // 项目或任务逾期时加红加天数
          if (state === delayState) {
              el.innerText = val.name + day + '天';
              el.style.color = '#ed4014'
          } else {
            el.innerText = val.name;
          }
        }
      }
    }
  }
})