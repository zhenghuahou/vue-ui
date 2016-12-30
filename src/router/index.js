import index from '../index/router.js'; 



var routes = [].concat([],
  index
);


routes.push({
    name:'index',
    path: '*',
    redirect: { name: 'bind' },
});

// 创建和挂载根实例
const router = new VueRouter({
  mode: 'history',
  routes
});


//全局钩子 https://github.com/vuejs/vue-router/blob/dev/docs/zh-cn/advanced/navigation-guards.md
router.beforeEach((to, from, next) => {
  var {title = ''} = to.meta;
	//改变页面标题
  if(to.name == 'result'){
      title = to.params.type == "1" ?'绑定手机':'推荐客户';
  }
	global.changeDocumentTitle(title);
  next();
});

// 全局钩子,没有next方法
// router.afterEach((to,from) =>{
// });

export {routes}

export default router


