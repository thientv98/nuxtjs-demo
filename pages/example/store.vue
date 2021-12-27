<template>
  <div>
    <div>
      Count {{count}}
    </div>

    <div>
      <v-btn outlined @click="plus">Plus</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    // count: {
    //   get() {
    //     return this.$store.getters['test/count']
    //   },
    //   set(value) {
    //     this.$store.commit('test/updateCount', value)
    //   }
    // }
    ...mapGetters({
      count: 'test/count'
    })
  },
  methods: {
    plus() {
      this.$store.dispatch('test/inCrementCount')
    }
  },
  mounted() {
    console.log('state', this.$store.state);
    console.log('getter', this.$store.getters);
  }
}
</script>

