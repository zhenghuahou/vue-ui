//绑定手机页面
const bind = r => require.ensure([], () => r(require('./views/bind.vue')), 'bind')
const result = r => require.ensure([], () => r(require('./views/result.vue')), 'result')

export default [
  {
    path: '/index/bind',
    name: 'bind',
    component: bind,
    meta:{
      title:'绑定手机',
    }
  },
  {
    	path:'/result/:type',
    	name: 'result',
      meta:{
        title:'',
      },
    	component: result
    }
  ]
