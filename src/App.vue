<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <!-- <img id="bg" src="../public/img/bg.jpg" alt=""> -->
   <my-nav ></my-nav>
  <cover v-show="$store.state.showCover"/>
  <router-view id="routerView"/>
 
  <toast :title="$store.state.title" :content="$store.state.content" v-show="$store.state.showToast"></toast>
 
  <my-foot></my-foot>
</template>


<style lang="less">

@import url("./assets/css/main.css");
// @headerHeight:88px;
#app {
  padding-top: calc(@headerHeight + 0px);
  padding-bottom:0;
  margin-bottom:0;
  // box-sizing: border-box;
  min-height: 100vh;
  // padding-bottom: 140px;
  word-spacing: 1px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 1.5;
  color: #2c3e50;
  background: url("http://www.boke.xiuchif.cn/images/bg.jpg");
}
#bg{
  // background-color: red;
  position: relative;
  top:@headerHeight;
  width:100%;
  height: 100%;
  min-height: calc(100vh - @headerHeight - @footHeight);
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#routerView{
 margin-top:30px;
 min-height: calc(100vh - @headerHeight - @footHeight - 30px);
}
</style>
