<template>
  <v-dialog
    v-model="modalDialog"
    width="400"
    transition="dialog-top-transition"
    hide-overlay
  >
    <v-card>
      <v-card-text class="py-8">
        <h3 class="d-flex justify-center">{{ title }}</h3>

        <div class="fw-bold">Name</div>
        <v-text-field v-model="form.name"
          :error-messages="errors.name ? errors.name[0] : ''"
          placeholder="Type name here" class="pt-0">
        </v-text-field>

        <div class="fw-bold">Email</div>
        <v-text-field v-model="form.email"
          :error-messages="errors.email ? errors.email[0] : ''"
          placeholder="Type email here" class="pt-0">
        </v-text-field>

        <div class="fw-bold">Phone Code</div>
        <v-select v-model="form.phone_code_id" :items="phoneCode"
          item-text="name"
          item-value="id"
          :error-messages="errors.phone_code_id ? errors.phone_code_id[0] : ''"
          placeholder="Select phone code here" class="pt-0">

          <template v-slot:item={item}>
            {{item.code}} - {{item.name}}
          </template>

          <template v-slot:selection={item}>
            {{item.code}} - {{item.name}}
          </template>
        </v-select>

        <div class="fw-bold">Phone</div>
        <v-text-field v-model="form.phone"
          :error-messages="errors.phone ? errors.phone[0] : ''"
          placeholder="Type phone here" class="pt-0">
        </v-text-field>

        <div class="fw-bold">Username</div>
        <v-text-field v-model="form.username"
          :error-messages="errors.username ? errors.username[0] : ''"
          placeholder="Type username here" class="pt-0">
        </v-text-field>

        <div class="fw-bold">Category</div>
        <v-select v-model="form.group_id"
          :items="groups"
          item-text="title"
          item-value="id"
          :error-messages="errors.group_id ? errors.group_id[0] : ''"
          placeholder="Select group here" class="pt-0">
        </v-select>

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
  },
  data() {
    return {
      form: {},
      loading: false,
      phoneCode: [],
      groups: []
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
  mounted() {
    this.fetchPhoneCode()
    this.fetchCategory()
  },
  methods: {
    fetchPhoneCode() {
      this.$axios.get('/phone')
      .then(res => {
        this.phoneCode = res.data.data.phones
      })
    },
    fetchCategory() {
      this.$axios.get('/group/all')
      .then(res => {
        this.groups = res.data.data.groups
      })
    },
    fetchData() {
      this.$axios.get(`/user/show/${this.id}`)
      .then(res => {
        this.loading = false
        this.form = res.data.data.user
      })
    },
    submitForm() {
      if(this.id) {
        this.updateMember()
      } else {
        this.form.role = 'ROLE_USER'
        this.createMember()
      }
    },
    createMember() {
      this.loading = true
      this.$axios.post('/user/create', this.form)
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
    updateMember() {
      this.loading = true
      this.$axios.post(`/user/update/${this.id}`, this.form)
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
