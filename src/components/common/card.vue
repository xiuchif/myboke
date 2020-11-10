<template>
  <div class="card flex flex-direction">
    <div class="top flex justify-between">
      <span class="title midFont">{{ detail.title }}</span>
      <span class="litFont blue" style="cursor:pointer">{{ detail.nav?.name }}</span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vue",
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  box-sizing: content-box;
  width: 280px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 0 0 8px 0 rgba(0,0,0,.15);
  .top {
    box-sizing: content-box;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    
    .title {
      
      color: #666;
    }
    
    
    
  }
}
</style>
