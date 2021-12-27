<template>
  <v-app light>
    <client-only>
      <notifications />
    </client-only>
    <v-main class="main-layout">
      <MainNav />
      <v-container fluid elevation="0" class="white body-container">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
}
</script>
<style lang="scss" scoped>
.v-main__wrap {
  flex: none !important;
}
</style>
