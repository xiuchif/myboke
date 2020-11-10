<template>
  <div class="pagination flex justify-around align-center">
    <!-- <span>{{pageCount}}</span> -->
    <!-- <span> </span> -->
    <ul class="flex justify-around page">
      <li @click="prePage">&lt;</li>
      <li
        v-for="index in pageCount"
        :key="index"
        :class="{ checked: current == index }"
        @mouseover="overPage($event)"
        @mouseleave="leavePage($event)"
        @click="clickPage(index)"
      >
      {{index}}
        <!-- <span>{{ index }}</span> -->
      </li>
      <li @click="nextPage" style="margin-right: 0;">></li>
    </ul>
    <!-- <span>></span> -->
  </div>
</template>

<script>
// import bokeItem from "components/home/bokeListItem.vue"
export default {
  name: "myPagination",
  props: {
    count: {
      default: 0,
    },
    pageNum: {
      default: 1,
    },
  },
  data() {
    return {
      current: 1,
    };
  },
  computed: {
    nextCurrent() {
      return this.current + 1;
    },
    pageCount() {
      return Math.ceil(this.count / this.pageNum);
    },
    
  },
  methods: {
    //切换当前页
    prePage() {
       this.$emit("up-page")
      this.current -= 1;
    },
    nextPage() {
      this.$emit("next-page")
      this.current += 1;
    },
    clickPage(index){
      this.current=index  
    },
    //鼠标移入移出
    overPage(e){
        e.target.classList.add("overLi")
        console.log(e)
    },
    leavePage(e){
e.target.classList.remove("overLi")
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  width: 100%;
  //   background-color: red;
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  text-align: center;
}
.page {
  li {
    min-width: 32px;
    font-family: Arial;
    text-align: center;
    list-style: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    outline: 0;
    user-select: none;
    height: 32px;
    margin-right: 5%;
    line-height: 32px;
    vertical-align: middle;
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
  }
  .checked,.overLi{
    color: #1890ff;
    border-color: #1890ff;
  }
}
</style>
