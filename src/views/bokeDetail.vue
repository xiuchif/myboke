<template>
  <div class="boke">
    <div class="flex justify-center">
      <div class="left flex flex-direction" v-if="myInfo">
        <card :detail="leftShow[0]">
          <div class="user flex flex-direction cardContent">
            <div class="uDetail flex">
              <img :src="this.img + myInfo.avatar" alt="" />
              <div class="uName flex flex-direction justify-between">
                <p style="color: #ffa710;">{{ myInfo.username }}</p>
                <p style="font-size: 90%;">{{ myInfo.sign }}</p>
              </div>
            </div>
            <!-- 个人展示 -->
            <div class="uShow flex flex-direction">
              <div class="git show flex align-center">
                <span class="iconfont icon-github bigFont"></span>
                <span class="git midFont">gitHub</span>
              </div>
              <div class="address show flex align-center">
                <span class="iconfont icon-dizhi bigFont"></span>
                <span class="midFont">{{ myInfo.address }}</span>
              </div>
            </div>
          </div>
        </card>
        <!-- 阿里云 -->
        <card :detail="leftShow[1]" v-if="leftShow.length">
          <div class="aliyun flex flex-direction cardContent">
            <span
              class="aliItem midFont pointer"
              @click="clickLink(leftShow[1].detail[0])"
              >{{ leftShow[1].detail[0].name }}</span
            >
            <span
              class="aliItem litFont pointer"
              style="color: red;"
              @click="clickLink(leftShow[1].detail[1])"
              >{{ leftShow[1].detail[1].name }}</span
            >
            <div class="flex justify-between">
              <div
                v-for="(item, index) in leftShow[1].detail[2]"
                :key="index"
                class="bottom pointer"
                @click="clickLink(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </card>
        <!-- 热门文章 -->
        <card :detail="leftShow[2]" style="margin-bottom:0">
          <div class="hotList flex flex-direction cardContent">
            <div
              v-for="(item, index) in hotBokeList"
              :key="index"
              class="hotListItem"
            >
              <div class="hotTitle midFont pointer">
                <span
                  @mouseover="addUnderLine($event)"
                  @mouseleave="removeUnderLine($event)"
                >
                  {{ item.title }}</span
                >
                <div class="flex views" style="display: inline;">
                  <span class="iconfont icon-view"></span>
                  <span>{{ item.views }}</span>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>

      <div class="bokeDetail">
        <h2 class="title">{{detail.title}}</h2>
        <div class="bokeInfo ">
          <span class="date litFont">{{detail.date}}</span>
          <span class="username litFont">{{detail.username}}</span>
          <span class="views litFont">{{detail.views}}次浏览</span>
        </div>
        <v-md-editor v-model="detail.html" mode="preview"></v-md-editor>
      <!-- 赞赏 -->
      <div class="postLike flex align-center justify-center">
        <div class="toLike">
          <span class="iconfont icon-shoucang" style="color:red"></span>
          <span>{{detail.likes}}</span>
        </div>
        <div>¥赞赏</div>
      </div>
      <!-- 相关 -->
      <div class="related flex flex-direction align-start">
        <a href="">上一篇:收拾收拾</a>
        <a href="">下一篇:是是是是是所</a>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "assets/js/mixin.js";
import card from "components/common/card.vue";
export default {
  name: "bokeDetail",
  components: {
    card,
  },
  mixins: [mixin["overEle"]],
  data() {
    return {
      id: 0,
      detail: {},
      hotBokeList: [],
      leftShow: [],
    };
  },
  created(option) {
    console.log(this.$route);
    this.id = this.$route.query.id;
    this.myInfo = this.$store.state.myInfo;
    this.loadData();
  },
  methods: {
    async loadData() {
      this.getHotBokeList();
      let result = await this.$http(
        this.$ifa.bokeDetail + "?id=" + this.id,
        {},
        "get"
      );
      this.leftShow = await this.$api.json("homeLeftShow");
      console.log("博客数据", result);
      if (result.status) {
        this.detail = result.data;
      } else {
        this.$msg.error(result.msg);
      }
    },
    async getHotBokeList() {
      let result = await this.$http(this.$ifa.hotBokeList, {}, "get");
      console.log("热门博客", result);
      if (result.status) {
        this.hotBokeList = result.data;
      } else {
        this.$store.commit("showToast", {
          title: "数据获取失败",
          content: result.msg,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "assets/css/page/home.less";

.boke {
  padding: 0 4.5%;
  // padding-bottom: 150px;
  width: 100%;
}
.left {
  // display: flex;
  box-sizing: content-box;

  width: 280px;
}
.bokeDetail {
  padding: 30px 40px;
//   padding-bottom: 0 !;
  box-sizing: content-box;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  margin-left: 10px;
  .title{
    // color: red;
    font-size: 20px;

        margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  .bokeInfo{
    color: #666;
    .username{
      color: #ff7f21;
      margin-left: 20px;
    }
    .views{
      margin-left: 20px;
    }
  }
}
.postLike{
  .toLike{
        background: rgba(255,32,32,.2);
    color: #ff2020;
    border: 1px solid rgba(255,32,32,.4);
    font-size: 14px;
        min-width: 4em;
  }
}
</style>
