<template>
  <v-dialog
    v-model="modalDialog"
    width="600"
    transition="dialog-top-transition"
    hide-overlay
  >
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn elevation="0" icon v-bind="attrs" v-on="on"
        ><i class="ic ic--more"></i
      ></v-btn>
    </template> -->
    <v-card>
      <v-card-text class="py-6">
        <div class="edit-info">
          <h3 class="d-flex justify-center">Edit Information of Boo</h3>

          <div>
            <div class="d-flex align-center py-4">
              <Avatar size="48" :src="form.avatar_url" />
              <div class="d-flex flex-column pl-4">
                <span class="fs-16 fw-bold">{{ form.name }}</span>
                <span class="fs-12">{{ form.email }}</span>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <div class="fw-bold">Name</div>
            <v-text-field
              placeholder="Name"
              class="pt-0"
              v-model="form.name"
              :error-messages="errors.name ? errors.name[0] : ''"
            >
            </v-text-field>

            <div class="fw-bold">Phone Code</div>
            <v-select
              v-model="form.phone_code_id"
              :items="phoneCode"
              item-text="name"
              item-value="id"
              :error-messages="
                errors.phone_code_id ? errors.phone_code_id[0] : ''
              "
              placeholder="Type email here"
              class="pt-0"
            >
              <template v-slot:item="{ item }">
                {{ item.code }} - {{ item.name }}
              </template>

              <template v-slot:selection="{ item }">
                {{ item.code }} - {{ item.name }}
              </template>
            </v-select>

            <div class="fw-bold">Phone Number</div>
            <v-text-field
              placeholder="Phone Number"
              class="pt-0"
              v-model="form.phone"
              :error-messages="errors.phone ? errors.phone[0] : ''"
            >
            </v-text-field>

            <div class="fw-bold">Category</div>
            <v-select
              v-model="form.group_id"
              :items="groups"
              item-text="title"
              item-value="id"
              :error-messages="errors.group_id ? errors.group_id[0] : ''"
              placeholder="Type group here"
              class="pt-0"
            >
            </v-select>

            <!-- <div class="fw-bold">Title</div>
            <v-text-field
              value="Accounts Manager"
              placeholder="Title"
              class="pt-0"
            >
            </v-text-field> -->
          </div>
          <div class="d-flex align-center">
            <div class="fw-bold pr-2 pb-0 pt-1">Remove Block</div>
            <!-- <v-radio-group v-model="removeBlock">
              <v-radio color="orange" :value="true"></v-radio>
            </v-radio-group> -->
            <v-checkbox
              v-model="removeBlock"
              color="orange"
              hide-details
              :value="true"
              class="mt-0"
            ></v-checkbox>
          </div>
          <div class="pt-10 d-flex justify-center bottom-btn">
            <v-btn
              width="120"
              elevation="0"
              dark
              rounded
              class="mr-1"
              @click="modalDialog = false"
              >Close</v-btn
            >
            <v-btn
              width="120"
              elevation="0"
              color="primary"
              rounded
              class="ml-1"
              @click="submitForm"
              >Save</v-btn
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
    <LoadingOverlay :overlay="loading" />
  </v-dialog>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import RoomList from '../Member/RoomList.vue'

export default defineComponent({
  components: { RoomList },
  props: {
    dialog: Boolean,
    id: String,
  },
  data() {
    return {
      form: {},
      loading: false,
      phoneCode: [],
      groups: [],
      removeBlock: false,
    }
  },
  computed: {
    modalDialog: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('update:dialog', newValue)
      },
    },
  },
  watch: {
    dialog: function (val) {
      this.form = {}
      if (this.id && val) {
        this.fetchData()
      }
    },
  },
  mounted() {
    this.fetchPhoneCode()
    this.fetchCategory()
  },
  methods: {
    fetchPhoneCode() {
      this.$axios.get('/phone').then((res) => {
        this.phoneCode = res.data.data.phones
      })
    },
    fetchCategory() {
      this.$axios.get('/group/all').then((res) => {
        this.groups = res.data.data.groups
      })
    },
    fetchData() {
      this.$axios.get(`/user/show/${this.id}`).then((res) => {
        this.loading = false
        this.form = res.data.data.user
      })
    },
    submitForm() {
      if (this.removeBlock) {
        this.form.status = 'active'
      }

      this.loading = true
      this.$axios
        .post(`/user/update/${this.id}`, this.form)
        .then((res) => {
          this.loading = false
          this.modalDialog = false
          this.$emit('fetchData')
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.tcc-card {
  // height: 200px !important;
  width: 350px !important;
  .v-btn--text {
    padding: 0 !important;
    margin: -10px !important;
  }
}
.edit-info {
  position: relative !important;
  .header {
    position: sticky !important;
  }
  // .bottom-btn {
  //   display: flex;
  //   // position: absolute;
  //   bottom: 0;
  // }
}
</style>
