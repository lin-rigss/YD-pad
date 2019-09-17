import Vue from 'vue';
import Router from 'vue-router';
import { getUserInfor } from '@/util/dealStorage'
// import { Toast } from 'vant'

Vue.use(Router);

const routes = [
  { path: '/', redirect: '/index' },
  {
    name: 'login',
    path: '/login',
    component: () => import('./view/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'forget',
    path: '/forget',
    component: () => import('./view/login/Forget'),
    meta: {
      title: '找回密码'
    },
  },
  {
    name: 'index',
    path: '/index',
    component: () => import('./view/index'),
    meta: {
      title: '首页'
    }
  },
  // {
  //   name: 'partindex',
  //   path: '/partindex',
  //   component: () => import('./view/Part/index.vue'),
  //   meta: {
  //     title: '严选首页'
  //   }
  // },
  {
    name: 'examine',
    path: '/examine',
    component: () => import('./view/Part/Examine.vue'),
    meta: {
      title: '严选验货'
    },
  },
  {
    name: 'part',
    path: '/part',
    component: () => import('./view/Part/Part.vue'),
    meta: {
      title: '严选入库'
    },
  },
  {
    name: 'partslist',
    path: '/partslist',
    component: () => import('./view/Part/PartList.vue'),
    meta: {
      title: '严选入库详情'
    },
  },  
  {
    name: 'shipment',
    path: '/shipment',
    component: () => import('./view/Much/Shipment.vue'),
    meta: {
      title: '统货'
    },
  },
 
  {
    name: 'scan',
    path: '/scan',
    component: () => import('./view/Much/Scan.vue'),
    meta: {
      title: '统货扫码'
    },
  },
  {
    name: 'cargo',
    path: '/cargo',
    component: () => import('./view/Much/Cargo.vue'),
    meta: {
      title: '统货信息录入'
    },
  },
  {
    name: 'details',
    path: '/details',
    component: () => import('./view/Much/Details.vue'),
    meta: {
      title: '统货列表信息'
    },
  },
  {
    name: 'sdetails',
    path: '/sdetails/:code',
    component: () => import('./view/Much/Sdetails.vue'),
    meta: {
      title: '拆解详情页'
    },
  },
  {
    name: 'production',
    path: '/production',
    component: () => import('./view/production/Production.vue'),
    meta: {
      title: '排产'
    }
  },
  {
    name: 'list',
    path: '/list',
    component: () => import('./view/production/List.vue'),
    meta: {
      title: '生产排产信息'
    },
  },
  {
    name: 'proscan',
    path: '/proscan',
    component: () => import('./view/production/Proscan.vue'),
    meta: {
      title: '排产扫码'
    },
  },
  {
    name: 'listdetails',
    path: '/listdetails/:code',
    component: () => import('./view/production/ListDetails.vue'),
    meta: {
      title: '排产详情页'
    },
  },
  { path: '*', redirect: '/index' }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes, linkActiveClass: 'active' });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  let userInfor = getUserInfor()
  // if(userInfor.token){
  //   next()
  // }else{
  //   if((to.path==='/index' && to.query.index == 3) || to.path === '/login'){
  //     next()
  //   }else{
  //     Toast('请您先进行登录')
  //     next({
  //       path:'/login',
  //     })
  //   }
  // }
  next();
});

export {
  router
};
