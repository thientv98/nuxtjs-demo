<template>
  <v-dialog
    v-model="modalDialog"
    width="600"
    transition="dialog-top-transition"
    hide-overlay
  >
    <v-card>
      <v-card-text class="pa-0">
        <v-stepper elevation="0" class="pa-0" v-model="e1">
          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="edit-info">
                <h3 class="d-flex justify-center">
                  {{ form.name ? 'Edit Information of ' + form.name : 'Edit' }}
                </h3>
                <!-- <TccCard class="d-flex justify-center py-6" /> -->
                <div class="d-flex justify-center pt-6">
                  <v-card outlined class="tcc-card">
                    <v-card-text>
                      <div class="d-flex justify-space-between">
                        <div>
                          <div class="fs-14 fw-bold">
                            {{ businessCard ? businessCard.first_name : '' }}
                            {{ businessCard ? businessCard.last_name : '' }}
                          </div>
                          <div class="fs-10">
                            {{ businessCard ? businessCard.title : '' }}
                          </div>
                        </div>
                        <v-btn
                          text
                          small
                          class="blue--text fw-bold"
                          @click="changeStep(2)"
                        >
                          <p class="mb-1">Edit</p>
                        </v-btn>
                      </div>

                      <div class="d-flex justify-center">
                        <i class="ic ic--tcc-card"></i>
                      </div>
                      <div class="d-flex justify-end flex-column pt-3">
                        <div class="d-flex justify-end fs-10">
                          {{ businessCard ? getPhone(businessCard) : '_' }}
                        </div>
                        <div class="d-flex justify-end fs-10">
                          {{ businessCard ? businessCard.email : '_ _' }}
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>

                <!-- User Profile -->
                <v-card outlined class="my-4 card-user">
                  <v-card-text @click="changeStep(3)">
                    <div class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center">
                        <Avatar :src="form.avatar_url" />
                        <div class="d-flex flex-column pl-4">
                          <span class="fs-14 fw-bold"> {{ form.name }} </span>
                          <span class="fs-12">{{ form.email }}</span>
                        </div>
                      </div>
                      <v-btn
                        small
                        elevation="0"
                        class="btn-light fw-bold"
                        @click="changeStep(3)"
                        >Edit Info</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>

                <v-card elevation="0" class="pt-0">
                  <div class="d-flex justify-space-between mb-2">
                    <p class="fw-bold mb-0">Task list</p>
                    <nuxt-link
                      v-if="tasks.data.length > 1"
                      :to="`/task?user_id=${form.id}`"
                    >
                      View more
                    </nuxt-link>
                  </div>
                  <div v-if="!tasks.data.length">
                    <EmptyContent
                      v-if="!tasks.data.length"
                      text="No Task List"
                    />
                  </div>
                  <template v-else v-for="item in tasks.data.slice(0, 1)">
                    <CardTaskList :item="item" :key="item.id" />
                  </template>
                </v-card>

                <v-card elevation="0" class="pt-2">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <p class="fw-bold mb-1">Room list</p>
                    <nuxt-link
                      v-if="roomListUser.data.length > 1"
                      :to="`/member/room-list-user?id=${form.id}`"
                    >
                      View more
                    </nuxt-link>
                  </div>
                  <div class="d-flex justify-center">
                    <EmptyContent
                      v-if="!roomListUser.data.length"
                      text="No Room List"
                    />
                    <RoomList
                      v-else
                      v-for="(item, i) in roomListUser.data.slice(0, 3)"
                      :item="item"
                      :key="i"
                      :class="roomListUser.data.length > 1 ? 'mr-2' : ''"
                    />
                  </div>
                </v-card>

                <div class="d-flex align-center pt-4">
                  <div class="fw-bold pr-2 pb-0 pt-1">Block member</div>
                  <v-checkbox
                    v-model="isBock"
                    color="orange"
                    hide-details
                    :value="true"
                    class="mt-0"
                    @change="blockUser"
                  ></v-checkbox>
                </div>
                <div class="pt-6 d-flex justify-center bottom-btn">
                  <v-btn
                    width="120"
                    elevation="0"
                    dark
                    rounded
                    class="mr-1"
                    @click="modalDialog = false"
                    >Close</v-btn
                  >
                  <!-- <v-btn
                    width="120"
                    elevation="0"
                    color="primary"
                    rounded
                    class="ml-1"
                    @click="saveMemberProfile"
                    >Save</v-btn
                  > -->
                </div>
              </div>
            </v-stepper-content>
            <!-- Change info TCC Card  -->
            <v-stepper-content step="2">
              <div class="d-flex align-center">
                <v-btn icon @click="changeStep(1)"
                  ><i class="ic ic--chervon-left"></i
                ></v-btn>
                <h3 class="mx-auto">Member Business Card Info</h3>
              </div>
              <div class="pt-4 px-4">
                <div class="fw-bold">First Name</div>
                <v-text-field
                  class="pt-0"
                  v-model="businessCard.first_name"
                  :error-messages="
                    errors.first_name ? errors.first_name[0] : ''
                  "
                >
                </v-text-field>

                <div class="fw-bold">Last Name</div>
                <v-text-field
                  class="pt-0"
                  v-model="businessCard.last_name"
                  :error-messages="errors.last_name ? errors.last_name[0] : ''"
                >
                </v-text-field>

                <div class="fw-bold">Phone Code</div>
                <v-select
                  v-model="businessCard.phone_code_id"
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
                  class="pt-0"
                  v-model="businessCard.phone"
                  :error-messages="errors.phone ? errors.phone[0] : ''"
                >
                </v-text-field>

                <div class="fw-bold">Email</div>
                <v-text-field
                  v-model="businessCard.email"
                  :error-messages="errors.email ? errors.email[0] : ''"
                  class="pt-0"
                >
                </v-text-field>

                <div class="fw-bold">Title</div>
                <v-text-field
                  placeholder="Accounts Manager"
                  class="pt-0"
                  v-model="businessCard.title"
                  :error-messages="errors.title ? errors.title[0] : ''"
                >
                </v-text-field>
              </div>
              <div class="pt-10 d-flex justify-center">
                <v-btn
                  width="120"
                  elevation="0"
                  color="primary"
                  rounded
                  class="ml-1"
                  @click="saveBusinessCard(1)"
                  >Save</v-btn
                >
              </div>
            </v-stepper-content>
            <!-- End user Profile -->
            <v-stepper-content step="3">
              <v-card flat>
                <div class="d-flex align-center">
                  <v-btn icon @click="changeStep(1)"
                    ><i class="ic ic--chervon-left"></i
                  ></v-btn>
                  <h3 class="mx-auto">Edit Member Info</h3>
                </div>
                <div class="pt-4">
                  <div class="fw-bold">Name</div>
                  <v-text-field
                    class="pt-0"
                    v-model="form.name"
                    :error-messages="errors.name ? errors.name[0] : ''"
                  >
                  </v-text-field>

                  <div class="fw-bold">Email</div>
                  <v-text-field
                    class="pt-0"
                    v-model="form.email"
                    :error-messages="errors.email ? errors.email[0] : ''"
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
                    placeholder="Type phone code here"
                    class="pt-0"
                  >
                    <template v-slot:item="{ item }">
                      {{ item.code }} - {{ item.name }}
                    </template>

                    <template v-slot:selection="{ item }">
                      {{ item.code }} - {{ item.name }}
                    </template>
                  </v-select>

                  <div class="fw-bold">Phone</div>
                  <v-text-field
                    class="pt-0"
                    v-model="form.phone"
                    :error-messages="errors.phone ? errors.phone[0] : ''"
                  >
                  </v-text-field>

                  <div class="fw-bold">Username</div>
                  <v-text-field
                    class="pt-0"
                    v-model="form.username"
                    :error-messages="errors.username ? errors.username[0] : ''"
                  >
                  </v-text-field>

                  <div class="fw-bold">Category</div>
                  <v-select
                    v-model="form.group_id"
                    :items="groups"
                    item-text="title"
                    item-value="id"
                    :error-messages="errors.group_id ? errors.group_id[0] : ''"
                    class="pt-0"
                  >
                  </v-select>
                </div>
                <div class="pt-6 d-flex justify-center bottom-btn">
                  <v-btn width="120" elevation="0" dark rounded class="mr-1"
                    >Back</v-btn
                  >
                  <v-btn
                    width="120"
                    elevation="0"
                    color="primary"
                    rounded
                    class="ml-1"
                    @click="saveMemberProfile(1)"
                    >Save</v-btn
                  >
                </div>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
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
      e1: 1,
      steps: 2,
      form: {},
      businessCard: {},
      loading: false,
      isBock: false,
      phoneCode: [],
      groups: [],
      roomListUser: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total: 0,
        },
      },
      tasks: {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total: 0,
        },
      },
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
      this.isBock = false
      this.e1 = 1
      this.tasks = {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total: 0,
        },
      }

      if (this.id && val) {
        this.fetchData()
        this.fetchTask()
        this.fetchRoomListUser()
      }
    },
  },
  mounted() {
    this.fetchPhoneCode()
    this.fetchGroups()
  },
  methods: {
    fetchPhoneCode() {
      this.$axios.get('/phone').then((res) => {
        this.phoneCode = res.data.data.phones
      })
    },
    fetchGroups() {
      this.$axios.get('/group/all').then((res) => {
        this.groups = res.data.data.groups
      })
    },
    blockUser() {
      if (this.isBock) {
        this.form.banned = true
        this.loading = true
        this.$axios
          .post(`/user/update/${this.id}`, this.form)
          .then((res) => {
            this.$notify({
              type: 'success',
              title: 'Blocked Member',
            })
            this.$emit('fetchData')
            this.loading = false
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        this.form.banned = false
        this.loading = true
        this.$axios
          .post(`/user/update/${this.id}`, this.form)
          .then((res) => {
            this.$notify({
              type: 'success',
              title: res.data.message,
            })
            this.$emit('fetchData')
            this.loading = false
          })
          .catch((e) => {
            console.log(e)
          })
      }
    },
    saveMemberProfile(step) {
      // if (this.isBock) {
      //   this.form.banned = true
      // }
      this.loading = true
      this.$axios
        .post(`/user/update/${this.id}`, this.form)
        .then((res) => {
          this.loading = false
          this.changeStep(step)
          this.$notify({
            type: 'success',
            title: res.data.message,
          })
          this.$emit('fetchData')
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    saveBusinessCard(step) {
      this.loading = true
      this.$axios
        .post('/business-card/update', this.businessCard)
        .then((res) => {
          this.loading = false
          this.changeStep(step)

          this.$notify({
            type: 'success',
            title: res.data.message,
          })
          this.$emit('fetchData')
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    fetchData() {
      this.$axios.get(`/user/show/${this.id}`).then((res) => {
        this.loading = false
        this.form = res.data.data.user
        this.businessCard = this.form.business_card
      })
    },
    fetchTask() {
      this.$axios
        .get(`/task?user_created=${this.id}&size=3&page=1`)
        .then((res) => {
          this.tasks = res.data.data.tasks
        })
    },
    fetchRoom() {
      this.$axios
        .get(`/chat/rooms?size=3&page=1&status=approved`)
        .then((res) => {
          this.tasks = res.data.data.tasks
        })
    },
    getPhone(businessCard) {
      let phone = ''
      if (businessCard.phone_code) {
        phone += businessCard.phone_code.code
      }

      if (businessCard) {
        let p = businessCard.phone
        if (p) {
          if (p[0] != '0') {
            phone += p
          } else {
            phone += p.substring(1)
          }
        } else {
          phone = ''
        }
      }
      return phone
    },
    fetchRoomListUser() {
      this.$axios
        .get(`/room/list?page=1&size=3&user_id=${this.id}`)
        .then((res) => {
          this.roomListUser = res.data.data.rooms
        })
    },
    changeStep(step) {
      this.$store.dispatch('validation/setErrors', {})
      this.e1 = step
    },
  },
  setup() {
    const edit = () => {
      this.e1 = 2
    }
    return { edit }
  },
})
</script>

<style lang="scss" scoped>
.tcc-card {
  width: 350px !important;
  min-height: 200px !important;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  .v-btn--text {
    padding: 0 !important;
    margin: -10px !important;
  }
}
.card-user {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
.edit-info {
  position: relative !important;
  .header {
    position: sticky !important;
  }
}
</style>
