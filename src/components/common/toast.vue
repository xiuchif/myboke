<template>
  <div class="toast flex flex-direction align-center">
    <div class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  z-index: 1001;
  border: 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  .title {
    width: 100%;
    padding: 8px;
    text-align: center;
    white-space: nowrap;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }
  .content {
    padding: 16px 0px;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }
}
</style>
