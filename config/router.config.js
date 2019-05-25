export default [
  {
    path: 'oauth2/redirect',
    component: '../pages/OAuth2RedirectHandler.js',
    hideInMenu : true,
  },
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: 'menu/cloudAccounts', authority: ['ROLE_ADMIN', 'user'] },
      // menu
      {
        path:'/menu',
        icon:'menu',
        name:'menu',
        routes : [
          {
            path:'/menu/cloudAccounts',
            name:'cloudAccounts',
            component: './Menu/CloudAccounts',
            hideChildrenInMenu: true,
            routes : [
              {
                path: '/menu/cloudAccounts',
                redirect: '/menu/cloudAccounts/list',
              },
              {
                path: '/menu/cloudAccounts/list',
                name: 'cloudAccountsList',
                component: './Menu/CloudAccounts/CloudAccountsList',
              },
              {
                path:'/menu/cloudAccounts/:id',
                name:'cloudAccount',
                component: './Menu/CloudAccounts/CloudAccount',
              }
            ]
          },
          {
            path:'/menu/performanceTests',
            name:'performanceTests',
            component: './Menu/PerformanceTests',
            hideChildrenInMenu: true,
            routes : [
              {
                path: '/menu/performanceTests',
                redirect: '/menu/performanceTests/list',
              },
              {
                path:'/menu/performanceTests/list',
                name:'performanceTestsList',
                component: './Menu/PerformanceTests/PerformanceTestsList',
              },
              {
                path:'/menu/performanceTests/:id',
                name:'performanceTest',
                component: './Menu/PerformanceTests/PerformanceTest',
              }
            ]
          },
        ]
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
