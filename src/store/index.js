import Vue from 'vue';
import Vuex from 'vuex';
import refreshData from './modules/refreshData'
Vue.use(Vuex);
const store=new Vuex.Store({
 modules:{
  refreshData
 }
})
export default store;