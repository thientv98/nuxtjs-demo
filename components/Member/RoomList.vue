<template>
  <v-card outlined>
    <v-card-text class="d-flex align-center py-4">
      <Avatar :src="item.thumbnail_url" />
      <div class="pl-3 d-flex align-center">
        <div v-text="item.title" class="fs-14 fw-bold"></div>
        <span class="unread fs-14 fw-bold pl-1">{{ item.total_unread }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    item: Object,
  },
})
</script>

<style lang="scss" scoped>
.v-card {
  width: 100% !important;
}
.unread {
  color: rgb(201, 201, 201);
}
</style>
