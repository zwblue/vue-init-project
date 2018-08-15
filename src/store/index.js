import Vue from 'vue';
import Vuex from 'vuex';
import refreshData from './modules/refreshData'
import user from './modules/user'
Vue.use(Vuex);
const store=new Vuex.Store({
 modules:{
  refreshData,
  user
 }
})
export default store;