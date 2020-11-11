<template>
  <div class="message flex flex-direction align-center">
    <!-- asdad -->
    <!-- 留言框 -->
    <div class="addMessage">
      <div class="top">
        <div class="avatar"></div>
        <div class="aDetail" @click="login">登录</div>
      </div>

      <div>
        <textarea
          class="mesInput"
          placeholder="有什么想对我说的，在这里给我留言吧"
          placeholder-style="color:red"
          cols="30"
          rows="3"
          v-model="message"
        ></textarea>
      </div>
      <button class="sumbitMsg" @click="addMsg">留言</button>
    </div>
    <!-- 留言列表 -->
    <div class="messageList">
      <div
        class="messageItem"
        v-for="(item, index) in messageList.data"
        :key="index"
      >
        <message-item :detail="item" @reply="showReply(item)"></message-item>
      </div>
    </div>
    <a-pagination
      :default-current="page"
      :total="messageList.count"
      :defaultPageSize="pagenum"
      @change="changePage"
    />
  </div>
</template>

<script>
import messageItem from "components/message/messageItem.vue";
export default {
  name: "message",
  components: {
    messageItem,
  },
  data() {
    return {
      page: 1,
      pagenum: 5,
      message: "", //输入的留言
      messageList: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    login() {},
    async loadData() {
      this.show();
      this.getMessageList();
    },
    async show() {
      // let post =
      let result = await this.$nhttp("message/messageList", {
        page: 1,
        pagenum: 10,
      });
      console.log("这个能拿到吗", result);
    },
    async getMessageList() {
      let param = {
        page: this.page,

        pagenum: this.pagenum,
      };
      let result = await this.$http(this.$ifa.messageList, param);
      console.log(result, "留言列表");
      if (result.status) {
        this.messageList = result;
      } else {
        this.$msg.error(result.msg);
      }
    },
    async addMsg(item) {
      if(!this.message){
        this.$msg.error("请输入留言")
        return
      }
      let user = this.$store.state.userInfo;
      let date=new Date().getTime()
      let param = {
        uid: user.id,
        username: user.username,
        avatar: user.avatar,
        context: this.message,
        date
      };
      console.log("日期",date)
      let result = await this.$http(this.$ifa.addMsg, param);
      if (result.status) {
        this.page = 1;
        this.getMessageList();
      }
      this.message=""
      console.log("添加传参", JSON.stringify(param), "返回", result);
    },
    showReply(item){
      item.isReply=true
    },

    changePage(current) {
      console.log("改变页数", current);

      this.page = current;
      this.getMessageList();
    },
  },
};
</script>

<style lang="less" scoped>
.message {
  margin: auto;
  width: 900px;
  // background-color: #fff;
}
.addMessage {
  width: 100%;
  // background-color: red;
  padding-bottom: 10px;
  .top {
    height: 3rem;
    z-index: 2;
    .avatar {
      height: 4rem;
      width: 4rem;
      position: absolute;
      z-index: 1;
      border: 1px solid #57a3f3;
      border-radius: 50%;
      top: 0;
      left: 2rem;
      background: #fff;
    }
    .aDetail {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      position: absolute;
      border: 1px solid #57a3f3;
      z-index: 3;
      left: 2.5rem;
      top: 0.5rem;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      cursor: pointer;
      background: #fff;

      overflow: hidden;
    }
  }
  .mesInput {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    height: 118px;
    padding: 1.5rem 0.5rem 0.5rem;
    min-height: 118px;
    max-height: 244px;
    text-align: start;
    overflow-y: hidden;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    border-color: #57a3f3 !important;
    color: #515a6e !important;
    vertical-align: bottom;
    font-size: 14px;
  }
  .sumbitMsg {
    float: right;
    font-size: 16px;
    margin: 10px;
    width: 4em;
    color: #fff;
    background-color: #19be6b;
    border-radius: 3px;
    padding: 1px 7px 2px;
    border: 1px solid #19be6b;
  }
}
.messageList {
  width: 100%;
  .messageItem {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
  }
}
</style>
