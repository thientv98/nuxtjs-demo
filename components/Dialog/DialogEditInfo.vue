<template>
  <v-dialog
    v-model="dialog"
    width="560"
    transition="dialog-top-transition"
    hide-overlay
    ><v-card elevation="0">
      <v-card-text>
        <h3 class="d-flex justify-center pt-6">Member Business Card Info</h3>
        <UserItem />
        <div class="pt-4 px-4">
          <div class="fw-bold">Name</div>
          <v-text-field
            value="영지 부"
            placeholder="Type Username here"
            class="pt-0"
          >
          </v-text-field>
          <div class="fw-bold">Email</div>
          <v-text-field
            value="+82.10.3097.2259"
            placeholder="Type Email here"
            class="pt-0"
          >
          </v-text-field>
          <div class="fw-bold">Category</div>
          <v-text-field value="BC" placeholder="Category" class="pt-0">
          </v-text-field>
          <div class="fw-bold">Title</div>
          <v-text-field
            value="Accounts Manager"
            placeholder="Accounts Manager"
            class="pt-0"
          >
          </v-text-field>
          <div class="d-flex align-center">
            <div class="fw-bold pr-2 pb-0">
              Would you like to unblock this member
            </div>
            <v-radio color="orange"></v-radio>
          </div>
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
