<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="460"
      hide-overlay
      transition="dialog-top-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">Send Message to All</v-btn>
      </template>
      <v-card>
        <v-card-text class="pa-10">
          <h2 class="fw-bold d-flex justify-center">Send Message to All</h2>
          <!-- <div class="container"></div> -->
          <v-textarea
            outlined
            v-model="form.content"
            :hide-details="!errors.content"
            :error-messages="errors.content ? errors.content[0] : ''"
            rows="8"
            class="mt-4"></v-textarea>
          <div class="d-flex justify-center pt-6">
            <v-btn
              color="primary"
              elevation="0"
              rounded
              class="px-6"
              @click="openModalConfirm"
              :disabled="!form.content"
              >Send</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
    v-model="dialogConfirm"
    width="460"
    hide-overlay
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-text class="pa-10">
        <h2 class="fw-bold d-flex justify-center">{{textConfirm}}</h2>

        <div class="d-flex justify-center pt-6">
          <v-btn
            color="primary"
            elevation="0"
            rounded
            class="px-6 mr-3"
            @click="dialogConfirm = false"
            >Close</v-btn
          >
          <v-btn
            color="primary"
            elevation="0"
            rounded
            class="px-6"
            @click="send"
            >Send</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <LoadingOverlay :overlay="loading" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Util from "@/util"

export default defineComponent({
  props: {
    selectedRoom: Array,
    filter: Object,
  },
  data() {
    return {
      dialog: false,
      dialogConfirm: false,
      form: {},
      textConfirm: '',
      loading: false
    }
  },
  watch: {
    dialog:  function (val) {
      if(val) {
        this.form = {}
      }
    }
  },
  methods: {
    openModalConfirm() {
      this.textConfirm = this.selectedRoom.length === 0 ? 'Do you want send message to all room?' : 'Do you send message to selected room?'
      this.dialog = false
      this.dialogConfirm = true
    },
    send() {
      const ids = this.selectedRoom.map(item => item.id)
      this.loading = true
      const queryString = Util.serializeObj(this.filter);
      this.$axios.post('/room/send-notification?'+queryString, {
        rooms: ids,
        content: this.form.content
      }).then(res => {
        this.$notify({
          type: "success",
          title: res.data.message,
        });
        this.loading = false
        this.dialogConfirm = false
      }).catch(err => {
        console.log(err);
        this.loading = false
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin-top: 24px;
  border: 1px solid var(--cl-bd);
  height: 30vh !important;
  border-radius: 10px;
}
</style>
