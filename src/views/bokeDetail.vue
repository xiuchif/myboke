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
        <card :detail="leftShow[2]">
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
        <p>标题</p>
        <p>10-30 12:12 名字 多少浏览</p>
        <v-md-editor v-model="detail.html" mode="preview"></v-md-editor>
      </div>
    </div>
  </div>
</template>

<script>
import card from "components/common/card.vue";
export default {
  name: "bokeDetail",
  components:{
      card
  },
  data() {
    return {
      id: 0,
      detail: {},
      leftShow:[],
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
    box-sizing: content-box;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  margin-left: 10px;
}
</style>
