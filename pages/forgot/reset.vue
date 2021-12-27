<template>
  <div class="login-container">
    <!-- <v-col cols="12" width="400"> -->
    <v-card>
      <v-card-text>
        <p class="login-container__forgot">Reset Password</p>
        <v-form>
          <div class="login-container__label">Password</div>
          <v-text-field
            v-model="form.password"
            :error-messages="errors.password ? errors.password[0] : ''"
            outlined
            type="password"
          ></v-text-field>
        </v-form>
        <div v-if="error" class="mt-3" style="color: red">
          {{ error }}
        </div>
        <v-btn @click="resetPassword()">Reset</v-btn>
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
  mounted() {
    if(!this.$route.query.token || !this.$route.query.email) {
      this.$route.push('/login');
    } else {
      this.form.token = this.$route.query.token
      this.form.email = this.$route.query.email
    }
  },
  methods: {
    resetPassword() {
      this.loading = true
      this.$axios.post('/auth/reset-password', this.form)
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
        if(err.response.status === 400) {
          this.$notify({
            type: 'error',
            title: err.response.data.message
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
