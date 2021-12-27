<template>
  <div class="profile">
    <v-menu open-on-hover top offset-y class="menu">
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex align-center pl-1" v-bind="attrs" v-on="on">
          <Avatar :size="36" :src="userProfile.avatar_url" />
          <div class="pl-2 pb-1">
            <div class="fs-16 user-name">{{ userProfile.name }}</div>
            <p class="fs-10 mb-0">{{ userProfile.email }}</p>
          </div>
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
import Avatar from './Avatar.vue'
export default {
  props: { userProfile: Object },
  components: { Avatar },
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
