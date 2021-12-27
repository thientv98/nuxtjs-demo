<template>
  <div>
    <v-avatar :size="size ? size : 48">
      <img :src="src ? src : '/default-avatar.png'" alt="John" class=""
    /></v-avatar>
  </div>
</template>

<script>
export default {
  props: ['src', 'size'],
}
</script>

<style lang="scss" scoped>
.v-avatar {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  img {
    border: 1px solid rgb(241, 241, 241);
  }
}
</style>
