const api_list = (key) => {

    let root = pageConfig.contextPath || '';

    if (__DEV__) {
        root = 'http://fe.iwjw.com:8888/api/fete_api/n2dQ1n/3sgcEi/mockfinh5';
    }

    return root + {
         //绑定手机号码
        'recommendUser':'/user/recommendUser.action',
        'bindUser':'/bind/bindUser.action'
    }[key];
};


let chained_http=(apiName)=>(formData)=>(callback)=>{
   let param = {
        params:formData,
        method:'post',
        url:api_list(apiName)
    };
    return Vue.http(param).then((res)=>callback(res.body));
};


export default chained_http
