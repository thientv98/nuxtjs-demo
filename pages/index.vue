<template>
  <div>
    Dashboard
    <TestComponent />
  </div>
</template>

<script>
import testMixin from '@/plugins/mixins/testMixin'

export default {
  mixins: [testMixin],
  created() {
    console.log(this.$route.name);
  }
}
</script>
