<template>
  <div class="home">
    <!-- <button @click="toAdd">添加文章</button> -->

    <div class="content flex justify-center">
      <div class="left flex flex-direction" v-if="myInfo&&leftShow.length">
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
        <card :detail="leftShow[1]" >
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
              @click="toDetail(item)"
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

      <!-- 博客列表 -->

      <div class="bokeList">
        <!-- <a-spin tip="Loading..." style="position:absoulte;top:40%;left:0;right:0;margin:auto;z-index:9999;"/> -->
        <boke-item
          :detail="item"
          v-for="(item, index) in bokeList.data"
          :key="index"
        >
        </boke-item>

        <div class="" style="margin: auto;" v-if="bokeList.data.length">
          <a-pagination
            :default-current="page"
            :defaultPageSize="pagenum"
            :total="bokeList.count"
            @change="changePage"
          />
        </div>
      </div>
      <!-- 最新留言 -->
      <div class="right">
      <card :detail="{title:'最新留言'}">
        <div class="newstMessage flex flex-direction  align-center">
          <p style="margin-top:50px" v-if="!msgList.length">暂无留言</p>
          <div class="msgList flex flex-direction cardContent" v-if="msgList.length">
            <div
              v-for="(item, index) in msgList"
              :key="index"
              class="msgItem"
            >
              <div class="msgUser flex justify-between align-center">
                <div>
                  <img class="avatar" :src="item.avatar" alt="">
                <span class="userName">{{item.username}}</span>
                </div>
                
                <span class="midFont" style="color: #888">{{item.date}}</span>
              </div>
              <div class="msgTitle midFont pointer">
                <span
                 
                  class="msgText"
                >
                  {{ item.context }}</span
                >
                <div class="flex views" style="display: inline;">
                  <span class="iconfont icon-pinglunshu"></span>
                  <span>{{ item.comments }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
    </div>
    
    <!-- 加载动画 -->
    <div class="loading" v-if="loading">
      <p style="color: #62b4ff;">加载中,请稍等...</p>
      <a-spin size="large" />
    </div>
    <!-- <code>nodedaiam</code> -->
    <!-- <pre>这是什么</pre> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from "ant-design-vue";
import { onBeforeMount, getCurrentInstance } from "vue";
import card from "components/common/card.vue";
import bokeItem from "components/home/bokeListItem.vue";
// import myPagination from "components/home/myPagination.vue";
import mixin from "assets/js/mixin.js";
export default {
  name: "Home",
  mixins: [mixin["overEle"]],
  components: {
    card,
    bokeItem,
    // myPagination,
  },
  data() {
    return {
      loading: true,
      leftShow: [],
      bokeList: { data: [] },
      hotBokeList: [],
      msgList:[],
      myInfo: "",
      page: 1,
      pagenum: 5,
    };
  },
  // setup:async ()=> {
  //   const { ctx } = getCurrentInstance()

  //   console.log(ctx,"this是啥啊");
  //   // ctx.loadData()
  // },
  async created() {
    // "hello"
    this.myInfo = this.$store.state.myInfo;
    this.loadData();
  },

  methods: {
    async loadData() {
      this.loading = true;
      this.leftShow = await this.$api.json("homeLeftShow");
      this.getBokeList();
      this.getHotBokeList();
      this.getNewstMsg()
      this.loading = false;
    },
    async getBokeList() {
      let result = await this.$http(this.$ifa.bokeList, {
        page: this.page,
        pagenum: this.pagenum,
      });
      if (result.status) {
        this.bokeList = result;
      } else {
        this.$store.commit("showToast", {
          title: "数据获取失败",
          content: result.msg,
        });
      }
      this.loading = false;
    },
    async getHotBokeList() {
      let result = await this.$http(this.$ifa.hotBokeList, {}, "get");
      if (result.status) {
        this.hotBokeList = result.data;
      } else {
        this.$store.commit("showToast", {
          title: "数据获取失败",
          content: result.msg,
        });
      }
    },
    // 获取最新留言
    async getNewstMsg(){
      let result = await this.$http(this.$ifa.messageList,{home:true})
      console.log("最新留言",result)
      if(result.status){
        this.msgList=result.data
      }else{
        this.$msg.error(result.msg)
      }
    },
    clickLink(item) {
      // this.$router.push({name:item.url})
      window.open(item.url);
    },
    toDetail(item){
      console.log(item.id)
      this.$router.push(`/bokeDetail?id=${item.id}`)
    },
    changePage(current) {
      console.log("改变页数", current);
      this.loading = true;
      this.page = current;
      this.getBokeList();
    },
    toAdd() {
      this.$router.push({ path: "/addBoke" });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/page/home.less");
.home {
  z-index: 100;
  padding: 0 4.5%;
  width: 100%;
}

.bokeList {
  width: auto;
  margin:0 10px;
}

</style>
