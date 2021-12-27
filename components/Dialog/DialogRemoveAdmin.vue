<template>
  <v-dialog
    v-model="dialog"
    width=""
    transition="dialog-top-transition"
    hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="icon" elevation="0" icon v-bind="attrs" v-on="on"
        ><i class="ic ic--more"></i
      ></v-btn>
      <v-btn v-else dark elevation="0" v-bind="attrs" v-on="on"
        >Remove Admin</v-btn
      >
    </template>
    <v-card>
      <v-card-text class="py-8">
        <h3 class="d-flex justify-center">Remove Admin</h3>
        <div class="pt-6 d-flex justify-center">
          <v-btn
            width="120"
            elevation="0"
            dark
            rounded
            class="mr-1"
            @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            width="120"
            elevation="0"
            color="primary"
            rounded
            class="ml-1"
            @click="dialog = false"
            >Confirm</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    dialog: Boolean,
    icon: Boolean,
  },
})
</script>

<style></style>
