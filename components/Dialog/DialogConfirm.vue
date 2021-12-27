<template>
  <v-dialog
    v-model="modalDialog"
    width=""
    transition="dialog-top-transition"
    hide-overlay
  >
    <v-card>
      <v-card-text class="py-8">
        <h3 class="d-flex justify-center">{{ title }}</h3>
        <div class="pt-6 d-flex justify-center">
          <v-btn
            width="120"
            elevation="0"
            dark
            rounded
            class="mr-1"
            @click="modalDialog = false"
            >Close</v-btn
          >
          <v-btn
            width="120"
            elevation="0"
            color="primary"
            rounded
            class="ml-1"
            @click="confirm()"
            >Confirm</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dialog: Boolean,
    title: {
      type: String,
      default: "Do you want confirm it?"
    },
  },
  computed: {
    modalDialog: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('update:dialog', newValue)
      }
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    }
  }
})
</script>

<style></style>
