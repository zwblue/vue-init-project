const state = {
  hometask: false,
  detailsPro: false,
  detailsTask: false,
  detailsSubtask: false,
}
const getters = {

}
const actions = {

}
const mutations = {
  refreshHometask(state,{val}){
    state.hometask=val;
    return state.hometask;
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}