<template>
  <div class="pr-2">
    <v-menu open-on-hover top offset-y class="menu">
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex align-center pl-1" v-bind="attrs" v-on="on">
          <Avatar :src="userProfile.avatar_url" :size="36" />
        </div>
      </template>
      <v-list>
        <v-list-item @click="dialogChangePassword = true">
          <v-list-item-title class="py-1">Change password</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout()">
          <v-list-item-title class="py-1">Logout </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogChangePassword :dialog.sync="dialogChangePassword" />
  </div>
</template>

<script>
export default {
  props: { userProfile: Object },
  data() {
    return {
      dialogChangePassword: false,
    }
  },
  methods: {
    async handleLogout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style></style>
