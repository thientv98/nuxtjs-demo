export default {
  data() {
    return {
      mixinData: "From mixin"
    }
  },
  computed: {
    testReplace() {
      return 'From test mixin'
    }
  },
  methods: {
    getMixinData() {
      return this.mixinData
    },
    openModal() {
      this.modalCategory = true
    }
  }
}
