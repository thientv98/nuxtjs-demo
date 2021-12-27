<template>
  <div>
    <v-card outlined>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div>
            <div class="fs-14 fw-bold">YOUNGJI BOO</div>
            <div class="fw-bold">부영지</div>
            <div class="fs-10">Accounts Manager / 매니저</div>
          </div>
          <v-btn text class="blue--text fw-bold" @click="edit">Edit</v-btn>
        </div>

        <div class="d-flex justify-center">
          <i class="ic ic--tcc-card"></i>
        </div>
        <div class="d-flex justify-end flex-column">
          <div class="d-flex justify-end fs-10">+82.10.3097.2259</div>
          <div class="d-flex justify-end fs-10">
            Young.boo@thecollectivec.com
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['edit'],
}
</script>

<style lang="scss" scoped>
.v-card {
  // height: 200px !important;
  width: 350px !important;
}
.v-btn--text {
  padding: 0 !important;
  margin: -10px !important;
}
</style>
