<template>
  <div
    class="
      avatar-wrapper
      mx-auto
      d-flex
      flex-column
      justify-center
      align-center
    "
  >
    <i class="ic ic--camera"></i>
    <div
      class="img"
      v-if="state.src"
      :style="'background-image: url(' + state.src + ')'"
    ></div>
    <v-file-input
      v-model="state.file"
      hide-details
      prepend-icon=""
      accept="image/*"
      @change="inputChanged"
    >
    </v-file-input>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['onChange'],
  setup(props, { root }) {
    const state = reactive({
      file: {},
      src: null,
    })
    const inputChanged = () => {
      if (state.file) {
        const reader = new FileReader()
        reader.addEventListener('load', (e) => (state.src = e.target.result))
        reader.readAsDataURL(state.file)
        props.onChange(state.file)
      }
    }
    const resetFile = () => {
      state.src = null
    }
    return { state, inputChanged, resetFile }
  },
})
</script>

<style></style>
