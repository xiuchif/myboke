import { createApp } from 'vue'
import {Pagination,Spin,Message} from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

// import {Button } from 'ant-design-vue';

import "./assets/css/config.less"


import Api from "./assets/js/api.js"
import ifa from "./assets/js/ifa.js"
import request from "./assets/js/request.js"


import myNav from "./components/common/nav.vue"
import myFoot from "./components/common/foot.vue"
import toast from "./components/common/toast.vue"
import cover from "./components/common/cover.vue"
// import request from "./assets/js/request"

// console.log(Antd,"主文件里的")
// c
// let app=createApp(App).use(store).use(router).use(Antd)
VueMarkdownEditor.use(vuepressTheme);

let app=createApp(App)
// console.log("主文件里的",http.http)
app.config.globalProperties.$api=Api
app.config.globalProperties.$ifa=ifa
app.config.globalProperties.$http=request.http
app.config.globalProperties.$nhttp=request.nhttp
app.config.globalProperties.$moment=moment
app.config.globalProperties.$message=Message
app.config.globalProperties.$show=()=>"变量"
app.config.globalProperties.img="http://www.boke.xiuchif.cn/images/"
app.config.productionTip = false
app.component("myNav",myNav)
app.component("myFoot",myFoot)
app.component("toast",toast)
app.component("cover",cover)
app.component(Pagination.name,Pagination)
app.component(Spin.name,Spin)
// app.component(Message.name,Message)
app.use(store)
app.use(router)
// app.use(Message)
app.use(VueMarkdownEditor)

app.mount('#app')
// export default app
