<template>
  <div class="chatRoom">
    <p class="title">加 密 通 话</p>
    
    <div class="chatList" id="chatList" v-if="socketUserInfo.id">
        <a-empty />
      <ul
        v-for="(item, index) in chatList"
        :key="index"
        style="width: 100%;"
        class="flex flex-direction"
        
      >
        <!-- 别人 -->
        <li class="chatItem flex flex-direction align-start" v-if="item.uid!=socketUserInfo.id">
            <!-- <span>{{item.uid==socketUserInfo.id}}</span> -->
          <div class="user flex justify-center align-center">
            <img
              :src="item.avatar"
              mode="aspectFill"
            />
            <span class="username">{{item.userName}}</span>
          </div>
          <div class="chatContent flex justify-start align-center">
            <span
              >{{item.text}}</span
            >

            <!-- <span v-if="item.wx"></span> -->
          </div>
        </li>
        <!-- 自己 -->
        <li
          class="chatItem flex flex-direction align-end"
          style="float: right; align-self: flex-end;"
          v-if="item.uid==socketUserInfo.id"
        >
          <div class="user flex justify-center align-center">
            <span class="username" style="margin-right: 10px; margin-left: 0;"
              >{{item.username}}</span
            >
            <img
              src="http://www.boke.xiuchif.cn/images/avatar.jpg"
              mode="aspectFill"
            />
          </div>
          <div class="answerChat flex justify-start align-center">
            <span>{{item.text}}</span>
          </div>
        </li>
      </ul>
     
    </div>
    <div class="bottom"><textarea
        class="chatInput"
        v-model="text"
        name=""
        id=""
        cols="80"
        onpropertychange="this.style.posHeight=this.scrollHeight "
      ></textarea>
      <button style="float: right; margin: 10px;" @click="send">发送消息</button></div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "ws://47.103.38.179:9991",
      socket: "",
      chatList: [
        
      ],
      text:"",
      socketUserInfo:{id:false}
    };
  },
  created() {
    if (!this.$store.state.socketUserInfo.id) {
        console.log("聊天室用户",this.$store.state.socketUserInfo)
      this.$router.replace("/socketLogin")
      return
    }else{
        this.socketUserInfo=this.$store.state.socketUserInfo
    }
  },
  mounted() {
    // 初始化
    this.init();
  },
  unmount() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
  methods: {
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    send(){   
        let user=this.$store.state.socketUserInfo
        // console.log("当前用户",user)
        if(!this.text){
            this.$msg.error("你在放空屁?")
            return
        }
        let param={
            id:user.id,
            text:this.text
        }
        
        this.socket.send(JSON.stringify(param) );
    },


    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    // 监听服务器返回信息
    getMessage: function (msg) {
      console.log(msg.data);
      let data=JSON.parse(msg.data)
      this.chatList.push(data)
    //   console.log(data,msg.data,"添加的数据")
      this.$nextTick(()=>{
          let dom = document.getElementById("chatList")
          console.log("拿到的元素",dom.body)
          dom.scrollTop = dom.scrollHeight;
      })
    },
    
    close: function () {
      console.log("socket已经关闭");
    },

    uploadImg(event, insertImage, files) {
      console.log("上传图片参数", event);
      insertImage({
        url: files,
        desc: "七龙珠",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "assets/css/page/socket.less";
.bottom{
     position:absolute ;
  bottom: 0px;
  left: 0;
  right: 0;
}
.chatInput {
 
  margin: auto;

  padding: 5px 10px;
  font-size: 15px;
  //   height: 52px;
  min-height: 100px;
  max-height: 160px;
  height: auto;
  overflow-y: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  vertical-align: bottom;
  transition: all 0.3s, height 0s;
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
 
  display: inline-block;
  width: 100%;

  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  resize: vertical;
//   margin-top: 10px;
}
.chatInput:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
.chatInput:focus,
.chatInput:hover {
  border-color: #40a9ff;
  border-right-width: 1px !important;
}
</style>
