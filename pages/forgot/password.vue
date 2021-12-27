<template>
  <div class="login-container">
    <!-- <v-col cols="12" width="400"> -->
    <v-card>
      <v-card-text>
        <p class="login-container__forgot">Forgot Password</p>
        <v-form>
          <div class="login-container__label">Email</div>
          <v-text-field
            v-model="form.email"
            :error-messages="errors.email ? errors.email[0] : ''"
            outlined
            type="text"
          ></v-text-field>
        </v-form>
        <div v-if="error" class="mt-3" style="color: red">
          {{ error }}
        </div>
        <v-btn @click="forgotPassword()">Forgot</v-btn>
        <div class="login-container__textend">
          <span class="need--account">Have an account?</span>
          <nuxt-link to="/login" class="sign--up">Login</nuxt-link>
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
    <!-- </v-col> -->
  </div>
</template>

<script>
export default {
  layout: 'blank',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: ''
      },
      loading: false,
      error: '',
    }
  },
  methods: {
    forgotPassword() {
      this.loading = true
      this.$axios.post('/auth/forgot-password', this.form)
      .then(res => {
        this.$notify({
          type: 'success',
          title: res.data.message,
        })
        this.loading = false
        this.$router.push('/login')
      })
      .catch(err => {
        console.log(err)
        this.loading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
