<template>
  <div class="chatRoom  flex flex-direction justify-between">
    <div class="title ">
      <span style="font-size: 24px;">
        加 密 通 话
      </span>
      <span class="online">在线<span class="num">{{ onLine }}</span>人</span>
    </div>

    <div class="chatList " id="chatList" v-if="socketUserInfo.id">
      <!-- <a-empty style="" /> -->
      
      <ul
        v-for="(item, index) in chatList"
        :key="index"
        style="width: 100%;"
        class="flex flex-direction"
      >
        <!-- 别人 -->
        <li
          class="chatItem flex flex-direction align-start"
          v-if="item.uid != socketUserInfo.id"
        >
          <!-- <span>{{item.uid==socketUserInfo.id}}</span> -->
          <div class="user flex justify-center align-center">
            <img :src="item.avatar" mode="aspectFill" />
            <span class="username">{{ item.username }}</span>
            <span style="margin-left: 10px;">
              {{ item.date }}
            </span>
          </div>
          <div class="chatContent flex justify-start align-center">
            <span>{{ item.text }}</span>

            <!-- <span v-if="item.wx"></span> -->
          </div>
        </li>
        <!-- 自己 -->
        <li
          class="chatItem flex flex-direction align-end"
          style="float: right; align-self: flex-end;"
          v-if="item.uid == socketUserInfo.id"
        >
          <div class="user flex justify-center align-center">
            <span style="margin-right: 10px;">
              {{ item.date }}
            </span>
            <span
              class="username"
              style="margin-right: 10px; margin-left: 0;"
              >{{ item.username }}</span
            >
            <img
              src="http://www.boke.xiuchif.cn/images/avatar.jpg"
              mode="aspectFill"
            />
          </div>
          <div class="answerChat flex justify-start align-center">
            <span>{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <textarea
        class="chatInput"
        v-model="text"
        name=""
        id=""
        cols="80"
        onpropertychange="this.style.posHeight=this.scrollHeight "
        @keydown="onSubmit($event)"
      ></textarea>
      <!-- <button style="float: right; margin: 10px;" @click="send">
        发送消息
      </button> -->
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      path: "ws://47.103.38.179:9991",
      // path: "ws://127.0.0.1:9991",
      socket: "",
      chatList: [],
      text: "",
      socketUserInfo: { id: false },
      webTitle: "",
      timer: null,
      missMsg: 0,
      onLine: 0,
    };
  },
  created() {
    if (!this.$store.state.socketUserInfo.id) {
      this.$router.replace("/socketLogin");
      return;
    } else {
      this.$store.state.showNav=false
      this.socketUserInfo = this.$store.state.socketUserInfo;

      this.init();
    }
  },
  mounted() {
    // 初始化

    this.webTitle = "加密通话";
    console.log(this.chatList, "聊天列表");
  },
  unmount() {
    // 销毁监听
    this.socket.onclose = this.close;
    this.$store.state.showNav=true
  },
  methods: {
    onSubmit(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        this.text += "\n"; //换行
      } else if (e.keyCode == 13) {
        this.send();
        e.preventDefault(); //禁止回车的默认换行
      }
    },
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(
          this.path + "?id=" + this.$store.state.socketUserInfo.id
        );
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
        this.timer = null;
        this.missMsg = 0;
      }
    },
    send() {
      let user = this.$store.state.socketUserInfo;
      // console.log("当前用户",user)
      if (!this.text) {
        this.$msg.error("你在放空屁?");
        return;
      }
      let date = new Date().getTime();

      // return
      let param = {
        id: user.id,
        text: this.text,
        date,
      };
      this.socket.send(JSON.stringify(param));
      this.chatList.push({
        username: user.username,
        avatar: user.avatar,
        uid: user.id,
        text: this.text,
        date: this.$api.getDate(date),
      });
      this.text = "";
      this.$nextTick(() => {
        let dom = this.$el.querySelector("#chatList");

        dom.scrollTop = dom.scrollHeight;
      });
    },

    // 监听服务器返回信息
    getMessage: function (msg) {
      let data = JSON.parse(msg.data);
      if (data.onLine) {
        this.onLine = data.onLine;
        return;
      }
      this.chatList.push(data);

      if (!this.timer) {
        this.timer = setInterval(() => {
          document.title == `新消息 ${this.missMsg}条`
            ? (document.title = this.webTitle)
            : (document.title = `新消息 ${this.missMsg}条`);
          // console.log("改标题", document.title);
        }, 600);
        this.missMsg = 1;
        document.body.onclick = () => {
          clearInterval(this.timer);
          document.title = "加密通话 ";
          this.timer = null;
        };
      } else {
        this.missMsg += 1;
      }
      this.$nextTick(() => {
        let dom = this.$el.querySelector("#chatList");

        dom.scrollTop = dom.scrollHeight;
      });
    },
    uploadImg(event, insertImage, files) {
      console.log("上传图片参数", event);
      insertImage({
        url: files,
        desc: "七龙珠",
      });
    },
    open: function (data) {
      console.log("socket连接成功", data);
    },
    error: function () {
      console.log("连接错误");
    },
    close: function (msg) {
      console.log("socket已经关闭");

      // this.onLine
    },
  },
};
</script>

<style lang="less" scoped>
@import "assets/css/page/socket.less";
.bottom {
  // position: absolute;
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
  // z-index: 999999999;
  // color: red;
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
