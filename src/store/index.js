import { createStore } from 'vuex'

export default createStore({
  state: {
    showText:"这是仓库里的数据",
    title:"这个是标题",
    content:"数据获取失败",
    showToast:false,
    showCover:false,
    userInfo:{
      username:"测试名",
      id:11,
      avatar:"http://www.boke.xiuchif.cn/images/avatar.jpg"
    },
    socketUserInfo:{id:false},
    myInfo:{
      username:"羞耻疯",
      sign:"阿巴阿巴",
      avatar:"avatar.jpg",
      gitHub:"",
      address:"江苏-苏州",
    },
  },
  mutations: {
    showToast(state,payload){
      // state.showCover=true
      state.showToast=true
      setTimeout(()=>{
        // state.showCover=false
        state.showToast=false
      },1000)
    },
    socketLogin(state,payload){
      console.log(state,"仓库")
      state.socketUserInfo=payload
      console.log("仓库改变",state.socketUserInfo)
    },
  },
  actions: {
    
  },
  modules: {
  }
})
