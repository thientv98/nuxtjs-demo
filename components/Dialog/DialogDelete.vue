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
            @click="deleteItem()"
            >Confirm</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
  </v-dialog>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dialog: Boolean,
    title: {
      type: String,
      default: "Do you want remove it?"
    },
    urlDelete: String,
    selected: Array,
    icon: Boolean,
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
    deleteItem() {
      this.loading = true
      const ids = this.selected.map(item => item.id)
      this.$axios.post(this.urlDelete, {
        ids: ids
      })
      .then(res => {
        this.loading = false
        this.modalDialog = false
        this.$emit('fetchData')
      })
      .catch(err => {
        this.loading = false
        this.modalDialog = false
        this.$emit('fetchData')
      })
    }
  }
})
</script>

<style></style>
