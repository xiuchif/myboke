<template>
  <div class="nav flex justify-between align-center">
    <ul class="left flex">
      <li
        v-for="(item, index) in navList"
        :key="index"
        class="navItem"
        :class="{ overNavItem: index == currentIndex }"
        @click="clickItem(item)"
        @mouseover="overNavItem(index)"
        @mouseleave="leaveNavItem"
      >
        <div style="font-weight: 700;">
          {{ item.name }}
        <div
          class="navContent"
          :class="{showContent:index==currentIndex}"
           @mouseover="overNavItem(index)"
          v-if="item.content.length"
        >
          <p v-for="(items,indexs) in item.content" :key="'c'+indexs">
            {{items.name}}
          </p>
        </div>
        </div>

      
      </li>
    </ul>
    <div class="logo">
      <span>羞耻疯的呜呼</span>
    </div>
    <ul class="right flex align-center justify-end">
      <div
        class="searchBox flex align-center justify-between"
        style="margin-top: 42px; margin-right: 10px;"
        :class="{ hide: showSearch }"
      >
        <input
          type="text"
          placeholder="Search.."
          class="search"
          :class="{ opacity0: showSearch }"
        />

        <span
          class="iconfont"
          :class="showSearch ? 'icon-sousuo' : 'icon-search'"
          style="font-size: 26px; position: absolute; right: 0;"
          @click="isShowSearch"
        ></span>
      </div>
      <li
        v-for="(item, index) in navFunctionList"
        :key="index"
        class="iconfont"
        :class="item.icon"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "nav",
  props: ["msg"],
  data() {
    return {
      showSearch: false, //显示搜索框
      currentIndex: "false",

      navList: [],
      navFunctionList: [
        {
          icon: "icon-User",
          id: 1,
        },

        {
          icon: "icon-shoucang",
          id: 2,
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.navList = await this.$api.json("homeNav");
    },
    //显示搜索框
    isShowSearch() {
      this.showSearch = !this.showSearch;
      console.log("是否显示搜索框", this.showSearch);
    },
    clickItem(item){
      this.$router.push(item.url || "/")
    },
    overNavItem(index) {
      this.currentIndex = index;
    },
    leaveNavItem() {
      this.currentIndex = "false";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav {
  position: relative;
  top: 0;
  // z-index: 99999;
  // padding: 0 4.5%;
  padding: 0 10%;
 width: 100%;
  max-width: 100vw;
  min-width: 1200px;
  height: @headerHeight;
   background-color: #fff;
  // background-color: red;
  .logo {
    white-space: nowrap;
    flex: 0 0 16.666667%;
    text-align: center;
    max-width: 16.666667%;
    height: 88px;
    line-height: 88px;
    // z-index: 999999;
  span{
    
    font-size: 32px;
    color: lightblue;
  }
    
  }

  .left,
  .right {
    // display: inline-block;
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
    background-color: #fff;
    // width: 100%;
  }
  .left {
    font-size: 16px;
    font-weight: bolder !important;
    font-family: Lato-Regular;
    // overflow: hidden;
    color: black;
    .navItem {
      // box-sizing: content-box;
      height: 50px;
      line-height: 50px;
      margin-right: 5%;
      white-space: nowrap;
      cursor: pointer;
       border-bottom: 1px solid rgba(255,255,255,0);
        transition: all 0.4s ease 0s;
    }
    .overNavItem {
      border-bottom: 1px solid #000;
    }
    //二级菜单部分
    .navContent {
      z-index: 999;
      background: #fff;
      width: 200px;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 9px 30px;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(0, 0, 0, 11);
      opacity: 0;
      border-radius: 3px;
      pointer-events: none;
      text-align: start;
      transition: all 0.4s ease 0s;
    }
    .showContent{
      opacity: 1;
       cursor: pointer;
    }
  }
  .right {
    height: 100%;
    // background:red;

    li {
      margin-right: 10px;
      font-size: 30px;
    }
    .iconfont{
        cursor: pointer;
      }
    //搜索框
    .searchBox {
      width: 250px;
      height: 42px;
      // background-color: red;
      border-bottom: 1px solid #555;
      transform: translateY(-50%);
      transition: all 0.4s;
      //显示时的搜索图标
      .icon-search {
        color: #a8a8a8;
        font-size: 26px;
        transition: all 0.4s;
      }
      //隐藏时的搜索图标
      .icon-sousuo {
        top: 6px;
        color: black;
        font-size: 30px;
        // tran
      }
      
      .search {
        padding-left: 10px;
        width: 80%;
        height: 100%;
        background: 0 0;
        border: 0;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        text-rendering: auto;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        -webkit-rtl-ordering: logical;
        cursor: text;
        font: 400 13.3333px Arial;
        pointer-events: all;

        transition: all 0.4s;
        // border-bottom: 1px solid #555;/
      }

      .search::-webkit-input-placeholder {
        color: grey;
      }

      .opacity0 {
        transform: translateY(-50%);
        transition: all 0.4s;
        opacity: 0;
      }
    }
    
    .hide {
      border-bottom: 1px solid #fff;
      transform: translateY(-50%);
      transition: all 0.4s;
    }
  }
}
</style>
