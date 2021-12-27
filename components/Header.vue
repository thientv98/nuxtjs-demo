<template>
  <div class="header">
    <p class="fs-28 mb-0 fw-bold" v-text="title" style="text-transform: capitalize;"></p>
    <div class="d-flex align-center">
      <slot name="button"> </slot>
      <v-spacer :class="{ 'px-2': btn }"></v-spacer>
      <v-btn v-if="btn" dark elevation="0">{{ textBtn }}</v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: String,
    textBtn: String,
    btn: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex !important;
  justify-content: space-between !important;
  margin-bottom: 24px !important;
  align-items: center !important;
  @media all and (max-width: 767px) {
    flex-direction: column !important;
    align-items: flex-start !important;
    p {
      margin-bottom: 12px !important;
    }
  }
}
</style>
