// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button, Message, Row, Col ,Table,Icon,Modal} from 'iview'
import 'iview/dist/styles/iview.css'
import "./index.css";
Vue.component('Button', Button);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Table', Table);
Vue.component('Icon', Icon);
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false
Vue.prototype.$IVIEW = {}//size报错的处理

router.beforeEach(
  (to, from, next) => {
    if (to.query.token) {
      sessionStorage.setItem('token', to.query.token);
    }
    if (sessionStorage.getItem('token')) {
      if (to.path == "/login") {
        next('/')
      } else {
        next();
      }
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next('/login');
      }
    }
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
