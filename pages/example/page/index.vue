<template>
  <div>
    Index of page folder

    <div>
      <nuxt-link to="/example/page/test">/example/page/test</nuxt-link>
    </div>

    <div>
      <v-btn outlined to="/example/page/asd">/example/page/_slug</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    console.log(this.$route);
  }
}
</script>
