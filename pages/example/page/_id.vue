<template>
  <div>
    Dynamic url page
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.query.search);
  }
}
</script>
