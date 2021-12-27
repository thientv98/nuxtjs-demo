<template>
  <v-app light>
    <client-only>
      <notifications />
    </client-only>
    <v-main class="main-layout">
      <div class="center-mobile">
        <div class="logo center-mobile">
          <i class="ic ic--logo"></i>
        </div>
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.center-mobile {
  @media all and(max-width: 900px) {
    display: flex;
    justify-content: center;
  }
}
</style>
