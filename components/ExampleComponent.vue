<template>
  <div>
    <h1>{{title}}</h1>
    From Example Component

    <div>
      <v-btn outlined @click="$emit('emitEvent', 'Xin chao')">Emit event 1</v-btn>
      <v-btn outlined @click="emitEvent">Emit event 2</v-btn>

    </div>

    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  methods: {
    emitEvent() {
      this.$emit('emitEvent', 'Xin chao')
    }
  }
}
</script>
