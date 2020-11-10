<template>
  <div class="demo">
    <div class="swiper"></div>
    <div class="other">
      <div class="text">
        这里是字
      </div>
      <p>这是标题</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {
      swiperHeight: 0,
      windowHeight: 0,
    };
  },
  beforeMount() {
    var h = document.documentElement.clientHeight || document.body.clientHeight;

    this.windowHeight = h; //减去页面上固定高度height
    console.log("屏幕高度", this.windowHeight);
    this.swiperHeight = h;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop;
      console.log("滚动的高度", scrollHeight);
      this.swiperHeight = this.windowHeight - scrollHeight;
      console.log("现在的图片盖度", this.swiperHeight);
    },
  },
};
</script>

<style lang="less" scoped>
// .demo{

// background-image: url("https://www.csdn.net/company/img/cd-background-1.jpg");
//     background-size: 100vw 100%;
// }
.swiper {
  position: fixed;
  top: headerHeight;
  width: 100%;
  height: 100vh;
  // z-index: 9;
  background-image: url("https://www.csdn.net/company/img/cd-background-1.jpg");
  background-size: cover;
  background-position: center;
}
.other {
  top: 100vh;
  width: 100%;
  height: 3000px;
  background-color: #fff;
  // z-index: 9999;
  text-align: center;
  .text {
    position: absolute;
    // text-align: center;
    top: -200px;
    left: 0;
    right: 0;
    font-weight: bolder;
    color: #fff;
    font-size: 32px;
  }
  p{
    z-index: 1;
  }
}
</style>
