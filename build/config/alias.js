import path from 'path';

const alias = {
    zepto: './src/global/lib/zepto/zepto.js',
    template: './src/global/lib/template.js',
    store: './src/global/lib/store.js',
    understore:'./src/global/lib/underscore.js',
    global:'./src/global/module/global.js',
    fastclick:'./src/global/lib/fastclick.js',
    jps:'./src/global/module/jps.js',
    weixin:'./src/global/wx/wxsa.js',
    vueComponents:'./src/components/index.js',
}

Object.keys(alias).forEach((name) => alias[name] = path.resolve(alias[name]))


export default alias;
