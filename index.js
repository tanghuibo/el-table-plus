import info from './package.json'
import ElTablePlus from './src/components/ElTablePlus.vue'

const components = [ElTablePlus]


const install = Vue => {
    components.forEach(item => {
        Vue.component(item.name, item)
    });
}

//引用文件方式时，会使用，类似jquery方式引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

//按需导出
export {
    elTablePlus
}

//完整导出
export default {
    name: info.name,
    author: info.author,
    version: info.version,
    description: info.description,
    install,
    ElTablePlus
}