<template>
  <div class="login-container">
    <!-- <v-col cols="12" width="400"> -->
    <v-card>
      <v-card-text>
        <p class="login-container__title">LOGIN</p>
        <v-form>
          <div class="login-container__label">Email</div>
          <v-text-field
            v-model="form.email"
            :error-messages="errors.email ? errors.email[0] : ''"
            outlined
            type="text"
          ></v-text-field>
          <div class="login-container__label">Password</div>
          <v-text-field
            v-model="form.password"
            :error-messages="errors.password ? errors.password[0] : ''"
            outlined
            :hide-details="errors.password ? false : true"
            @keyup.enter="login()"
            type="password"
          >
          </v-text-field>

          <div v-if="error" class="mt-3" style="color: red">
            {{ error }}
          </div>
          <nuxt-link to="/forgot/password" class="login-container__link">Did you forgot your password?</nuxt-link>
          <v-btn @click="login()">Log in</v-btn>
        </v-form>
        <div class="login-container__textend">
          <span class="need--account">Need Account?</span>
          <span class="sign--up">Sign Up</span>
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
        email: '',
        password: '',
      },
      loading: false,
      error: '',
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        this.loading = true
        await this.$auth.loginWith('local', { data: this.form }).then((res) => {
          console.log(res.data)
          this.$router.push('/dashboard')
        })
      } catch (e) {
        this.loading = false
        if (e.response.status === 401) {
          this.error = e.response.data.message
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
