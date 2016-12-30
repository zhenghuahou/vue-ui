const api_list = (key) => {

    let root = pageConfig.contextPath || '';

    if (__DEV__) {
        root = 'http://fe.iwjw.com:8888/api/fete_api/n2dQ1n/3sgcEi/mockfinh5';
    }

    return root + {
              //发送验证码
            sendCode:'/bind/sendCode.action'
    }[key];
};


let chained_http=(apiName)=>(formData)=>(callback)=>{
   let param = {
        params:formData,
        method:'get',
        url:api_list(apiName)
    };
    return Vue.http(param).then((res)=>callback(res.body));
};
module.exports = chained_http;