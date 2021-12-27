<template>
  <v-card outlined id="task-list">
    <v-card-text>
      <span class="fs-12">Room type</span>
      <v-select
        v-model="room.is_private"
        :items="types"
      ></v-select>
      <v-btn
        depressed
        color="primary"
        @click="changeRoomType"
        >Update</v-btn
      >
    </v-card-text>
    <hr class="mx-1" />
    <v-card-text>
      <span class="fs-12">
        File list
      </span>
      <div>
        <nuxt-link :to="`/file-manager/images?room_id=${room.id}`">Image</nuxt-link>
      </div>
      <div>
        <nuxt-link :to="`/file-manager/videos?room_id=${room.id}`">Video</nuxt-link>
      </div>
      <div>
        <nuxt-link :to="`/file-manager/documents?room_id=${room.id}`">Document</nuxt-link>
      </div>
    </v-card-text>
    <hr class="mx-1" />
    <v-card-text>
      <span class="fs-12">Task list</span>
      <EmptyContent
        v-if="!tasks.data.length"
        text="Empty task list"
        class="mt-2"
      />
      <v-list v-else>
        <v-list-item v-for="task in tasks.data" :key="task.id">
          <v-sheet class="box-date d-flex">
            <div class="box-date__month">
              {{ formatDate(task.start_at, 'MMM') }}
            </div>
            <div class="box-date__date">
              {{ formatDate(task.start_at, 'D') }}
            </div>
          </v-sheet>
          <v-list-item-content class="pl-2">
            <v-list-item-title
              class="fs-12 pb-1"
              v-html="task.title"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="subtitle"
              v-html="formatTime(task)"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-if="tasks.meta.current_page !== tasks.meta.last_page" class="mt-3">
        <nuxt-link :to="`/task?room_id=${room.id}`">View more</nuxt-link>
      </div>
    </v-card-text>
    <hr class="mx-1" />
    <v-card-text class="pr-0">
      <span class="fs-12">Participants</span>
      <div>
        <div type="button" class="d-flex align-center pointer py-4">
          <i class="ic ic--plus-gray mr-2"></i>
          <span class="blue--text fs-14 fw-bold"> Add member </span>
        </div>
        <v-autocomplete
          v-model="form.members"
          :items="memberSearch"
          outlined
          dense
          chips
          small-chips
          prepend-inner-icon="ic ic--search"
          placeholder="Search member"
          multiple
          hide-details
          deletable-chips
          item-value="id"
          item-text="name"
          class="pr-3"
        ></v-autocomplete>

        <v-btn
          depressed
          color="primary"
          class="mt-3"
          @click="addMember"
          :disabled="form.members.length == 0"
          >Add member</v-btn
        >

        <div type="button" class="d-flex align-center pointer pt-4 pb-4">
          <i class="ic ic--minus mr-2"></i>
          <span class="blue--text fs-14 fw-bold"> Kick member </span>
        </div>
      </div>
      <div :class="tasks.data.length > 2 ? 'h20' : 'h40'">
        <v-list v-if="room.room_user">
          <template v-for="(item, i) in room.room_user">
            <v-list-item :key="i" v-if="item.user">
              <Avatar size="36" :src="item.user.avatar_url" />
              <v-list-item-content>
                <v-list-item-title
                  class="d-flex align-center pl-2 justify-space-between"
                >
                  <div :class="isAdminRoom(item) ? 'admin-room' : ''">
                    {{ item.user && item.user.name ? item.user.name : '' }}
                  </div>
                  <!-- <v-btn icon @click="removeMember(item)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn> -->
                  <v-menu transition="scale-transition" bottom right offset-x>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <i class="ic ic--more"></i>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item link v-if="isAdminRoom(item)">
                        <v-list-item-title @click="setToMember(item)">
                          Set to member
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item link v-else>
                        <v-list-item-title @click="setToAdmin(item)">
                          Set to admin
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item link>
                        <v-list-item-title @click="removeMember(item)">
                          Kick Member
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-card-text>
    <LoadingOverlay :overlay="loading" />
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
import Util from '@/util'

