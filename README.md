## Usage
###local

    npm run dev
>1.本地开发的时候运行此命令,不需要启动后端服务,会自动开启本地服务。后端模板,路由在build/server中进行修改,添加
>2.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开首页。你可以在`config`文件夹中修改你的开发服务器配置。
编写代码保存，浏览器即可热刷新。
>3.因为前端入口文件只有一个,首页server/router.js配置路由的时候也都是走通用模板,不需要建立多个后端模板文件

**注意：**
>1.修改入口js不支持热刷新从而导致整个页面自动刷新。
2.页面在进入时闪烁，是因为css是通过js追加的。
3.该模式下生成的资源都是在内存中进行服务，不会输出到dist目录。
<u>这些都是正常现象，请放心使用！</u>

 
    npm run build
> 与后端人员联调的时候,执行改命令,不支持热加载   


### test / beta / prod
 
    
    npm run prod
    
>1.打包，发布，上线都是这个命令。
2.你可以随时通过`Ctrl+C`终止操作下一步操作。
3.生成的资源在dist目录下，打包在zip目录下。
4.因为用了按需加载,所以css并没有提取到一个单独的css文件，而是通过stlye样式内联进来的
5.按需加载的原因,需要生成manifest.json文件,json文件里面的versionFiles是需要后端加上版本号的资源文件。
在上传包的时候需要选择第三种上传方式,即选择'根据manifest管理方式上传'这种上传方式。
6.输入npm run prod打包时,首先需要输入上传包的环境。在输入上传包的环境的时候,支持输入'prod',但是这种情况下只支持生成线上zip包,不支持自动上传zip包,因为线上包是上传到ftp,由运营人员来上传的


根据manifest管理方式上传zip包的时候，会查找mainfest.json里面的'versionFiles'自动，只有这个字段里面的资源文件才会
加上版本号，不在这个字段里面的资源文件后端不会给改资源文件加版本号。

    
###build
    

    npm run build

>1.一般用来检查webpack生成的代码。
2.生成的资源是无压缩的。



beforeRouteLeave 路由拦截 

bind绑定 -->result结果页面 --> detail/index.vue页面。detail页面点击返回按钮，回到知道的页面
> 对于beforeRouteLeave钩子函数来说下面写法都有问题 
    next({name:'protocol'});//点击返回的时候会死循环
  
> 下面这种写法可以在点击返回的时候跳转到知道页面 
    let matched ;//在当前views/index.vue提前定义
    //前端路由拦截
    beforeRouteLeave(to,form,next){
        console.log(' 100019 !%%%%%%%%!',matched);
        if(matched){
            matched = false;//必须要,重置为false
            next(); //必须要
            return;
        }
        matched = true;
        next({name:'protocol'});
    }


