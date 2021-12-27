<template>
  <v-dialog
    v-model="modalDialog"
    width="400"
    transition="dialog-top-transition"
    hide-overlay
  >
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        :icon="!dark"
        :dark="dark"
        v-bind="attrs"
        v-on="on"
        :class="{ 'blue--text': !dark }"
        >{{ btnText }}</v-btn
      >
    </template> -->
    <v-card>
      <v-card-text class="py-8">
        <h3 class="d-flex justify-center">{{ title }}</h3>
        <div class="fw-bold">Name</div>
        <v-text-field v-model="form.title"
          :error-messages="errors.title ? errors.title[0] : ''"
          placeholder="Type Title here" class="pt-0">
        </v-text-field>
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
            @click="submitForm"
            >Save</v-btn
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
    title: String,
    id: String,
    btnText: String,
    dark: Boolean,
  },
  data() {
    return {
      form: {},
      loading: false,
    }
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
  watch: {
    dialog:  function (val) {
      this.form = {}
      if(this.id && val) {
        this.fetchData()
      }
    },
  },
  methods: {
    fetchData() {
      this.$axios.get(`/group/show/${this.id}`)
      .then(res => {
        this.loading = false
        this.form = res.data.data.group
      })
    },
    submitForm() {
      let url = ''
      if(this.id) {
        this.updateCategory()
      } else {
        this.createCategory()
      }
    },
    createCategory() {
      this.loading = true
      this.$axios.post('/group/create', this.form)
      .then(res => {
        this.loading = false
        this.modalDialog = false
        this.$emit('fetchData')
      })
      .catch(err => {
        console.log(err);
        this.loading = false
      })
    },
    updateCategory() {
      this.loading = true
      this.$axios.post(`/group/update/${this.id}`, this.form)
      .then(res => {
        this.loading = false
        this.modalDialog = false
        this.$emit('fetchData')
      })
      .catch(err => {
        console.log(err);
        this.loading = false
      })
    }
  }
})
</script>

<style></style>
