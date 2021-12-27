<template>
  <div class="card-empty">
    <div v-text="text"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
}
</script>
<style lang="scss" scoped>
.card-empty {
  border-radius: 12px;
  width: 100% !important;
  height: 68px;
  border: 1px solid var(--cl-bd);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(146, 146, 146);
  // border-style: dashed;
}
</style>
