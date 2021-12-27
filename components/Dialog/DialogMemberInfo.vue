<template>
  <v-dialog
    v-model="dialog"
    width="560"
    transition="dialog-top-transition"
    hide-overlay
    ><v-card elevation="0">
      <v-card-text>
        <h3 class="d-flex justify-center pt-6">Member Business Card Info</h3>
        <TccCard class="d-flex justify-center py-6" />
        <div class="pt-4 px-4">
          <div class="fw-bold">Name</div>
          <v-text-field placeholder="Type Username here" class="pt-0">
          </v-text-field>
          <div class="fw-bold">Email</div>
          <v-text-field placeholder="Type Email here" class="pt-0">
          </v-text-field>
          <div class="fw-bold">Password</div>
          <v-text-field placeholder="Type Password here" class="pt-0">
          </v-text-field>
        </div>
        <div class="pt-10 d-flex justify-center">
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
            >Save</v-btn
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
