<template>
  <div>
    <h1>Plugin page</h1>

    <!-- demo plugin -->
    <div>
      <v-btn outlined @click="showToast">
        Show toast
      </v-btn>
    </div>

    <!-- mixin -->
    <div class="mt-3">
      {{mixinData}} <br>

      {{testReplace}}
    </div>

    <!-- axios -->
    <div class="mt-3">
      <v-btn outlined @click="openModal">
        New Category
      </v-btn>
    </div>

    <DialogAddCategory
      :dialog.sync="modalCategory"
      title="New Category"
      dark
    />

  </div>
</template>

<script>
import testMixin from '@/plugins/mixins/testMixin'

export default {
  mixins: [testMixin],
  data() {
    return {
      modalCategory: false,
      mixinData: '123'
    }
  },
  created() {

  },
  methods: {
    showToast() {
      this.$notify({
        type: 'success',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      })
    },
    // openModal() {
    //   console.log('Open modal');
    //   this.modalCategory = true
    // }
  }
}
</script>
