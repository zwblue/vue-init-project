import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/views/home/home'], resolve)
const Layout = resolve => require(['@/components/layout/layout'], resolve)
const Login = resolve => require(['@/views/login/login'], resolve)

// 页面路由
const ApplyPro = resolve => require(['@/views/applyPro/applyPro'], resolve)
const CountPro = resolve => require(['@/views/countPro/countPro'], resolve)
const DelayPro = resolve => require(['@/views/delayPro/delayPro'], resolve)
const FinishedPro = resolve => require(['@/views/finishedPro/finishedPro'], resolve)
const MyPro = resolve => require(['@/views/myPro/myPro'], resolve)
const OnlinePro = resolve => require(['@/views/onlinePro/onlinePro'], resolve)
const RecyclePro = resolve => require(['@/views/recyclePro/recyclePro'], resolve)
const DayReport = resolve => require(['@/views/dayReport/dayReport'], resolve)
const ProDetails = resolve => require(['@/views/myPro/ProDetails'], resolve)


const pageItem = {
  background: '#fff',
  color: '#333',
  fontSize: '16px',
}
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: pageItem,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: pageItem
        },
        {
          path: '/applyPro',
          name: 'ApplyPro',
          component: ApplyPro,
          meta: pageItem
        },
        {
          path: '/countPro',
          name: 'CountPro',
          component: CountPro,
          meta: pageItem
        },
        {
          path: '/delayPro',
          name: 'DelayPro',
          component: DelayPro,
          meta: pageItem
        },
        {
          path: '/finishedPro',
          name: 'FinishedPro',
          component: FinishedPro,
          meta: pageItem
        },
        {
          path: '/myPro',
          name: 'MyPro',
          component: MyPro,
          meta: pageItem
        },
        {
          path: '/proDetails/:id',
          name: 'ProDetails',
          component: ProDetails,
          meta: pageItem
        },
        {
          path: '/onlinePro',
          name: 'OnlinePro',
          component: OnlinePro,
          meta: pageItem
        },
        {
          path: '/recyclePro',
          name: 'RecyclePro',
          component: RecyclePro,
          meta: pageItem
        },
        {
          path: '/dayReport',
          name: 'DayReport',
          component: DayReport,
          meta: pageItem
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        ...pageItem, background: '#666',
      }
    }
  ]
})

export default router;