export default {
  props: {
    room: {
      type: Object,
    },
  },
  data() {
    return {
      users: [],
      tasks: {
        data: [],
        meta: {
          current_page: 1,
          total: 0,
          last_page: 1,
        },
      },
      form: {
        members: [],
      },
      loading: false,
      types: [
        { value: 0, text: "Public" },
        { value: 1, text: "Private" },
      ]
    }
  },
  watch: {
    room: function (val) {
      this.fetchTask()
      this.form = {
        members: [],
      }
    },
  },
  mounted() {
    this.fetchAllMembers()
  },
  computed: {
    memberSearch() {
      if (this.room && this.room.room_user && this.room.room_user.length > 0) {
        let userRoom = this.room.room_user.map((item) => item.user_id)

        const result = this.users.filter((user) => !userRoom.includes(user.id))

        return result
      }
      return []
    },
  },
  methods: {
    setToAdmin(member) {
      this.loading = true
      this.$axios.post('/chat/make-admin', {
        room_id: this.room.id,
        user_id: member.user_id
      }).then((res) => {
        this.$notify({
          type: 'success',
          title: res.data.message,
        })
        this.loading = false
        this.room.admins = res.data.data.admins
      })
    },
    setToMember(member) {
      this.loading = true
      this.$axios.post('/chat/make-member', {
        room_id: this.room.id,
        user_id: member.user_id
      }).then((res) => {
        this.$notify({
          type: 'success',
          title: res.data.message,
        })
        this.loading = false
        this.room.admins = res.data.data.admins
      })
    },
    addMember() {
      this.loading = true
      this.form.room_id = this.room.id
      this.$axios.post('/room/add-member', this.form).then((res) => {
        this.$notify({
          type: 'success',
          title: res.data.message,
        })
        this.loading = false
        this.room.room_user = res.data.data.room_user
      })
    },
    removeMember(member) {
      this.loading = true

      this.$axios
        .post('/room/remove-member', {
          room_user_id: member.id,
        })
        .then((res) => {
          this.$notify({
            type: 'success',
            title: res.data.message,
          })
          this.loading = false
          this.room.room_user = res.data.data.room_user
        })
    },
    fetchTask() {
      this.$axios
        .get(`/task?room_id=${this.room.id}&size=3&page=1`)
        .then((res) => {
          this.tasks = res.data.data.tasks
        })
    },
    fetchAllMembers() {
      this.$axios.get('/user?status=active&itemsPerPage=-1').then((res) => {
        this.users = res.data.data.users.data
      })
    },
    formatDate(date, format) {
      if (date) {
        if (format === 'D') {
          const nth = Util.getNth(dayjs(date).format('D'))
          return dayjs(date).format(format) + nth
        } else {
          return dayjs(date).format(format)
        }
      }
      return ''
    },
    formatTime(task) {
      const start = dayjs(task.start_at).format('YYYY-MM-DD')
      const end = dayjs(task.end_at).format('YYYY-MM-DD')

      if (start === end) {
        return (
          dayjs(task.start_at).format('HH:mm A') +
          ' - ' +
          dayjs(task.end_at).format('HH:mm A')
        )
      } else {
        return (
          dayjs(task.start_at).format('YYYY-MM-DD HH:mm A') +
          ' - ' +
          dayjs(task.end_at).format('YYYY-MM-DD HH:mm A')
        )
      }
    },
    changeRoomType() {
      this.loading = true
      this.$axios
        .post(`/room/change-private`, {
          room_id: this.room.id,
          is_private: this.room.is_private
        })
        .then((res) => {

          this.$notify({
            type: 'success',
            title: res.data.message,
          })

          this.loading = false
          this.room.is_private = res.data.data.room.is_private
        })
    },
    isAdminRoom(member) {
      let findIndex = this.room.admins.findIndex(admin => admin.user_id == member.user_id)

      return findIndex != -1
    }
  },
}
</script>

<style lang="scss" scoped>
#task-list {
  height: 80vh !important;
  // z-index: 9999 !important;
  // overflow-y: auto;
  .v-text-field--outlined {
    border-radius: 24px !important;
  }
  .v-list-item {
    padding: 0 !important;
    margin: 0 !important;
  }
  .box-date {
    width: 50px;
    height: 50px;
    // padding: 8px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff3eb !important;

    &__month {
      display: flex;
      justify-content: center;
      text-transform: uppercase !important;
      font-size: 9px;
    }

    &__date {
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
.h40 {
  overflow-y: auto !important;
  height: 40vh !important;
}
.h20 {
  overflow-y: auto !important;
  height: 24vh !important;
}
.title {
  font-weight: 600;
}
.admin-room {
  color: #e08345;
}
</style>
