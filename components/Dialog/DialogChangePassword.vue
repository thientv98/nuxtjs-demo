<template>
  <v-dialog
    v-model="modalDialog"
    width=""
    transition="dialog-top-transition"
    hide-overlay
  >
    <v-card>
      <v-card-text class="py-8">

        <div class="fw-bold">Old Password</div>
        <v-text-field v-model="form.old_password" type="password" autocomplete="new-password"
          :error-messages="errors.old_password ? errors.old_password[0] : ''"
          placeholder="Type Old Password Here" class="pt-0">
        </v-text-field>

        <div class="fw-bold">Password</div>
        <v-text-field v-model="form.password" type="password" autocomplete="new-password"
          :error-messages="errors.password ? errors.password[0] : ''"
          placeholder="Type Password Here" class="pt-0">
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
            @click="changePassword()"
            >Change</v-btn
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
      form: {}
    }
  },
  methods: {
    changePassword() {
      this.loading = true
      this.$axios.post('/auth/change-password', this.form)
      .then(res => {
        this.$notify({
          type: 'success',
          title: res.data.message,
        })
        this.loading = false
        this.modalDialog = false
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
