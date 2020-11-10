<template>
  <div class="cover">
    这是遮罩
  </div>
</template>

<script>
export default {
  name: "cover",
};
</script>

<style lang="less" scoped>
.cover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.45);
}
</style>
