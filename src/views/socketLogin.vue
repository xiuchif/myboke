<template>
  <div class="content">
    <div class="login">
      <p>登录</p>
      <div class="flex align-center">
        <span class="iconfont icon-User"></span>
        <input
          type="text"
          v-model="username"
          :maxlength="10"
          placeholder="请输入用户名"
        />
      </div>
      <div class="flex align-center" style="margin-top: 15px;">
        <span class="iconfont icon-mima"></span>
        <input
          type="password"
          v-model="password"
          :maxlength="15"
          placeholder="请输入密码"
        />
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "socketLogin",

  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      //   console.log(this.username)
      if (this.username && this.password) {
        let param = {
          username: this.username,
          password: this.password,
        };
        let result = await this.$http(this.$ifa.socketLogin, param);
        // console.log("登录返回", result);
        if(result.status){
            this.$store.commit("socketLogin",result.data[0])
            console.log(this.$store.state.socketUserInfo)
            this.$router.push("/socket")
        }else{
            this.$msg.error(result.msg)
        }
      } else {
        this.$msg.error("用户名或密码为空");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  min-height: calc(100vh - @headerHeight - @footHeight - 60px);
}
.login {
  margin: auto;
  //   margin-top: 10%;
  position: relative;
  top: 100px;
  padding: 10px;
  //   padding-bottom: ;
  width: 300px;
  //   height: 400px;
  background-color: #fff;
  input {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    width: 100%;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
  }
  button {
    margin-top: 15px;
  }
  .iconfont {
    color: rgba(0, 0, 0, 0.65);
    font-size: 18px;
  }
}
</style>
