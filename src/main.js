import { createApp } from 'vue'
import {Pagination,Spin,Message,Input,Empty } from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

//自己的组件
import myNav from "./components/common/nav.vue"
import myFoot from "./components/common/foot.vue"
import toast from "./components/common/toast.vue"
import cover from "./components/common/cover.vue"
// 自己的配置
import Api from "./assets/js/api.js"
import ifa from "./assets/js/ifa.js"
import request from "./assets/js/request.js"


import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';

//markdownc插件
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
// codemirror 编辑器的相关资源
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';
// 额外组件样式
import "./assets/css/config.less"
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';


VMdEditor.Codemirror = Codemirror;

VMdEditor.use(githubTheme);
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createCopyCodePlugin());

console.log(VMdEditor.version);
let app=createApp(App)
// console.log("主文件里的",http.http)
app.config.globalProperties.$api=Api
app.config.globalProperties.$ifa=ifa
app.config.globalProperties.$http=request.http
app.config.globalProperties.$nhttp=request.nhttp
app.config.globalProperties.$moment=moment
app.config.globalProperties.$msg=Message
app.config.globalProperties.$show=()=>"变量"
app.config.globalProperties.img="http://www.boke.xiuchif.cn/images/"
app.config.productionTip = false
app.component("myNav",myNav)
app.component("myFoot",myFoot)
app.component("toast",toast)
app.component("cover",cover)
app.component(Pagination.name,Pagination)
app.component(Spin.name,Spin)
app.component(Input.name,Input)
app.component(Empty.name,Empty)
// app.component(textarea.name,textarea)
app.use(store)
app.use(router)
// app.use(Message)
app.use(VMdEditor)

app.mount('#app')
// export default app
