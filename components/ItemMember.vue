<template>
  <v-list-item-group v-model="selectMember">
    <v-list-item :value="item.id" class="px-0">
      <template v-slot:default="{ active }">
        <Avatar size="42" :src="item.avatar_url" />
        <v-list-item-content class="pl-2">
          <v-list-item-title
            v-text="item.name"
            class="fw-bold fs-14 mb-1"
          ></v-list-item-title>
          <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-checkbox
            v-if="!isCheckBox"
            :input-value="active"
            size="10"
            dense
            off-icon="ic ic--checkbox-circle"
            on-icon="ic ic--checkbox-circle-active"
          ></v-checkbox>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list-item-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    item: Object,
    isCheckBox: {
      type: Boolean,
      default: false,
    },
    dialog: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectMember: '',
      isActive: false,
    }
  },
  watch: {
    dialog: function (val) {
      this.selectMember = ''
      this.$store.dispatch('validation/setErrors', {})
    },
    selectMember: function (val) {
      this.changeActive()
    },
  },
  methods: {
    changeActive() {
      this.$emit('changeActive', this.item.id, this.selectMember ? true : false)
    },
  },
})
</script>

<style></style>
