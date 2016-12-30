/*
	鹊桥带是唯一入口文件
*/

import router from './router'
import App from './app'

// vue 项目基本配置
Vue.use(VueRouter);
Vue.use(VueResource);


// Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request,next)=>{
    // check output
    next((response) => {
      console.log(" response:",response,typeof response,'response.body:',typeof response.body);
      if(typeof response.body ==='string'){
        console.log('string');
        response.body = JSON.parse(response.body);
      }
    })
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#qqd')

