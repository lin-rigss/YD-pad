import Vue from 'vue';
import App from './App';
import {
  router
} from '@/router';
import '@/util/globalFun'
import '@/assets/iconfont/iconfont.js'
import store from './store'
import './util/rem'
import './assets/css/tabs.less'
import VsConsole from 'vconsole'

if (process.env.NODE_ENV == 'development') {
  var vConsole = new VsConsole({});
  vConsole.setOption('maxLogNumber', 5000);
}



// Vant 按需导入
import { Field, Button, CellGroup, Checkbox, Picker, Popup, RadioGroup, Radio, AddressEdit, Dialog, Switch, Toast, Icon, Pagination, Loading, NavBar } from 'vant'
Vue.use(Field).use(Button).use(CellGroup).use(Checkbox).use(Picker).use(Popup).use(RadioGroup).use(Radio).use(AddressEdit).use(Dialog).use(Switch).use(Toast).use(Icon).use(Pagination).use(Loading).use(NavBar)


// 组件的全局注册
// import {
//   Header,
//   Title
// } from '@/components'
// Vue.component('Header', Header)
// Vue.component('Title', Title)
// import {
//   IconSvg
// } from '@/components'
// //全局注册icon-svg
// Vue.component('icon-svg', IconSvg)




router.beforeEach((to, from, next) => {
  const isLogin = localStorage.login ? true : false; 
  if (to.path == '/login') {
    next();
  } else{
    isLogin ? next() : next('/login')
  }
});



window.$router = router
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});