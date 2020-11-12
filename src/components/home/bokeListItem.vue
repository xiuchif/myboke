<template>
  <div class="bokeListItem flex flex-direction justify-between align-start">
    <span
      class="title bigFont"
      @mouseover="addUnderLine($event)"
      @mouseleave="removeUnderLine($event)"
      @click="toDetail()"
    >
      {{ detail.title }}
    </span>
    <div class="user">
      <span class="userName">{{ detail.username }}</span>
      <span class="date midFont">{{ detail.date }}</span>
    </div>
    <p class="introduct">{{ detail.context }}</p>
    <div class="bottom flex justify-between">
      <span class="underLine viewAll litFont" @click="toDetail()">阅读全文</span>
      <div class="stat litFont">
        <span
          class="statItem"
          >浏览<span class="underLine">({{ detail.views }})</span>
        </span>
        <span
        class="statItem"
          >赞<span class="underLine">({{ detail.likes }})</span>
        </span>
        <span
        class="statItem"
        style="margin-right:0;"
          >评论<span class="underLine">({{ detail.comments }})</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "assets/js/mixin.js";
export default {
  name: "bokeListItem",
  mixins: [mixin["overEle"]],
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    toDetail(){
      console.log("跳转的博客",this.detail)
      // router.push({ path: 'register', query: { plan: 'private' }})
     this.$router.push({path:"/bokeDetail",query:{id:this.detail.id}})
    }
  },
};
</script>

<style lang="less" scoped>
.bokeListItem {
  box-sizing: content-box;
 
  flex: auto;
  max-width: 800px;
  // min-width: 800px;
  margin-bottom: 10px;
  padding: 30px 40px;
  border-radius: 4px;
  background-color: #fff;
  text-align: start;
  .title {
    width:100%;
    white-space: nowrap;
    color: #2d8cf0;
outline: 0;
text-overflow: ellipsis;
overflow: hidden;
// font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .user {
    margin: 8px 0 16px 0;
    .userName {
      margin-right: 20px;
      color: #ffa710;
      font-weight: 700;
      border-radius: 2px;
    }
    .date {
      color: #888;
    }
  }
  .introduct {
    color: #777;
    text-indent: 2em;
    text-align: start;
    
    font-size: 16px;
  }
  .bottom {
    width: 100%;
    margin-top: 14px;
    .viewAll {
      color: #2d8cf0;
      cursor: pointer;
    }
    .stat{
        .statItem{
            margin-right: 10px;
            .underLine{
              color: #777;
            }
        }
    }
  }
}
</style>
