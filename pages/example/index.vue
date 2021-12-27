<template>
  <div>
    <div>
      <nuxt-link to="/example/syntax">Syntax</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/computed">Computed</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/lifecircle">Life circle</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/assets">Assets</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/component">Component</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/store">Store</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/page">Page</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/middleware">Middleware</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/plugin">Plugin</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/example/util">Util</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  watch: {
    count: function (val) {
      console.log(val);
    }
  }
}
</script>
