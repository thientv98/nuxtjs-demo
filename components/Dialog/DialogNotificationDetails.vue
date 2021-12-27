<template>
  <v-dialog
    v-model="modalDialog"
    width="560"
    transition="dialog-top-transition"
    hide-overlay
    ><v-card elevation="0">
      <v-card-text>
        <h3 class="fw-bold pt-4 d-flex justify-center">{{item.title}}</h3>
        <div class="pt-6">
          <div>
            <span class="fw-bold">Date/Time</span>
            <p class="pt-2 mb-2">{{ formatDate(item.created_at, 'YYYY-MM-DD HH:mm:ss') }}</p>
            <hr />
          </div>
          <div class="pt-4">
            <span class="fw-bold">Category</span>
            <p class="pt-2 mb-2">{{ item.group ? item.group.title : '' }}</p>
            <hr />
          </div>
          <div class="pt-4">
            <span class="fw-bold">Users</span>
            <p class="pt-2 mb-2">{{ getUser(item) }}</p>
            <hr />
          </div>
          <div class="pt-4">
            <span class="fw-bold">Contents</span>
            <p class="pt-2 mb-2" style="white-space: break-spaces;">{{item.content}}</p>
            <hr />
          </div>
        </div>
        <div class="pt-10 d-flex justify-center">
          <v-btn dark rounded @click="modalDialog = false">Close</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    dialog: Boolean,
    item: Object,
  },
  computed: {
    modalDialog: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('update:dialog', newValue)
      }
    }
  },
  methods: {
    formatDate(date, format) {
      return dayjs(date).format(format)
    },
    getUser(item) {
      if(item.users) {
        return item.users.map(user => user.name).join(', ')
      }
      return ''
    }
  }
}
</script>

<style></style>
