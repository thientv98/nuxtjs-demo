<template>
  <v-dialog
    v-model="dialog"
    width="600"
    transition="dialog-top-transition"
    hide-overlay
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" icon v-bind="attrs" v-on="on"
        ><i class="ic ic--more"></i
      ></v-btn>
    </template>
    <v-card>
      <v-card-text>
        <h3 class="d-flex justify-center pt-6">Application</h3>
        <div class="pt-4">
          <div class="fw-bold">Name</div>
          <v-text-field value="Young ji boo" placeholder="Name" class="pt-0">
          </v-text-field>
          <div class="fw-bold">Email</div>
          <v-text-field
            value="Young.boo@thecollectivec.com"
            placeholder="Email"
            class="pt-0"
          >
          </v-text-field>
          <div class="fw-bold">Category</div>
          <v-text-field value="BC" placeholder="Category" class="pt-0">
          </v-text-field>
          <div class="">
            <span class="fw-bold pr-3">Upload Files</span>
            <v-btn x-small rounded color="primary" elevation="0">File</v-btn>
            <v-btn x-small rounded color="primary" elevation="0">File</v-btn>
          </div>
        </div>
        <div class="pt-6 d-flex justify-center pt-10">
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
export default {
  props: {
    dialog: Boolean,
  },
}
</script>

<style></style>
